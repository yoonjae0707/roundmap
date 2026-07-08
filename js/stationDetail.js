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

    // 1. 역사 기본 텍스트 주입
    document.getElementById('sheet-station-name').textContent = station.name;

    // 호선 뱃지 주입
    const badgeContainer = document.getElementById('sheet-station-lines');
    badgeContainer.innerHTML = '';
    station.lines.forEach(lineId => {
      const config = lines[lineId];
      if (config) {
        const span = document.createElement('span');
        span.className = 'badge';
        span.style.backgroundColor = config.color;
        span.style.color = config.textColor || '#fff';
        span.textContent = config.name;
        badgeContainer.appendChild(span);
      }
    });

    // 2. 교통 약자 대응 마크업 제어
    const accessibleInfo = document.getElementById('sheet-accessible-info');
    if (station.accessible.hasElevator) {
      accessibleInfo.innerHTML = '<i class="lucide-accessibility"></i> <span>무장애 이동(엘리베이터) 탑승 지원 역사</span>';
      accessibleInfo.style.background = 'rgba(16, 185, 129, 0.08)';
      accessibleInfo.style.borderColor = 'rgba(16, 185, 129, 0.2)';
      accessibleInfo.style.color = 'var(--color-success)';
    } else {
      accessibleInfo.innerHTML = '<i class="lucide-alert-triangle"></i> <span>승강장 휠체어 이용 제한 및 리프트 환승 역사</span>';
      accessibleInfo.style.background = 'rgba(239, 68, 68, 0.08)';
      accessibleInfo.style.borderColor = 'rgba(239, 68, 68, 0.2)';
      accessibleInfo.style.color = 'var(--color-danger)';
    }
    // lucide 아이콘 재인식
    lucide.createIcons();

    // 3. 편의시설 정보 주입
    document.getElementById('val-toilet').textContent = station.facilities.toilet || '정보 없음';
    document.getElementById('val-nursing').textContent = station.facilities.nursing || '정보 없음';
    document.getElementById('val-locker').textContent = station.facilities.locker || '정보 없음';
    document.getElementById('val-elevator').textContent = station.facilities.elevatorLocation || '정보 없음';
    document.getElementById('val-accessible-route').textContent = station.accessible.accessibleRoute || '정보 없음';

    // 4. 혼잡도 통계 처리
    const currentHour = new Date().getHours();
    // 지하철 운행 시간(05~24시) 범주 설정
    let targetHour = currentHour >= 5 && currentHour <= 24 ? currentHour : 8;
    document.getElementById('congestion-time-select').value = targetHour;
    this.updateCongestionStatus(targetHour);
    this.renderCongestionChart();

    // 5. 실시간 도착 정보 모의 렌더링
    this.renderRealtimeArrivals();

    // 6. 기본 탭(편의시설)으로 초기화 후 열기
    this.sheet.querySelectorAll('.sheet-tab-btn').forEach(btn => btn.classList.remove('active'));
    this.sheet.querySelector('[data-sheet-tab="facilities"]').classList.add('active');
    this.sheet.querySelectorAll('.sheet-tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById('sheet-tab-facilities').classList.remove('hidden');

    this.sheet.classList.add('active');
    this.sheet.style.transform = 'translateY(0)';
  }

  close() {
    this.sheet.classList.remove('active');
    // 모바일/PC 레이아웃 구분을 위해 트랜스폼 리셋
    this.sheet.style.transform = '';
    this.currentStationId = null;
  }

  /**
   * 선택된 시간의 혼잡도를 계산하여 텍스트 및 신호등 색상을 결정합니다.
   */
  updateCongestionStatus(hour) {
    const station = stations[this.currentStationId];
    if (!station) return;

    const base = congestionBaseline[hour] || 20;
    const type = stationCongestionTypes[this.currentStationId] || 'residential';
    
    // 역 혼잡 성격 가중치
    let multiplier = 1.0;
    if (type === 'office') {
      // 출퇴근 극대화
      if (hour === 8 || hour === 18) multiplier = 1.35;
      else if (hour === 7 || hour === 9 || hour === 17 || hour === 19) multiplier = 1.2;
      else multiplier = 0.8;
    } else if (type === 'tourism') {
      // 주중 오후에 완만
      if (hour >= 11 && hour <= 16) multiplier = 1.25;
      else if (hour >= 17 && hour <= 20) multiplier = 1.15;
      else multiplier = 0.7;
    }

    const percentage = Math.min(Math.round(base * multiplier), 120);

    const statusBadge = document.getElementById('val-congestion-status');
    const descText = document.getElementById('val-congestion-desc');
    
    statusBadge.className = 'congestion-level-badge';
    
    if (percentage < 45) {
      statusBadge.textContent = `${percentage}% 여유`;
      statusBadge.classList.add('good');
      descText.textContent = '승객 밀도가 낮아 객차가 매우 여유로우며 쾌적한 이동이 가능합니다.';
    } else if (percentage < 80) {
      statusBadge.textContent = `${percentage}% 보통`;
      statusBadge.classList.add('normal');
      descText.textContent = '일부 좌석이 가득 찰 수 있으나 서서 가기에 공간이 넉넉합니다.';
    } else {
      statusBadge.textContent = `${percentage}% 혼잡`;
      statusBadge.classList.add('bad');
      descText.textContent = '객차가 만원이며 승하차 통로 정체가 있을 수 있으니 주의하세요.';
    }
  }

  /**
   * Chart.js를 사용한 시간대별 혼잡도 곡선 시각화
   */
  renderCongestionChart() {
    const ctx = document.getElementById('congestionChart').getContext('2d');
    
    // 기존 차트 파괴 후 재생성
    if (this.chart) {
      this.chart.destroy();
    }

    const hours = Array.from({ length: 20 }, (_, i) => i + 5); // 5시 ~ 24시
    const type = stationCongestionTypes[this.currentStationId] || 'residential';
    
    const dataPoints = hours.map(h => {
      const base = congestionBaseline[h] || 20;
      let mult = 1.0;
      if (type === 'office') {
        if (h === 8 || h === 18) mult = 1.35;
        else if (h === 7 || h === 9 || h === 17 || h === 19) mult = 1.2;
        else mult = 0.8;
      } else if (type === 'tourism') {
        if (h >= 11 && h <= 16) mult = 1.25;
        else if (h >= 17 && h <= 20) mult = 1.15;
        else mult = 0.7;
      }
      return Math.min(Math.round(base * mult), 120);
    });

    const activeHour = parseInt(document.getElementById('congestion-time-select').value);

    // 포인트 스타일 가속 (현재 활성화된 시간에 큰 점 표시)
    const pointRadii = hours.map(h => h === activeHour ? 7 : 0);
    const pointHoverRadii = hours.map(h => h === activeHour ? 9 : 4);

    // 아크릴모피즘 차트 그라데이션 필터 생성
    const gradient = ctx.createLinearGradient(0, 0, 0, 130);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

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
          tooltip: {
            enabled: true,
            callbacks: {
              label: (ctx) => `혼잡도: ${ctx.raw}%`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af', font: { size: 10 } }
          },
          y: {
            max: 130,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#9ca3af',
              font: { size: 9 },
              stepSize: 30,
              callback: (value) => `${value}%`
            }
          }
        }
      }
    });
  }

  /**
   * 서울시 열린데이터광장 OpenAPI 기반 실시간 도착 정보 연동 (CORS 우회 및 Mock Fallback 적용)
   */
  async renderRealtimeArrivals() {
    const listContainer = document.getElementById('realtime-arrivals-list');
    const updateTimeSpan = document.getElementById('realtime-update-time');
    
    // 로딩 상태 연출
    listContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 15px; font-size: 13px;">
        <i data-lucide="loader" class="spin-hover" style="display:inline-block; margin-right:6px; vertical-align: middle;"></i>
        <span>실시간 열차 위치를 수신 중입니다...</span>
      </div>
    `;
    lucide.createIcons();

    const station = stations[this.currentStationId];
    if (!station) return;

    // API 호출을 위한 역이름 정제 (끝자리 '역' 제외 필수)
    const cleanName = station.name.endsWith('역') ? station.name.slice(0, -1) : station.name;
    const apiKey = '4166664454796f6f3131357261506e4c';
    const targetUrl = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/20/${encodeURIComponent(cleanName)}`;
    
    // 로컬과 Vercel 배포에 맞춰 최적의 프록시 URL 적용
    let finalUrl;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      finalUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    } else {
      finalUrl = `/api/seoul-subway/${apiKey}/json/realtimeStationArrival/0/20/${encodeURIComponent(cleanName)}`;
    }

    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      const now = new Date();
      updateTimeSpan.textContent = `실시간 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} 기준 (공공 API 연동)`;

      listContainer.innerHTML = '';
      
      if (data.realtimeArrivalList && data.realtimeArrivalList.length > 0) {
        // 호선 매핑 딕셔너리 (광역 노선 추가)
        const subwayIdMap = {
          '1001': '1', '1002': '2', '1003': '3', '1004': '4', '1005': '5', '1006': '6',
          '1007': '7', '1008': '8', '1009': '9', '1063': 'K', '1075': 'B', '1077': 'S', '1065': 'A'
        };

        // 현재 선택된 역 경유 노선 정보에 맞는 데이터만 필터링
        const filteredArrivals = data.realtimeArrivalList.filter(item => {
          const mappedLineId = subwayIdMap[item.subwayId];
          return station.lines.includes(mappedLineId);
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
          const arvlMsg = item.arvlMsg2; 
          
          const arrivalDOM = this.createArrivalDOM(lineConfig, trainDir, arvlMsg);
          listContainer.appendChild(arrivalDOM);
        });
      } else {
        this.renderMockArrivals('해당 시간대 운행 정보 부재');
      }
    } catch (error) {
      console.warn('공공 API fetch 오류로 인해 Mock 데이터로 안전 복구(Fallback) 합니다:', error);
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
      '6': { up: '응암순환 방면', down: '신내 방면' }
    };

    station.lines.forEach(lineId => {
      const dirs = mockDirections[lineId] || { up: '상행', down: '하행' };
      const config = lines[lineId];

      const upTime = Math.floor(Math.random() * 8) + 1;
      const upState = upTime === 1 ? '진입 중' : (upTime === 2 ? '전역 출발' : `${upTime}분 후 도착`);
      const upItem = this.createArrivalDOM(config, dirs.up, upState);
      listContainer.appendChild(upItem);

      const downTime = Math.floor(Math.random() * 8) + 1;
      const downState = downTime === 1 ? '진입 중' : (downTime === 2 ? '전역 출발' : `${downTime}분 후 도착`);
      const downItem = this.createArrivalDOM(config, dirs.down, downState);
      listContainer.appendChild(downItem);
    });
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
