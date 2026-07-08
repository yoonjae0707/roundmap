import { stations, lines } from './subwayData.js';
import { SubwayPathFinder } from './pathFinder.js';
import { SubwayMapRenderer } from './mapRenderer.js';
import { StationDetailSheet } from './stationDetail.js';
import { RandomTripManager } from './randomTrip.js';

class SubwayApp {
  constructor() {
    this.pathFinder = new SubwayPathFinder();
    this.mapRenderer = null;
    this.detailSheet = null;
    this.randomTrip = null;

    // 글로벌 상태값
    this.startStationId = null;
    this.endStationId = null;
    this.searchMode = 'time'; // 'time' or 'transfer'
    this.isBarrierFreeActive = false;

    this.init();
  }

  init() {
    // 1. 컴포넌트 & 모듈 인스턴스 초기화
    this.mapRenderer = new SubwayMapRenderer('subway-svg', 'map-viewport', (stationId) => {
      this.detailSheet.open(stationId);
    });

    this.detailSheet = new StationDetailSheet('bottom-sheet', (type, stationId) => {
      this.setDirectionStation(type, stationId);
    });

    this.randomTrip = new RandomTripManager('random-trip-modal', 'random-trip-content', (stationId) => {
      this.setDirectionStation('end', stationId);
      // 추천 여행지를 목적지로 정하면, 지도 포커스 이동
      this.mapRenderer.selectStation(stationId);
    });

    // 2. 이벤트 핸들러 바인딩
    this.bindDOMEvents();
    
    // Lucide 아이콘 초기 렌더링
    lucide.createIcons();
  }

