import { stations, links, lines } from './subwayData.js';

/**
 * Leaflet.js를 기반으로 실제 다크 맵 위에 수도권 광역 지하철 노선과 마커를 오버레이하는 클래스
 */
export class SubwayMapRenderer {
  constructor(svgId, viewportId, onStationSelect) {
    // svgId, viewportId 인자는 호환성을 위해 유지하되 내부적으로 Leaflet 지도로 바인딩합니다.
    this.onStationSelect = onStationSelect;
    
    this.map = null;
    this.mapMarkers = {}; // 역ID -> Leaflet CircleMarker 객체
    this.mapLines = [];    // Leaflet Polyline 객체 리스트
    this.highlightGroup = null; // 길찾기 하이라이트용 레이어 그룹

    this.init();
  }

  init() {
    this.setupMap();
    this.renderSubwayMap();
  }

  /**
   * Leaflet 지도 프레임워크 초기화 및 다크 타일맵 오버레이
   */
  setupMap() {
    // 1. 지도 컨테이너 로드 (기본 포커스: 서울 중심부)
    const isMobile = window.innerWidth <= 768;
    const initialZoom = isMobile ? 10 : 11;
    
    this.map = L.map('map', {
      center: [37.555, 126.975], // 서울 중심
      zoom: initialZoom,
      minZoom: 9,
      maxZoom: 15,
      zoomControl: !isMobile // 모바일은 줌컨트롤 제거하여 공간 확보
    });

    // 2. 다크 아크릴 테마와 완벽 매칭되는 CartoDB Dark Matter 맵 레이어 적용
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);
  }

  /**
   * 역 마스터 데이터와 링크 모델을 Leaflet 지형 지도 위에 렌더링
   */
  renderSubwayMap() {
    // 기존 마커 및 선로 초기화
    this.clearMapObjects();

    // 1. 역 간 선로(링크) 폴리라인 그리기
    links.forEach(link => {
      const source = stations[link.source];
      const target = stations[link.target];
      const lineConfig = lines[link.line];

      if (source && target && lineConfig) {
        const latlngs = [
          [source.lat, source.lng],
          [target.lat, target.lng]
        ];

        // 노선 고유 컬러를 입힌 Polyline 드로잉
        const polyline = L.polyline(latlngs, {
          color: lineConfig.color,
          weight: 4,
          opacity: 0.75,
          className: `subway-polyline link-${link.source}-${link.target}-${link.line}`
        }).addTo(this.map);

        // 메타 데이터 바인딩
        polyline.dataset = {
          source: link.source,
          target: link.target,
          line: link.line,
          accessible: link.accessible
        };

        // 배리어프리 경고 점선 데코 적용
        if (link.accessible === false) {
          polyline.options.dashArray = '5, 5';
          polyline.options.color = '#ef4444';
          polyline.options.opacity = 0.35;
          polyline.redraw();
        }

        this.mapLines.push(polyline);
      }
    });

    // 2. 역 노드 마커 그리기
    Object.keys(stations).forEach(stationId => {
      const station = stations[stationId];
      const isTransfer = station.lines.length > 1;
      const primaryLineColor = lines[station.lines[0]]?.color || '#ffffff';

      // 휠체어 전용 엘리베이터 유무에 따른 커스텀 마커 보더 설정
      let markerColor = primaryLineColor;
      let strokeDash = null;

      if (!station.accessible.hasElevator) {
        // 교통약자 위험 역은 붉은 점선 경고
        markerColor = '#ef4444';
        strokeDash = '2, 2';
      }

      const marker = L.circleMarker([station.lat, station.lng], {
        radius: isTransfer ? 7.5 : 5.5,
        color: markerColor,
        weight: isTransfer ? 3.5 : 2.5,
        fillColor: isTransfer ? '#ffffff' : '#111827',
        fillOpacity: 1,
        className: `subway-marker station-${station.id}`
      }).addTo(this.map);

      // 점선 뱃지 강제 렌더링
      if (strokeDash) {
        marker.options.dashArray = strokeDash;
        marker.redraw();
      }

      // 호버 툴팁 생성
      const lineBadges = station.lines.map(l => {
        const lineConf = lines[l];
        return `<span style="background:${lineConf ? lineConf.color : '#555'}; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px; margin-left:3px; font-weight:700;">${l}</span>`;
      }).join('');

      marker.bindTooltip(`
        <div style="font-family:'Noto Sans KR', sans-serif; font-size:12px; font-weight:600; padding:2px 4px; background:rgba(15,23,42,0.85); color:#fff; border:none; border-radius:5px;">
          ${station.name}${lineBadges}
          ${!station.accessible.hasElevator ? '<div style="color:#f87171; font-size:10px; margin-top:2px; font-weight:500;">⚠️ 휠체어 엘리베이터 없음</div>' : ''}
        </div>
      `, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95,
        className: 'subway-leaflet-tooltip'
      });

      // 클릭 시 바텀 시트 열기
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.selectStation(station.id);
        if (this.onStationSelect) {
          this.onStationSelect(station.id);
        }
      });

      this.mapMarkers[station.id] = marker;
    });

    // 배리어프리 전역 맵 클래스 토글용 헬퍼 바인딩
    this.updateBarrierFreeLayer();
  }

  /**
   * 배리어프리 모드 상태에 따른 지도 상의 시각적 경고 점선 및 오버레이 조정
   */
  updateBarrierFreeLayer() {
    const isBarrierFree = document.body.classList.contains('barrier-free-theme');
    
    // 선로 및 역사 마커 스타일 제어
    this.mapLines.forEach(polyline => {
      const data = polyline.dataset;
      if (data && data.accessible === false) {
        if (isBarrierFree) {
          polyline.setStyle({
            color: '#ef4444',
            dashArray: '5, 5',
            opacity: 0.35,
            weight: 3.5
          });
        } else {
          // 일반 모드 복구
          const originalColor = lines[data.line]?.color || '#ffffff';
          polyline.setStyle({
            color: originalColor,
            dashArray: null,
            opacity: 0.75,
            weight: 4
          });
        }
      }
    });

    Object.keys(this.mapMarkers).forEach(stationId => {
      const station = stations[stationId];
      const marker = this.mapMarkers[stationId];
      if (station && marker && !station.accessible.hasElevator) {
        if (isBarrierFree) {
          marker.setStyle({
            color: '#ef4444',
            dashArray: '2, 2'
          });
        } else {
          const primaryColor = lines[station.lines[0]]?.color || '#ffffff';
          marker.setStyle({
            color: primaryColor,
            dashArray: null
          });
        }
      }
    });
  }

  /**
   * 특정 역사 선택 포커싱 및 맵 이동
   */
  selectStation(stationId) {
    // 이전 선택 리셋
    Object.values(this.mapMarkers).forEach(marker => {
      const classList = marker.getElement()?.classList;
      if (classList) {
        classList.remove('selected');
        // 복귀 크기
        marker.setStyle({ radius: marker.options.radius === 12 ? 7.5 : marker.options.radius });
      }
    });

    const marker = this.mapMarkers[stationId];
    if (marker) {
      const element = marker.getElement();
      if (element) {
        element.classList.add('selected');
      }
      
      // 마커 일시적 확대
      const isTransfer = stations[stationId].lines.length > 1;
      marker.setStyle({ radius: isTransfer ? 10.5 : 8.5 });

      // 지도의 중심을 마커로 부드럽게 정렬
      this.map.panTo(marker.getLatLng(), { animate: true, duration: 0.5 });
    }
  }

  /**
   * 길찾기 결과 경로를 실제 지도상에 하이라이트하고 화면 영역 맞춤
   */
  highlightPath(pathResult) {
    this.clearHighlights();

    if (!pathResult || !pathResult.path || pathResult.path.length === 0) {
      return;
    }

    const { path } = pathResult;
    const highlightCoords = [];

    // 1. 지도 전체 딤드(Dimmed) 처리
    this.mapLines.forEach(polyline => {
      polyline.setStyle({ opacity: 0.08 });
    });
    Object.values(this.mapMarkers).forEach(marker => {
      marker.setStyle({ opacity: 0.1, fillOpacity: 0.1 });
    });

    // 2. 하이라이트 레이어 그룹 생성
    this.highlightGroup = L.featureGroup().addTo(this.map);

    // 3. 경로 노드 및 링크 복원 및 두께 증설
    for (let i = 0; i < path.length; i++) {
      const step = path[i];
      const station = stations[step.stationId];
      if (!station) continue;

      highlightCoords.push([station.lat, station.lng]);

      // 정거장 마커 복원 및 전조등 효과
      const marker = this.mapMarkers[step.stationId];
      if (marker) {
        marker.setStyle({ opacity: 1, fillOpacity: 1 });
        const element = marker.getElement();
        if (element) {
          element.classList.add('path-stop');
        }
      }

      if (i > 0) {
        const prevStep = path[i - 1];
        if (prevStep.stationId !== step.stationId) {
          const prevStation = stations[prevStep.stationId];
          const lineConfig = lines[step.line];

          if (prevStation && lineConfig) {
            // 실제 주행용 하이라이트 굵은 라인 오버레이
            const highlightLine = L.polyline([
              [prevStation.lat, prevStation.lng],
              [station.lat, station.lng]
            ], {
              color: lineConfig.color,
              weight: 8,
              opacity: 0.95,
              className: 'subway-polyline-highlight'
            }).addTo(this.highlightGroup);

            // 네온 글로우 스타일 하단 그림자 라인
            L.polyline([
              [prevStation.lat, prevStation.lng],
              [station.lat, station.lng]
            ], {
              color: lineConfig.color,
              weight: 16,
              opacity: 0.25,
              className: 'subway-polyline-glow'
            }).addTo(this.highlightGroup);
          }
        }
      }
    }

    // 4. 경로가 지도 한눈에 꽉 차도록 카메라 뷰 자동 조정 (fitBounds)
    if (highlightCoords.length > 1) {
      const bounds = L.latLngBounds(highlightCoords);
      this.map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 13,
        animate: true,
        duration: 0.8
      });
    }
  }

  /**
   * 지도 상의 하이라이트 및 딤드 스타일 초기화
   */
  clearHighlights() {
    // 하이라이트 레이어들 삭제
    if (this.highlightGroup) {
      this.map.removeLayer(this.highlightGroup);
      this.highlightGroup = null;
    }

    // 원래 오퍼시티 복원
    this.mapLines.forEach(polyline => {
      const isBarrierFree = document.body.classList.contains('barrier-free-theme');
      const data = polyline.dataset;
      let opacity = 0.75;
      if (data && data.accessible === false && isBarrierFree) {
        opacity = 0.35;
      }
      polyline.setStyle({ opacity: opacity });
    });

    Object.entries(this.mapMarkers).forEach(([stationId, marker]) => {
      const station = stations[stationId];
      const isTransfer = station.lines.length > 1;
      marker.setStyle({
        opacity: 1,
        fillOpacity: 1,
        radius: isTransfer ? 7.5 : 5.5
      });
      const element = marker.getElement();
      if (element) {
        element.classList.remove('dimmed', 'path-stop', 'selected');
      }
    });
  }

  clearMapObjects() {
    this.mapLines.forEach(polyline => this.map.removeLayer(polyline));
    Object.values(this.mapMarkers).forEach(marker => this.map.removeLayer(marker));
    this.mapLines = [];
    this.mapMarkers = {};
  }
}
