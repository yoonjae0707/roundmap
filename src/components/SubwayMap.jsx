import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { stations, links, lines } from '../js/subwayData';

export default function SubwayMap({ 
  onStationSelect, 
  selectedStationId, 
  activePath, 
  barrierFreeTheme 
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef({
    markers: {},
    links: [],
    pathPolylines: [],
    pathMarkers: []
  });

  // 1. 지도 컨테이너 최초 초기화
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // CartoDB Dark Matter 다크 타일 맵 기조로 초기화
    const map = L.map(mapContainerRef.current, {
      center: [37.541, 126.986], // 수도권 중심부
      zoom: 11,
      minZoom: 9,
      maxZoom: 15,
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // 2. 지하철 노선(선로) 및 역사 마커 렌더링 (CORS 및 테마 토글 시 갱신)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 레이어 클리어
    layersRef.current.links.forEach(l => l.remove());
    layersRef.current.links = [];
    Object.values(layersRef.current.markers).forEach(m => m.remove());
    layersRef.current.markers = {};

    // 2-1. 선로 그리기
    links.forEach(link => {
      const sourceStation = stations[link.source];
      const targetStation = stations[link.target];
      if (!sourceStation || !targetStation) return;

      const lineConfig = lines[link.line];
      const color = lineConfig ? lineConfig.color : '#6b7280';
      
      // 교통약자 테마가 활성 상태이고, 단절/제한 구간인 경우 붉은색 점선 처리
      const isUnsafe = barrierFreeTheme && !link.accessible;
      const polylineOpts = {
        color: isUnsafe ? '#ef4444' : color,
        weight: isUnsafe ? 3 : 5,
        opacity: isUnsafe ? 0.75 : 0.45,
        dashArray: isUnsafe ? '5, 5' : null,
        className: 'subway-polyline'
      };

      const polyline = L.polyline(
        [[sourceStation.lat, sourceStation.lng], [targetStation.lat, targetStation.lng]],
        polylineOpts
      ).addTo(map);

      layersRef.current.links.push(polyline);
    });

    // 2-2. 전 역사 마커 그리기
    Object.keys(stations).forEach(stationId => {
      const station = stations[stationId];
      
      // 해당 역이 지닌 첫 노선 컬러 기반
      const firstLine = station.lines[0];
      const lineConfig = lines[firstLine];
      let markerColor = lineConfig ? lineConfig.color : '#6b7280';

      // 교통약자 모드가 활성화되었을 때 엘리베이터 미보유 역은 붉은색 강조 처리
      const firstLineAccessible = station.accessible[firstLine] || station.accessible[station.lines[0]];
      const isUnsafe = barrierFreeTheme && (!accessibleDataHasElevator(station, firstLine));

      const marker = L.circleMarker([station.lat, station.lng], {
        radius: station.lines.length > 1 ? 8 : 6,
        fillColor: isUnsafe ? '#ef4444' : '#ffffff',
        fillOpacity: 1,
        color: isUnsafe ? '#ef4444' : markerColor,
        weight: station.lines.length > 1 ? 4 : 2,
        className: `subway-marker ${isUnsafe ? 'barrier-unsafe' : ''}`
      }).addTo(map);

      // 마커 클릭 시 역 정보창 활성화
      marker.on('click', () => {
        onStationSelect(stationId);
      });

      // 미려한 툴팁 오버레이 바인딩
      marker.bindTooltip(
        `<div style="color:#ffffff; font-weight:600; font-size:11px; padding:2px 6px;">${station.name}</div>`, 
        {
          direction: 'top',
          offset: [0, -5],
          opacity: 0.9,
          className: 'subway-leaflet-tooltip'
        }
      );

      layersRef.current.markers[stationId] = marker;
    });

  }, [barrierFreeTheme, onStationSelect]);

  // 헬퍼: 역의 활성화된 라인에 엘리베이터가 있는지 체크
  function accessibleDataHasElevator(station, line) {
    const data = station.accessible[line] || station.accessible[station.lines[0]];
    return data && data.hasElevator;
  }

  // 3. 선택된 역사 하이라이트 스타일 제어
  useEffect(() => {
    Object.keys(layersRef.current.markers).forEach(stationId => {
      const marker = layersRef.current.markers[stationId];
      if (!marker) return;

      if (stationId === selectedStationId) {
        marker.setStyle({ radius: 11, weight: 6 });
        marker.bringToFront();
      } else {
        const station = stations[stationId];
        marker.setStyle({ 
          radius: station.lines.length > 1 ? 8 : 6, 
          weight: station.lines.length > 1 ? 4 : 2 
        });
      }
    });
  }, [selectedStationId]);

  // 4. 길찾기 결과 경로 하이라이트 드로잉 및 카메라 이동
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // 기존 경로 하이라이트 클리어
    layersRef.current.pathPolylines.forEach(p => p.remove());
    layersRef.current.pathPolylines = [];
    layersRef.current.pathMarkers.forEach(m => m.remove());
    layersRef.current.pathMarkers = [];

    if (!activePath || activePath.length === 0) return;

    const latlngs = [];
    
    // 경로 연결선 하이라이트
    for (let i = 0; i < activePath.length; i++) {
      const step = activePath[i];
      latlngs.push([step.lat, step.lng]);

      // 경로 경유역 특수 네온 마커 매핑
      const pathMarker = L.circleMarker([step.lat, step.lng], {
        radius: 9,
        fillColor: '#38bdf8',
        fillOpacity: 0.9,
        color: '#ffffff',
        weight: 3,
        className: 'subway-marker path-stop'
      }).addTo(map);

      layersRef.current.pathMarkers.push(pathMarker);
    }

    // 형광빛 네온 하이라이트 백/프론트 레이어 이중 오버레이로 아크릴 감성 연출
    const pathGlow = L.polyline(latlngs, {
      color: '#38bdf8',
      weight: 12,
      opacity: 0.35,
      className: 'subway-polyline-glow'
    }).addTo(map);

    const pathMain = L.polyline(latlngs, {
      color: '#ffffff',
      weight: 4,
      opacity: 1,
      dashArray: '4, 4',
      className: 'subway-polyline-highlight'
    }).addTo(map);

    layersRef.current.pathPolylines.push(pathGlow, pathMain);

    // 경로가 잘 보이도록 화면 포커싱 자동 정렬
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });

  }, [activePath]);

  return (
    <div className="map-container">
      <div id="map" ref={mapContainerRef}></div>
      <div className="map-instructions glass-panel">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer-click"><path d="m9 9 5 12 1.774-5.226L21 14Z"/><path d="m16.071 16.071 4.243 4.243"/><path d="m9 9-4.243-4.243"/><path d="M9 3v2"/><path d="M14 9h-2"/><path d="M3 9h2"/><path d="M9 14v-2"/></svg>
        <span>지도상의 역 마커를 클릭하여 실시간 도착 정보 및 편의 시설을 확인하세요.</span>
      </div>
    </div>
  );
}
