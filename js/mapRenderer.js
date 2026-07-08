import { stations, links, lines } from './subwayData.js';

/**
 * SVG 지하철 노선도를 렌더링하고 드래그, 줌 이벤트를 처리하는 클래스
 */
export class SubwayMapRenderer {
  constructor(svgId, viewportId, onStationSelect) {
    this.svg = document.getElementById(svgId);
    this.viewport = document.getElementById(viewportId);
    this.onStationSelect = onStationSelect;

    this.linksGroup = document.getElementById('svg-links');
    this.stationsGroup = document.getElementById('svg-stations');

    // 드래그 & 줌 상태 변수
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    this.init();
  }

  init() {
    this.renderMap();
    this.setupInteractions();
  }

  /**
   * 노선 및 역 정보를 기반으로 SVG 요소를 생성하여 화면에 그립니다.
   */
  renderMap() {
    // 1. 선로(링크) 그리기
    this.linksGroup.innerHTML = '';
    links.forEach((link, index) => {
      const source = stations[link.source];
      const target = stations[link.target];
      const lineConfig = lines[link.line];

      if (source && target && lineConfig) {
        const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineElement.setAttribute('x1', source.x);
        lineElement.setAttribute('y1', source.y);
        lineElement.setAttribute('x2', target.x);
        lineElement.setAttribute('y2', target.y);
        lineElement.setAttribute('stroke', lineConfig.color);
        lineElement.setAttribute('stroke-width', '5');
        lineElement.setAttribute('class', 'subway-link');
        lineElement.setAttribute('id', `link-${link.source}-${link.target}-${link.line}`);
        
        // 커스텀 데이터 속성 저장
        lineElement.dataset.source = link.source;
        lineElement.dataset.target = link.target;
        lineElement.dataset.line = link.line;

        this.linksGroup.appendChild(lineElement);
      }
    });

    // 2. 역 노드(원 및 텍스트) 그리기
    this.stationsGroup.innerHTML = '';
    Object.keys(stations).forEach(stationId => {
      const station = stations[stationId];
      
      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('class', 'station-node');
      nodeGroup.setAttribute('id', `station-${station.id}`);
      nodeGroup.dataset.stationId = station.id;

      // 대표 노선 색상(첫 번째 노선 기준)
      const primaryLineColor = lines[station.lines[0]]?.color || '#ffffff';

      // 환승역 여부에 따라 테두리 스타일 다르게 적용
      const isTransfer = station.lines.length > 1;

      // 원(Circle)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', station.x);
      circle.setAttribute('cy', station.y);
      circle.setAttribute('r', isTransfer ? '9' : '6.5');
      circle.setAttribute('class', 'station-circle');
      circle.setAttribute('stroke', primaryLineColor);
      circle.setAttribute('fill', '#111827');
      circle.style.setProperty('--glow-color', primaryLineColor);
      
      if (isTransfer) {
        circle.setAttribute('stroke-width', '4');
        // 환승역은 안쪽 하얀 도넛 효과
        circle.setAttribute('fill', '#ffffff');
      } else {
        circle.setAttribute('stroke-width', '3');
      }

      // 텍스트(Label)
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', station.x);
      // 텍스트 겹침 방지를 위해 좌표에 따라 상단/하단 조정
      const textOffset = station.y > 300 ? 22 : -18;
      text.setAttribute('y', station.y + textOffset);
      text.setAttribute('class', 'station-text');
      text.textContent = station.name;

      nodeGroup.appendChild(circle);
      nodeGroup.appendChild(text);

      // 클릭 이벤트 리스너
      nodeGroup.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isDragging) return; // 드래그 완료 시 오클릭 방지
        this.selectStation(station.id);
        if (this.onStationSelect) {
          this.onStationSelect(station.id);
        }
      });

