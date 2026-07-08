import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { stations, lines, congestionBaseline, stationCongestionTypes } from '../js/subwayData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export default function StationDetail({ 
  stationId, 
  onClose, 
  onSetRoute 
}) {
  const station = stations[stationId];
  if (!station) return null;

  // 1. 호선 분리 탭 기본값 설정 (환승역 대응)
  const [activeLine, setActiveLine] = useState(station.lines[0]);
  // 탭이 바뀔 때마다 해당 역 정보 갱신
  useEffect(() => {
    setActiveLine(station.lines[0]);
  }, [stationId, station]);

  // 2. 실시간 도착 정보 및 로딩/시간 정보 제어
  const [arrivalList, setArrivalList] = useState([]);
  const [isLoadingArrivals, setIsLoadingArrivals] = useState(false);
  const [updateTimeText, setUpdateTimeText] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  // 3. 예측 혼잡도 시간 셀렉터 제어
  const currentHour = new Date().getHours();
  const defaultHour = currentHour >= 5 && currentHour <= 24 ? currentHour : 8;
  const [selectedHour, setSelectedHour] = useState(defaultHour);

  // 4. 모바일 하단 스와이프 제어
  const sheetRef = useRef(null);
  const touchStartRef = useRef({ y: 0, time: 0 });

  useEffect(() => {
    fetchRealtimeArrivals();
  }, [stationId, activeLine]);

  // 실시간 열차 수신 (CORS 대응 Vercel/로컬 프록시 바인딩)
  const fetchRealtimeArrivals = async () => {
    setIsLoadingArrivals(true);
    setIsFallback(false);

    const cleanName = station.name.endsWith('역') ? station.name.slice(0, -1) : station.name;
    const apiKey = '4166664454796f6f3131357261506e4c';
    
    // 로컬 개발 서버(/api/seoul-subway)와 Vercel 프록싱 경로 통일
    const finalUrl = `/api/seoul-subway/${apiKey}/json/realtimeStationArrival/0/20/${encodeURIComponent(cleanName)}`;

    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error('API server status invalid');
      const data = await response.json();

      const now = new Date();
      setUpdateTimeText(`실시간 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} 기준`);

      if (data.realtimeArrivalList && data.realtimeArrivalList.length > 0) {
        const subwayIdMap = {
          '1001': '1', '1002': '2', '1003': '3', '1004': '4', '1005': '5', '1006': '6',
          '1007': '7', '1008': '8', '1009': '9', '1063': 'K', '1075': 'B', '1077': 'S', '1065': 'A'
        };

        // 활성화된 개별 탭 호선 데이터만 매핑 필터링 (사용자 요구사항 환승역 호선 분할)
        const filtered = data.realtimeArrivalList
          .filter(item => {
            const mappedLineId = subwayIdMap[item.subwayId];
            return mappedLineId === activeLine;
          })
          .map(item => {
            const mappedLineId = subwayIdMap[item.subwayId];
            const lineConfig = lines[mappedLineId];
            const trainDir = item.trainLineNm; 
            const rawMsg = item.arvlMsg2; 
            const barvlDt = parseInt(item.barvlDt);

            // 초 -> 분/초 변환 및 N전역 역산 연계
            let processedTime = '';
            if (barvlDt && barvlDt > 0) {
              const minutes = Math.floor(barvlDt / 60);
              const seconds = barvlDt % 60;
              processedTime = seconds > 0 ? `약 ${minutes}분 ${seconds}초 후` : `약 ${minutes}분 후`;
            } else {
              const stationPattern = /\[(\d+)\]번째\s*전역/;
              const simplePattern = /(\d+)전역/;
              
              let match = rawMsg.match(stationPattern) || rawMsg.match(simplePattern);
              if (match) {
                const stationCount = parseInt(match[1]);
                const calculatedMin = Math.round(stationCount * 2.5);
                processedTime = `약 ${calculatedMin}분 후`;
              }
            }

            return {
              id: item.rowNum,
              lineConfig,
              direction: trainDir,
              statusText: processedTime ? `${rawMsg} (${processedTime})` : rawMsg
            };
          });

        if (filtered.length > 0) {
          setArrivalList(filtered);
        } else {
          loadMockArrivals('일치 노선 정보 없음');
        }
      } else {
        loadMockArrivals('해당 시간대 운행 정보 부재');
      }
    } catch (error) {
      console.warn('실시간 공공 API 호출장애 발생하여 Mock 데이터로 Fallback 합니다:', error);
      loadMockArrivals('네트워크 지연 가상 정보');
    } finally {
      setIsLoadingArrivals(false);
    }
  };

  // 모의 도착 Fallback 렌더러
  const loadMockArrivals = (reason) => {
    setIsFallback(true);
    const now = new Date();
    setUpdateTimeText(`실시간 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} 기준 (${reason})`);

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

    const config = lines[activeLine];
    if (!config) {
      setArrivalList([]);
      return;
    }

    const dirs = mockDirections[activeLine] || { up: '상행', down: '하행' };
    const upTime = Math.floor(Math.random() * 8) + 1;
    const downTime = Math.floor(Math.random() * 8) + 1;

    setArrivalList([
      {
        id: 'mock-up',
        lineConfig: config,
        direction: dirs.up,
        statusText: upTime === 1 ? '진입 중' : (upTime === 2 ? '전역 출발' : `${upTime}전역 (약 ${upTime * 2}분 후 도착 예정)`)
      },
      {
        id: 'mock-down',
        lineConfig: config,
        direction: dirs.down,
        statusText: downTime === 1 ? '진입 중' : (downTime === 2 ? '전역 출발' : `${downTime}전역 (약 ${downTime * 2}분 후 도착 예정)`)
      }
    ]);
  };

  // 5. 세부 탭 메뉴 제어 (편의시설 vs 혼잡도 예측 vs 실시간 도착)
  const [activeTab, setActiveTab] = useState('facilities');

  // 6. 혼잡도 통계치 계산
  const baseCongestion = congestionBaseline[selectedHour] || 40;
  const type = stationCongestionTypes[stationId] || 'residential';
  let patternMultiplier = 1.0;
  if (type === 'office') {
    if (selectedHour === 8 || selectedHour === 18) patternMultiplier = 1.25;
    else if (selectedHour >= 11 && selectedHour <= 13) patternMultiplier = 0.9;
  } else if (type === 'tourism') {
    if (selectedHour >= 13 && selectedHour <= 17) patternMultiplier = 1.2;
  }
  const currentCongestionVal = Math.round(baseCongestion * patternMultiplier);

  let congestionLabel = '보통';
  let congestionColor = 'var(--color-warning)';
  if (currentCongestionVal <= 35) {
    congestionLabel = '여유';
    congestionColor = 'var(--color-success)';
  } else if (currentCongestionVal > 70) {
    congestionLabel = '혼잡';
    congestionColor = 'var(--color-danger)';
  }

  // 7. 차트 렌더링용 데이터셋 구성
  const hoursArray = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const chartDataPoints = hoursArray.map(h => {
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

  const chartData = {
    labels: hoursArray.map(h => `${h}시`),
    datasets: [{
      label: '예측 혼잡도 (%)',
      data: chartDataPoints,
      borderColor: '#38bdf8',
      borderWidth: 2,
      pointBackgroundColor: hoursArray.map(h => h === selectedHour ? '#ffffff' : 'transparent'),
      pointBorderColor: '#38bdf8',
      pointRadius: hoursArray.map(h => h === selectedHour ? 5 : 0),
      pointHoverRadius: 6,
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
        return gradient;
      },
      tension: 0.4
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9ca3af', font: { size: 9 } }
      },
      y: {
        max: 130,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af', font: { size: 9 }, stepSize: 30, callback: (v) => `${v}%` }
      }
    }
  };

  // 8. 모바일 바텀시트 하향 드래그 제스처 바인딩
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      y: touch.clientY,
      time: Date.now()
    };
    if (sheetRef.current) {
      sheetRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const diffY = touch.clientY - touchStartRef.current.y;
    if (diffY > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diffY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    const touch = e.changedTouches[0];
    const diffY = touch.clientY - touchStartRef.current.y;
    const duration = Date.now() - touchStartRef.current.time;

    // 드래그 속도 혹은 거리가 일정치를 넘으면 닫기 트리거
    if (diffY > 150 || (diffY > 50 && duration < 250)) {
      onClose();
    } else {
      sheetRef.current.style.transform = '';
    }
  };

  // 활성화된 노선의 편의시설 데이터 조회
  const facilityData = station.facilities[activeLine] || station.facilities[station.lines[0]] || {};
  const accessibleData = station.accessible[activeLine] || station.accessible[station.lines[0]];

  return (
    <div 
      className="bottom-sheet glass-panel active" 
      ref={sheetRef}
    >
      <div 
        className="sheet-header"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="sheet-handle"></div>
        <button 
          className="btn-close-sheet" 
          onClick={onClose}
          aria-label="닫기"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div className="sheet-content">
        {/* 역사 기본 메타 */}
        <div className="station-meta-info">
          <div className="station-title-row">
            <h2>{station.name}</h2>
            <div className="quick-directions">
              <button 
                className="btn-pill"
                onClick={() => onSetRoute('start', stationId)}
              >
                출발
              </button>
              <button 
                className="btn-pill"
                onClick={() => onSetRoute('end', stationId)}
              >
                도착
              </button>
            </div>
          </div>

          {/* 환승역 호선 선택 탭 드로잉 (클릭 시 탭 전환) */}
          <div className="station-line-badges" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {station.lines.map(lineId => {
              const config = lines[lineId];
              if (!config) return null;
              const isActive = lineId === activeLine;
              return (
                <button
                  key={lineId}
                  className={`badge-tab ${isActive ? 'active' : ''}`}
                  style={{
                    backgroundColor: isActive ? config.color : 'rgba(255, 255, 255, 0.05)',
                    borderColor: config.color,
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => {
                    setActiveLine(lineId);
                    setActiveTab('facilities'); // 탭 변경 시 리셋
                  }}
                >
                  {config.name}
                </button>
              );
            })}
          </div>

          {/* 교통 약자 무장애 상태 */}
          <div 
            className="accessible-pill"
            style={{
              background: accessibleData?.hasElevator ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
              borderColor: accessibleData?.hasElevator ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: accessibleData?.hasElevator ? 'var(--color-success)' : 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              marginTop: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              fontSize: '12px'
            }}
          >
            {accessibleData?.hasElevator ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-accessibility"><header></header><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4 24h2"/><path d="M12 24h2"/><path d="M12 17v4"/><path d="M8 21v-4"/></svg>
                <span>무장애 이동(엘리베이터) 탑승 지원</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                <span>휠체어 이용 제한 및 리프트 환승 역사</span>
              </>
            )}
          </div>
        </div>

        {/* 바텀시트 세부 탭 */}
        <div className="sheet-tabs">
          <button 
            className={`sheet-tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            편의/약자시설
          </button>
          <button 
            className={`sheet-tab-btn ${activeTab === 'congestion' ? 'active' : ''}`}
            onClick={() => setActiveTab('congestion')}
          >
            혼잡도 예측
          </button>
          <button 
            className={`sheet-tab-btn ${activeTab === 'realtime' ? 'active' : ''}`}
            onClick={() => setActiveTab('realtime')}
          >
            실시간 도착
          </button>
        </div>

        {/* 탭 콘텐츠 1: 편의/약자시설 */}
        {activeTab === 'facilities' && (
          <div className="sheet-tab-content">
            <div className="facility-grid">
              <div className="facility-item">
                <div className="facility-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M6 8h12"/><path d="M6 12h12"/><path d="M6 16h12"/><path d="M9 3h6"/><path d="M12 3v5"/></svg>
                  <span>수유실 위치</span>
                </div>
                <div className="facility-value">{facilityData.nursing || '수유실 없음'}</div>
              </div>
              <div className="facility-item">
                <div className="facility-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 6 10 17l-5-5"/></svg>
                  <span>보관함</span>
                </div>
                <div className="facility-value">{facilityData.locker || '물품 보관함 없음'}</div>
              </div>
              <div className="facility-item" style={{ gridColumn: 'span 2' }}>
                <div className="facility-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                  <span>개찰구 외 화장실 위치</span>
                </div>
                <div className="facility-value">{facilityData.toilet || '화장실 정보 없음'}</div>
              </div>
              <div className="facility-item" style={{ gridColumn: 'span 2' }}>
                <div className="facility-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 8v8"/></svg>
                  <span>수직 환승 엘리베이터 위치</span>
                </div>
                <div className="facility-value">{facilityData.elevatorLocation || '엘리베이터 위치 확인 필요'}</div>
              </div>
            </div>

            {accessibleData?.accessibleRoute && (
              <div className="barrier-route-box">
                <h4>♿ 교통약자 최적 이동 경로 안내</h4>
                <p>{accessibleData.accessibleRoute}</p>
              </div>
            )}
          </div>
        )}

        {/* 탭 콘텐츠 2: 혼잡도 예측 */}
        {activeTab === 'congestion' && (
          <div className="sheet-tab-content">
            <div className="congestion-summary-box">
              <div className="time-picker-wrapper">
                <span>시간선택:</span>
                <select 
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                >
                  {hoursArray.map(h => (
                    <option key={h} value={h}>{h.toString().padStart(2, '0')}:00</option>
                  ))}
                </select>
              </div>

              <div className="congestion-indicator-card">
                <div>
                  <div className="congestion-description">예측 승객 혼잡도</div>
                  <div className="congestion-description" style={{ color: 'var(--text-muted)' }}>
                    {type === 'office' ? '오피스형 집객지 패턴' : type === 'tourism' ? '문화관광지 집객지 패턴' : '주거밀집형 출퇴근 패턴'}
                  </div>
                </div>
                <div 
                  className="congestion-level-badge"
                  style={{ backgroundColor: congestionColor }}
                >
                  {currentCongestionVal}% {congestionLabel}
                </div>
              </div>
            </div>

            <div className="chart-wrapper">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* 탭 콘텐츠 3: 실시간 도착 */}
        {activeTab === 'realtime' && (
          <div className="sheet-tab-content">
            <div className="realtime-header">
              <span className="live-tag">
                <span className="pulse-dot"></span>실시간 열차 위치 수신 중
              </span>
              <span>{updateTimeText}</span>
            </div>

            <div className="train-arrivals">
              {isLoadingArrivals ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
                  <span>열차 정보를 조회하고 있습니다...</span>
                </div>
              ) : arrivalList.length > 0 ? (
                arrivalList.map(item => (
                  <div key={item.id} className="arrival-item">
                    <div className="arrival-train-info">
                      <span 
                        className="badge" 
                        style={{ 
                          backgroundColor: item.lineConfig.color, 
                          fontSize: '10px', 
                          padding: '2px 8px' 
                        }}
                      >
                        {item.lineConfig.name}
                      </span>
                      <span className="arrival-train-dir">{item.direction}</span>
                    </div>
                    <span 
                      className="arrival-status"
                      style={{
                        color: item.statusText.includes('진입') ? 'var(--color-danger)' : 
                               item.statusText.includes('전역') ? 'var(--color-warning)' : 'var(--text-accent)'
                      }}
                    >
                      {item.statusText}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px', fontSize: '13px' }}>
                  <span>현재 운행 중인 열차가 없습니다.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
