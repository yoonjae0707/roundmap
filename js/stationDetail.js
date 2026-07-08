import { stations, lines, congestionBaseline, stationCongestionTypes } from './subwayData.js';

/**
 * 역 상세정보를 표시하는 바텀 시트 제어 및 차트 시각화 모듈
 */
export class StationDetailSheet {
  constructor(sheetId, onSetRoute) {
    this.sheet = document.getElementById(sheetId);
    this.onSetRoute = onSetRoute; // { type: 'start'|'end', stationId } 콜백
    this.currentStationId = null;
    this.chart = null;

    this.init();
  }

  init() {
    this.setupEvents();
    this.setupDragGesture();
    this.populateTimePicker();
  }

  setupEvents() {
    // 닫기 버튼
    document.getElementById('btn-close-sheet').addEventListener('click', () => this.close());

    // 퀵 길찾기 버튼
    document.getElementById('btn-quick-start').addEventListener('click', () => {
      if (this.currentStationId && this.onSetRoute) {
        this.onSetRoute('start', this.currentStationId);
        this.close();
      }
    });

    document.getElementById('btn-quick-end').addEventListener('click', () => {
      if (this.currentStationId && this.onSetRoute) {
        this.onSetRoute('end', this.currentStationId);
        this.close();
      }
    });

    // 탭 전환 이벤트
    const tabButtons = this.sheet.querySelectorAll('.sheet-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTab = btn.dataset.sheetTab;
        this.sheet.querySelectorAll('.sheet-tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        document.getElementById(`sheet-tab-${targetTab}`).classList.remove('hidden');

        // 혼잡도 탭 선택 시 차트 크기 재조정(VDraw 버그 방지)
        if (targetTab === 'congestion' && this.chart) {
          this.chart.update();
        }
      });
    });

    // 혼잡도 시간대 셀렉트 박스 변경 시
    document.getElementById('congestion-time-select').addEventListener('change', (e) => {
      this.updateCongestionStatus(parseInt(e.target.value));
    });
  }

  /**
   * 모바일 환경에서 바텀 시트를 아래로 스와이프하여 닫는 제스처 구현
   */
  setupDragGesture() {
    const handle = this.sheet.querySelector('.sheet-handle');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const onStart = (e) => {
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      isDragging = true;
      this.sheet.style.transition = 'none'; // 제스처 반응성을 위해 트랜지션 해제
    };

    const onMove = (e) => {
      if (!isDragging) return;
      currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - startY;

      // 위로는 더 안 늘어나고 아래로만 드래그 가능
      if (deltaY > 0) {
        this.sheet.style.transform = `translateY(${deltaY}px)`;
      }
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      this.sheet.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      
      const deltaY = currentY - startY;
      // 100px 이상 아래로 끌어내렸으면 닫음
      if (deltaY > 100) {
        this.close();
      } else {
        // 복귀
        this.sheet.style.transform = 'translateY(0)';
      }
    };

    handle.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    handle.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  populateTimePicker() {
    const select = document.getElementById('congestion-time-select');
    select.innerHTML = '';
    
    // 5시부터 24시까지 바인딩
    for (let h = 5; h <= 24; h++) {
      const option = document.createElement('option');
      option.value = h;
      option.textContent = `${h.toString().padStart(2, '0')}:00`;
      select.appendChild(option);
    }
  }

  open(stationId) {
    this.currentStationId = stationId;
    const station = stations[stationId];
    if (!station) return;

    // 1. 역사 기본 이름 주입
    document.getElementById('sheet-station-name').textContent = station.name;
    
    // 환승역 호선 탭 활성 기본값
    this.activeLine = station.lines[0];

    // 2. 역사 세부 정보(편의시설, 교통약자) 렌더링
    this.renderStationInfo();

    // 3. 혼잡도 통계 초기 설정
    const currentHour = new Date().getHours();
    let targetHour = currentHour >= 5 && currentHour <= 24 ? currentHour : 8;
    document.getElementById('congestion-time-select').value = targetHour;
    this.updateCongestionStatus(targetHour);
    this.renderCongestionChart();

    // 4. 실시간 도착 정보 수신
    this.renderRealtimeArrivals();

    // 5. 기본 탭(편의시설)으로 초기화 후 열기
    this.sheet.querySelectorAll('.sheet-tab-btn').forEach(btn => btn.classList.remove('active'));
    this.sheet.querySelector('[data-sheet-tab="facilities"]').classList.add('active');
    this.sheet.querySelectorAll('.sheet-tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById('sheet-tab-facilities').classList.remove('hidden');

    this.sheet.classList.add('active');
    this.sheet.style.transform = 'translateY(0)';
  }

  /**
   * 선택된 호선(this.activeLine)에 맞춰 탭 및 편의시설, 교통 약자 무장애 상태를 재구성합니다.
   */
  renderStationInfo() {
    const station = stations[this.currentStationId];
    if (!station) return;

    // 1. 호선 선택 탭 드로잉 (클릭 시 탭 전환)
    const badgeContainer = document.getElementById('sheet-station-lines');
    badgeContainer.innerHTML = '';
    badgeContainer.style.display = 'flex';
    badgeContainer.style.gap = '8px';
    badgeContainer.style.flexWrap = 'wrap';

    station.lines.forEach(lineId => {
      const config = lines[lineId];
      if (config) {
        const btn = document.createElement('button');
        btn.className = `badge-tab ${lineId === this.activeLine ? 'active' : ''}`;
        btn.style.backgroundColor = lineId === this.activeLine ? config.color : 'rgba(255, 255, 255, 0.05)';
        btn.style.borderColor = config.color;
        btn.style.color = '#ffffff';
        btn.style.padding = '6px 12px';
        btn.style.borderRadius = '20px';
        btn.style.borderStyle = 'solid';
        btn.style.borderWidth = '1px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '12px';
        btn.style.fontWeight = '600';
        btn.style.transition = 'all 0.2s';
        btn.textContent = config.name;

        // 클릭 이벤트 등록 (호선 전환)
        btn.addEventListener('click', () => {
          this.activeLine = lineId;
          this.renderStationInfo();
          this.renderRealtimeArrivals();
        });

        badgeContainer.appendChild(btn);
      }
    });

    // 2. 활성 호선에 따른 교통 약자 대응 마크업 렌더링
    const accessibleInfo = document.getElementById('sheet-accessible-info');
    const accessibleData = station.accessible[this.activeLine] || station.accessible[station.lines[0]];
    
    if (accessibleData && accessibleData.hasElevator) {
      accessibleInfo.innerHTML = '<i class="lucide-accessibility" style="color:var(--color-success)"></i> <span>무장애 이동(엘리베이터) 탑승 지원 역사</span>';
      accessibleInfo.style.background = 'rgba(16, 185, 129, 0.08)';
      accessibleInfo.style.borderColor = 'rgba(16, 185, 129, 0.2)';
      accessibleInfo.style.color = 'var(--color-success)';
    } else {
      accessibleInfo.innerHTML = '<i class="lucide-alert-triangle" style="color:var(--color-danger)"></i> <span>승강장 휠체어 이용 제한 및 리프트 환승 역사</span>';
      accessibleInfo.style.background = 'rgba(239, 68, 68, 0.08)';
      accessibleInfo.style.borderColor = 'rgba(239, 68, 68, 0.2)';
      accessibleInfo.style.color = 'var(--color-danger)';
    }

    // 3. 활성 호선에 따른 편의시설 및 배리어프리 루트 정보 렌더링
    const facilityData = station.facilities[this.activeLine] || station.facilities[station.lines[0]] || {};
    
    document.getElementById('val-toilet').textContent = facilityData.toilet || '정보 없음';
    document.getElementById('val-nursing').textContent = facilityData.nursing || '정보 없음';
    document.getElementById('val-locker').textContent = facilityData.locker || '정보 없음';
    document.getElementById('val-elevator').textContent = facilityData.elevatorLocation || '정보 없음';
    document.getElementById('val-accessible-route').textContent = (accessibleData && accessibleData.accessibleRoute) || '정보 없음';

    lucide.createIcons();
  }

  close() {
    this.sheet.classList.remove('active');
    this.sheet.style.transform = '';
    this.currentStationId = null;
  }

  /**
   * 선택된 시간의 혼잡도를 계산하여 텍스트 및 신호등 색상을 결정합니다.
   */
  updateCongestionStatus(hour) {
    const station = stations[this.currentStationId];
    if (!station) return;

    const baseCongestion = congestionBaseline[hour] || 40;
    const type = stationCongestionTypes[this.currentStationId] || 'residential';

    let patternMultiplier = 1.0;
    if (type === 'office') {
      if (hour === 8 || hour === 18) patternMultiplier = 1.25;
      else if (hour >= 11 && hour <= 13) patternMultiplier = 0.9;
    } else if (type === 'tourism') {
      if (hour >= 13 && hour <= 17) patternMultiplier = 1.2;
    }

    const calculatedCongestion = Math.round(baseCongestion * patternMultiplier);
    
    const valueEl = document.getElementById('congestion-value');
    const labelEl = document.getElementById('congestion-label');
    const signalEl = document.getElementById('congestion-signal');

    valueEl.textContent = `${calculatedCongestion}%`;

    if (calculatedCongestion <= 35) {
      labelEl.textContent = '여유';
      labelEl.style.color = 'var(--color-success)';
      signalEl.style.backgroundColor = 'var(--color-success)';
    } else if (calculatedCongestion <= 70) {
      labelEl.textContent = '보통';
      labelEl.style.color = 'var(--color-warning)';
      signalEl.style.backgroundColor = 'var(--color-warning)';
    } else {
      labelEl.textContent = '혼잡';
      labelEl.style.color = 'var(--color-danger)';
      signalEl.style.backgroundColor = 'var(--color-danger)';
    }
  }

  /**
   * 시간대별 예측 혼잡도를 라인 차트로 렌더링
   */
  renderCongestionChart() {
    const ctx = document.getElementById('congestion-chart').getContext('2d');
    
    if (this.chart) {
      this.chart.destroy();
    }

    const hours = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const type = stationCongestionTypes[this.currentStationId] || 'residential';
    
    const dataPoints = hours.map(h => {
      const base = congestionBaseline[h] || 40;
      let mult = 1.0;
      if (type === 'office') {
        if (h === 8 || h === 18) mult = 1.25;
        else if (h >= 11 && h <= 13) mult = 0.9;
      } else if (type === 'tourism') {
        if (h >= 13 && h <= 17) mult = 1.2;
      }
      return Math.round(base * mult);
    });

    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    const pointRadii = hours.map(() => 0);
    const pointHoverRadii = hours.map(() => 5);
    const currentHour = new Date().getHours();
    const currentIndex = hours.indexOf(currentHour >= 5 && currentHour <= 24 ? currentHour : 8);
    if (currentIndex !== -1) {
      pointRadii[currentIndex] = 5;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours.map(h => `${h}시`),
        datasets: [{
          label: '혼잡도 (%)',
          data: dataPoints,
          borderColor: '#38bdf8',
          borderWidth: 2.5,
          fill: true,
          backgroundColor: gradient,
          tension: 0.4,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#38bdf8',
          pointBorderWidth: 2,
          pointRadius: pointRadii,
          pointHoverRadius: pointHoverRadii
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { max: 130, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#9ca3af', font: { size: 9 }, stepSize: 30, callback: (v) => `${v}%` } }
        }
      }
    });
  }

  /**
   * 서울시 OpenAPI 실시간 도착 정보 연동 (선택된 노선에 맞는 도착 정보 추출 및 도착예정분 역산 기능 탑재)
   */
  async renderRealtimeArrivals() {
    const listContainer = document.getElementById('realtime-arrivals-list');
    const updateTimeSpan = document.getElementById('realtime-update-time');
    
    listContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 15px; font-size: 13px;">
        <i data-lucide="loader" class="spin-hover" style="display:inline-block; margin-right:6px; vertical-align: middle;"></i>
        <span>실시간 열차 정보를 수신 중입니다...</span>
      </div>
    `;
    lucide.createIcons();

    const station = stations[this.currentStationId];
    if (!station) return;

    const cleanName = station.name.endsWith('역') ? station.name.slice(0, -1) : station.name;
    const apiKey = '4166664454796f6f3131357261506e4c';
    const targetUrl = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/20/${encodeURIComponent(cleanName)}`;
    
    let finalUrl;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      finalUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    } else {
      finalUrl = `/api/seoul-subway/${apiKey}/json/realtimeStationArrival/0/20/${encodeURIComponent(cleanName)}`;
    }

    try {
      const response = await fetch(finalUrl);
      const data = await response.json();
      const now = new Date();
      updateTimeSpan.textContent = `실시간 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} 기준 (공공 API 연동)`;

      listContainer.innerHTML = '';
      
      if (data.realtimeArrivalList && data.realtimeArrivalList.length > 0) {
        const subwayIdMap = {
          '1001': '1', '1002': '2', '1003': '3', '1004': '4', '1005': '5', '1006': '6',
          '1007': '7', '1008': '8', '1009': '9', '1063': 'K', '1075': 'B', '1077': 'S', '1065': 'A'
        };

        const filteredArrivals = data.realtimeArrivalList.filter(item => {
          const mappedLineId = subwayIdMap[item.subwayId];
          return mappedLineId === this.activeLine;
        });

        if (filteredArrivals.length === 0) {
          this.renderMockArrivals('일치 노선 정보 없음');
          return;
        }

        filteredArrivals.forEach(item => {
          const mappedLineId = subwayIdMap[item.subwayId];
          const lineConfig = lines[mappedLineId];
          if (!lineConfig) return;

          const trainDir = item.trainLineNm; 
          let rawMsg = item.arvlMsg2; 
          const barvlDt = parseInt(item.barvlDt);

          let processedTimeText = '';
          if (barvlDt && barvlDt > 0) {
            const minutes = Math.floor(barvlDt / 60);
            const seconds = barvlDt % 60;
            processedTimeText = seconds > 0 ? `약 ${minutes}분 ${seconds}초 후` : `약 ${minutes}분 후`;
          } else {
            const stationPattern = /\[(\d+)\]번째\s*전역/;
            const simplePattern = /(\d+)전역/;
            
            let match = rawMsg.match(stationPattern) || rawMsg.match(simplePattern);
            if (match) {
              const stationCount = parseInt(match[1]);
              const calculatedMin = Math.round(stationCount * 2.5);
              processedTimeText = `약 ${calculatedMin}분 후`;
            }
          }

          const finalStatusText = processedTimeText ? `${rawMsg} (${processedTimeText})` : rawMsg;
          
          const arrivalDOM = this.createArrivalDOM(lineConfig, trainDir, finalStatusText);
          listContainer.appendChild(arrivalDOM);
        });
      } else {
        this.renderMockArrivals('해당 시간대 운행 정보 부재');
      }
    } catch (error) {
      this.renderMockArrivals('네트워크 지연으로 인한 가상 정보');
    }
  }

  /**
   * API 호출 장애 혹은 점검 시간 시 구동되는 가상 도착 정보 Fallback 렌더러
   */
  renderMockArrivals(fallbackReason = '') {
    const listContainer = document.getElementById('realtime-arrivals-list');
    const updateTimeSpan = document.getElementById('realtime-update-time');
    
    const now = new Date();
    updateTimeSpan.textContent = `실시간 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} 기준 (${fallbackReason})`;

    listContainer.innerHTML = '';
    const station = stations[this.currentStationId];
    if (!station) return;

    const mockDirections = {
      '1': { up: '소요산 방면', down: '인천/신창 방면' },
      '2': { up: '내선순환 (시청방향)', down: '외선순환 (신촌방향)' },
      '3': { up: '대화 방면', down: '오금 방면' },
      '4': { up: '진접 방면', down: '오이도 방면' },
      '5': { up: '방화 방면', down: '하남검단산/마천 방면' },
      '6': { up: '응암순환 방면', down: '신내 방면' },
      '7': { up: '장암 방면', down: '석남 방면' },
      '8': { up: '별내 방면', down: '모란 방면' },
      '9': { up: '개화 방면', down: '중앙보훈병원 방면' },
      'S': { up: '신사 방면', down: '광교 방면' },
      'B': { up: '청량리 방면', down: '인천 방면' },
      'K': { up: '문산 방면', down: '양평 방면' },
      'A': { up: '서울역 방면', down: '인천공항T2 방면' },
      'GTX-A': { up: '운정중앙 방면', down: '동탄 방면' }
    };

    const dirs = mockDirections[this.activeLine] || { up: '상행', down: '하행' };
    const config = lines[this.activeLine];

    if (config) {
      const upTime = Math.floor(Math.random() * 8) + 1;
      const upState = upTime === 1 ? '진입 중' : (upTime === 2 ? '전역 출발' : `${upTime}전역 (약 ${upTime * 2}분 후 도착 예정)`);
      const upItem = this.createArrivalDOM(config, dirs.up, upState);
      listContainer.appendChild(upItem);

      const downTime = Math.floor(Math.random() * 8) + 1;
      const downState = downTime === 1 ? '진입 중' : (downTime === 2 ? '전역 출발' : `${downTime}전역 (약 ${downTime * 2}분 후 도착 예정)`);
      const downItem = this.createArrivalDOM(config, dirs.down, downState);
      listContainer.appendChild(downItem);
    }
  }

  createArrivalDOM(lineConfig, direction, statusText) {
    const div = document.createElement('div');
    div.className = 'arrival-item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'arrival-train-info';

    const lineBadge = document.createElement('span');
    lineBadge.className = 'badge';
    lineBadge.style.backgroundColor = lineConfig.color;
    lineBadge.style.fontSize = '10px';
    lineBadge.style.padding = '1px 6px';
    lineBadge.textContent = lineConfig.name;

    const dirSpan = document.createElement('span');
    dirSpan.className = 'arrival-train-dir';
    dirSpan.textContent = direction;

    infoDiv.appendChild(lineBadge);
    infoDiv.appendChild(dirSpan);

    const statusSpan = document.createElement('span');
    statusSpan.className = 'arrival-status';
    statusSpan.textContent = statusText;

    if (statusText === '진입 중') {
      statusSpan.style.color = 'var(--color-danger)';
    } else if (statusText === '전역 출발') {
      statusSpan.style.color = 'var(--color-warning)';
    } else {
      statusSpan.style.color = 'var(--text-accent)';
    }

    div.appendChild(infoDiv);
    div.appendChild(statusSpan);

    return div;
  }
}