      this.stationsGroup.appendChild(nodeGroup);
    });

    this.applyTransform();
  }

  /**
   * 줌 & 드래그 인터랙션 마우스/터치 바인딩
   */
  setupInteractions() {
    // 1. 마우스 드래그 이동
    this.svg.addEventListener('mousedown', (e) => {
      if (e.target.closest('.map-zoom-controls')) return;
      this.isDragging = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
      this.svg.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.svg.style.cursor = 'grab';
      }
    });

    // 2. 터치 스크롤 (모바일 드래그)
    this.svg.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      }
    }, { passive: true });

    this.svg.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      this.panX = e.touches[0].clientX - this.startX;
      this.panY = e.touches[0].clientY - this.startY;
      this.applyTransform();
    }, { passive: true });

    this.svg.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // 3. 마우스 휠 줌인/아웃
    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = 1.1;
      
      // 마우스 포인터가 가리키는 지점을 기준으로 줌 연산 수행
      const rect = this.svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 이전 줌
      const prevZoom = this.zoom;
      
      if (e.deltaY < 0) {
        this.zoom = Math.min(this.zoom * zoomFactor, 3.5);
      } else {
        this.zoom = Math.max(this.zoom / zoomFactor, 0.6);
      }

      // 포인터 기준 줌 보정
      this.panX = mouseX - (mouseX - this.panX) * (this.zoom / prevZoom);
      this.panY = mouseY - (mouseY - this.panY) * (this.zoom / prevZoom);

      this.applyTransform();
    }, { passive: false });

    // 4. 지도 줌 버튼 액션 연결
    document.getElementById('btn-zoom-in').addEventListener('click', () => this.adjustZoom(1.3));
    document.getElementById('btn-zoom-out').addEventListener('click', () => this.adjustZoom(0.7));
    document.getElementById('btn-zoom-reset').addEventListener('click', () => this.resetZoom());
  }

  adjustZoom(factor) {
    const rect = this.svg.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const prevZoom = this.zoom;

    this.zoom = Math.min(Math.max(this.zoom * factor, 0.6), 3.5);
    this.panX = centerX - (centerX - this.panX) * (this.zoom / prevZoom);
    this.panY = centerY - (centerY - this.panY) * (this.zoom / prevZoom);
    
    this.applyTransform();
  }

  resetZoom() {
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  applyTransform() {
    // SVG 내부 요소들의 root transform 적용
    this.linksGroup.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);
    this.stationsGroup.setAttribute('transform', `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`);
  }

  /**
   * 특정 지하철역 노드 시각적 선택 처리
   */
  selectStation(stationId) {
    document.querySelectorAll('.station-node').forEach(node => {
      node.classList.remove('selected');
    });

    const selectedNode = document.getElementById(`station-${stationId}`);
    if (selectedNode) {
      selectedNode.classList.add('selected');
      // 지도 중심을 선택된 역으로 정렬 (부드러운 애니메이션 효과 대체)
      this.centerOnStation(stationId);
    }
  }

  /**
   * 특정 역이 뷰포트 정중앙으로 오도록 이동
   */
  centerOnStation(stationId) {
    const station = stations[stationId];
    if (!station) return;

    const rect = this.svg.getBoundingClientRect();
    const svgWidth = rect.width || 900;
    const svgHeight = rect.height || 600;

    // 중앙 정렬을 위한 pan 값 역산
    this.panX = svgWidth / 2 - (station.x * this.zoom);
    this.panY = svgHeight / 2 - (station.y * this.zoom);

    this.applyTransform();
  }

  /**
   * 길찾기 결과 경로를 노선도 지도상에 하이라이트 표시
   */
  highlightPath(pathResult) {
    this.clearHighlights();

    if (!pathResult || !pathResult.path || pathResult.path.length === 0) {
      return;
    }

    const { path } = pathResult;

    // 모든 노드 및 링크를 일단 흐리게(dimmed) 만듦
    document.querySelectorAll('.station-node').forEach(node => {
      node.classList.add('dimmed');
    });
    document.querySelectorAll('.subway-link').forEach(link => {
      link.classList.add('dimmed');
    });

    // 경로에 해당하는 정거장 및 구간 하이라이트
    for (let i = 0; i < path.length; i++) {
      const step = path[i];
      const stationNode = document.getElementById(`station-${step.stationId}`);
      if (stationNode) {
        stationNode.classList.remove('dimmed');
        stationNode.classList.add('path-stop');
      }

      if (i > 0) {
        const prevStep = path[i - 1];
        
        // 이전 정거장과 현재 정거장의 동일 노선 링크를 찾음
        if (prevStep.stationId !== step.stationId) {
          // 링크 방향이 A->B 또는 B->A 인 엘리먼트 타겟팅
          const linkId1 = `link-${prevStep.stationId}-${step.stationId}-${step.line}`;
          const linkId2 = `link-${step.stationId}-${prevStep.stationId}-${step.line}`;
          const linkElement = document.getElementById(linkId1) || document.getElementById(linkId2);

          if (linkElement) {
            linkElement.classList.remove('dimmed');
            linkElement.classList.add('highlight');
          }
        }
      }
    }
  }

  /**
   * 지도 하이라이트 및 흐림 효과 전부 리셋
   */
  clearHighlights() {
    document.querySelectorAll('.station-node').forEach(node => {
      node.classList.remove('dimmed', 'path-stop');
    });
    document.querySelectorAll('.subway-link').forEach(link => {
      link.classList.remove('dimmed', 'highlight');
    });
  }
}