  bindDOMEvents() {
    // 배리어프리 토글
    const btnBarrierFree = document.getElementById('btn-barrier-free');
    btnBarrierFree.addEventListener('click', () => {
      this.isBarrierFreeActive = !this.isBarrierFreeActive;
      btnBarrierFree.classList.toggle('active', this.isBarrierFreeActive);
      
      // 모드 변경에 따라 지도 스타일 변경 또는 재탐색 실행
      if (this.isBarrierFreeActive) {
        document.body.classList.add('barrier-free-theme');
      } else {
        document.body.classList.remove('barrier-free-theme');
      }

      // 지도 상의 교통 약자 필터 레이어 실시간 업데이트
      if (this.mapRenderer) {
        this.mapRenderer.updateBarrierFreeLayer();
      }

      this.triggerPathSearch();
    });

    // 랜덤 여행 추천 클릭
    document.getElementById('btn-random-trip').addEventListener('click', () => {
      this.randomTrip.open();
    });

    // 검색 모드 선택기
    document.getElementById('mode-time').addEventListener('click', (e) => {
      this.setSearchMode('time');
    });
    document.getElementById('mode-transfer').addEventListener('click', (e) => {
      this.setSearchMode('transfer');
    });

    // 검색창 오토컴플릿 연동
    this.setupSearchInput('input-start', 'suggestions-start', 'btn-clear-start', 'start');
    this.setupSearchInput('input-end', 'suggestions-end', 'btn-clear-end', 'end');

    // 출발/도착 반전 스왑
    document.getElementById('btn-swap-stations').addEventListener('click', () => {
      this.swapStations();
    });

    // 모바일 하단 길찾기 탭 슬라이더 터치 제어 (Expanded 제어)
    const searchPanel = document.getElementById('search-panel');
    const panelHandle = searchPanel.querySelector('.panel-handle');
    
    panelHandle.addEventListener('click', () => {
      searchPanel.classList.toggle('expanded');
    });

    // 탭메뉴 (길찾기 vs 이용안내)
    const tabButtons = searchPanel.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTab = btn.dataset.tab;
        searchPanel.querySelectorAll('.tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        document.getElementById(`tab-${targetTab}`).classList.remove('hidden');

        // 모바일일 경우 탭 클릭 시 강제로 패널 펼침
        if (window.innerWidth <= 768) {
          searchPanel.classList.add('expanded');
        }
      });
    });

    // 지도를 클릭하면 바텀시트가 열려있을 때 닫아주기 (실지도 컨테이너 대상)
    document.getElementById('map').addEventListener('click', (e) => {
      // 마커 클릭 시의 버블링에 의한 오닫힘 방지를 위해 타겟이 지도 배경일 때만 닫기
      if (e.target.id === 'map') {
        this.detailSheet.close();
      }
    });
  }

  /**
   * 검색어 입력 필드 자동완성 및 제어 이벤트 장착
   */
  setupSearchInput(inputId, suggestionId, clearId, type) {
    const input = document.getElementById(inputId);
    const suggestionBox = document.getElementById(suggestionId);
    const clearBtn = document.getElementById(clearId);

    // 입력 이벤트
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (!query) {
        suggestionBox.classList.remove('active');
        return;
      }

      // 문자 매칭 필터링 (끝자리 '역' 문자열을 지능적으로 분리하여 매칭 개선)
      const cleanStationName = (name) => name.endsWith('역') ? name.slice(0, -1) : name;
      const cleanQuery = query.endsWith('역') ? query.slice(0, -1) : query;

      const matches = Object.values(stations).filter(station => 
        station.name.includes(query) || 
        cleanStationName(station.name).includes(cleanQuery)
      );

      if (matches.length > 0) {
        suggestionBox.innerHTML = '';
        matches.slice(0, 8).forEach(station => {
          const item = document.createElement('div');
          item.className = 'suggestion-item';
          
          const nameSpan = document.createElement('span');
          nameSpan.className = 'suggestion-name';
          nameSpan.textContent = station.name;

          const linesDiv = document.createElement('div');
          linesDiv.className = 'suggestion-lines';
          station.lines.forEach(l => {
            const lineConfig = lines[l];
            if (lineConfig) {
              const badge = document.createElement('span');
              badge.className = 'line-tag-mini';
              badge.style.backgroundColor = lineConfig.color;
              badge.textContent = lineConfig.name.replace('호선', '');
              linesDiv.appendChild(badge);
            }
          });

          item.appendChild(nameSpan);
          item.appendChild(linesDiv);

          // 선택 이벤트
          item.addEventListener('click', () => {
            input.value = station.name;
            suggestionBox.classList.remove('active');
            
            if (type === 'start') {
              this.startStationId = station.id;
            } else {
              this.endStationId = station.id;
            }
            this.triggerPathSearch();
          });

          suggestionBox.appendChild(item);
        });
        suggestionBox.classList.add('active');
      } else {
        suggestionBox.classList.remove('active');
      }
    });

    // 포커스 아웃 시 제안창 지연 닫기 (클릭 이벤트 소실 방지)
    input.addEventListener('blur', () => {
      setTimeout(() => {
        suggestionBox.classList.remove('active');
      }, 200);
    });

    // 오프너용 포커스 인
    input.addEventListener('focus', () => {
      if (input.value.trim()) {
        suggestionBox.classList.add('active');
      }
    });

    // 클리어(X) 버튼
    clearBtn.addEventListener('click', () => {
      input.value = '';
      suggestionBox.classList.remove('active');
      if (type === 'start') {
        this.startStationId = null;
      } else {
        this.endStationId = null;
      }
      this.clearSearchUI();
    });
  }

  /**
   * 바텀시트나 모달에서 '출발/도착' 지정 시 검색창 데이터 갱신
   */
  setDirectionStation(type, stationId) {
    const station = stations[stationId];
    if (!station) return;

    if (type === 'start') {
      this.startStationId = stationId;
      document.getElementById('input-start').value = station.name;
    } else {
      this.endStationId = stationId;
      document.getElementById('input-end').value = station.name;
    }

    // 모바일 뷰일 경우 경로 탐색이 원활하게 보이도록 검색바 패널 위로 펼침
    if (window.innerWidth <= 768) {
      document.getElementById('search-panel').classList.add('expanded');
    }

    this.triggerPathSearch();
  }

  /**
   * 출발역과 도착역 정보 반전
   */
  swapStations() {
    const tempId = this.startStationId;
    this.startStationId = this.endStationId;
    this.endStationId = tempId;

    const startInput = document.getElementById('input-start');
    const endInput = document.getElementById('input-end');
    const tempVal = startInput.value;
    startInput.value = endInput.value;
    endInput.value = tempVal;

    this.triggerPathSearch();
  }

  /**
   * 검색 기준 모드 설정 (최단시간 vs 최소환승)
   */
  setSearchMode(mode) {
    this.searchMode = mode;
    document.getElementById('mode-time').classList.toggle('active', mode === 'time');
    document.getElementById('mode-transfer').classList.toggle('active', mode === 'transfer');

    this.triggerPathSearch();
  }

  /**
   * 길찾기 알고리즘을 구동하고 결과를 패널 및 지도에 주입
   */
  triggerPathSearch() {
    if (!this.startStationId || !this.endStationId) {
      // 정보가 둘 중 하나라도 누락되면 맵 하이라이트 해제
      this.mapRenderer.clearHighlights();
      return;
    }

    const result = this.pathFinder.findPath(this.startStationId, this.endStationId, {
      mode: this.searchMode,
      isAccessibleOnly: this.isBarrierFreeActive
    });

    this.renderPathResult(result);
  }

  /**
   * 경로 탐색 데이터 결과를 UI 카드로 변형하여 렌더링
   */
  renderPathResult(result) {
    const resultBox = document.getElementById('search-result');
    resultBox.innerHTML = '';

    if (!result || !result.path || result.path.length === 0) {
      resultBox.innerHTML = `
        <div class="result-placeholder" style="color: var(--color-danger);">
          <i data-lucide="alert-octagon"></i>
          <p>이동할 수 있는 무장애 경로가 없거나<br>노선 간 단절된 역입니다.</p>
        </div>
      `;
      lucide.createIcons();
      this.mapRenderer.clearHighlights();
      return;
    }

    // 1. 지도에 하이라이트 처리
    this.mapRenderer.highlightPath(result);

    // 2. 길찾기 결과 요약 헤더 카드 작성
    const summaryCard = document.createElement('div');
    summaryCard.className = 'path-result-card';

    // 소요 시간 및 정보 구성
    let summaryHTML = `
      <div class="result-header-summary">
        <div class="result-time-box">
          <div class="result-time-val">${result.totalTime}<span>분</span></div>
        </div>
        <div class="result-meta-box">
          <div>환승 <strong>${result.transferCount}회</strong></div>
          <div>정거장 <strong>${result.path.length - 1}개역</strong></div>
        </div>
      </div>
    `;

    // 배리어프리 모드 활성화 시 혹은 교통 약자 접근 제한 요소 발견 시 경고 카드 생성
    if (result.accessibilityIssues.length > 0) {
      let issuesList = result.accessibilityIssues.map(issue => `• ${issue}`).join('<br>');
      summaryHTML += `
        <div class="barrier-alert-banner">
          <i data-lucide="alert-circle" style="flex-shrink: 0; width: 16px; height: 16px;"></i>
          <div>
            <strong>교통 약자 안전 유의 정보:</strong><br>
            <span style="font-size: 11px; opacity: 0.95;">${issuesList}</span>
          </div>
        </div>
      `;
    } else if (this.isBarrierFreeActive) {
      summaryHTML += `
        <div class="barrier-alert-banner" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.2); color: var(--color-success);">
          <i data-lucide="check-circle" style="flex-shrink: 0; width: 16px; height: 16px;"></i>
          <div>
            <strong>안전한 배리어프리 경로 탐색 완료</strong><br>
            <span style="font-size: 11px; opacity: 0.95;">모든 경유지에 휠체어 엘리베이터 이동 동선이 확보되어 있습니다.</span>
          </div>
        </div>
      `;
    }

    // 3. 타임라인(상세 이동 동선) 조립
    let timelineHTML = `<div class="path-timeline">`;
    
    result.path.forEach((step, idx) => {
      const isTransfer = idx > 0 && idx < result.path.length - 1 && step.stationId === result.path[idx + 1].stationId;
      const isEnd = idx === result.path.length - 1;
      const lineConfig = lines[step.line];
      
      // 같은 역인데 다음 스텝으로 호선이 바뀌면 환승 표시
      if (isTransfer) {
        const nextStep = result.path[idx + 1];
        timelineHTML += `
          <div class="timeline-step transfer-step">
            <span class="step-node"></span>
            <div class="step-info">
              <div class="step-station-row">
                <span class="step-station-name">${step.stationName}</span>
                <span class="line-badge-micro" style="background-color: ${lineConfig.color};">${step.line}</span>
              </div>
              <div class="step-transfer-desc">
                <i data-lucide="git-compare" style="width: 12px; height: 12px;"></i>
                <span>${lineConfig.name} ➔ ${lines[nextStep.line].name} 환승</span>
              </div>
            </div>
          </div>
        `;
      } else if (idx > 0 && result.path[idx - 1].stationId === step.stationId) {
        // 환승 스텝의 뒷부분이므로 그리지 않고 스킵
        return;
      } else {
        timelineHTML += `
          <div class="timeline-step">
            <span class="step-node" style="border-color: ${lineConfig ? lineConfig.color : '#fff'};"></span>
            <div class="step-info">
              <div class="step-station-row">
                <span class="step-station-name">${step.stationName}</span>
                ${lineConfig ? `<span class="line-badge-micro" style="background-color: ${lineConfig.color};">${step.line}</span>` : ''}
              </div>
              <div class="step-detail">${isEnd ? '하차 및 목적지 도착' : '탑승/통과'}</div>
            </div>
          </div>
        `;
      }
    });

    timelineHTML += `</div>`;

    summaryCard.innerHTML = summaryHTML + timelineHTML;
    resultBox.appendChild(summaryCard);
    
    lucide.createIcons();
  }

  /**
   * 검색 UI 초기화 (길찾기 결과 리셋)
   */
  clearSearchUI() {
    if (!this.startStationId && !this.endStationId) {
      const resultBox = document.getElementById('search-result');
      resultBox.innerHTML = `
        <div class="result-placeholder">
          <i data-lucide="map-pin"></i>
          <p>출발역과 도착역을 설정하여<br>최적의 경로를 탐색해 보세요.</p>
        </div>
      `;
      lucide.createIcons();
      this.mapRenderer.clearHighlights();
    }
  }
}

// 앱 구동
document.addEventListener('DOMContentLoaded', () => {
  window.SubwayApplication = new SubwayApp();
});
