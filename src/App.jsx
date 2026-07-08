import React, { useState, useEffect, useMemo } from 'react';
import SubwayMap from './components/SubwayMap';
import StationDetail from './components/StationDetail';
import { stations, randomTripThemes } from './js/subwayData';
import { SubwayPathFinder } from './js/pathFinder';

export default function App() {
  // 다익스트라 엔진 초기화
  const pathFinder = useMemo(() => new SubwayPathFinder(), []);

  // --- 전역 상태 선언 ---
  const [startQuery, setStartQuery] = useState('');
  const [endQuery, setEndQuery] = useState('');
  const [startStation, setStartStation] = useState(null); // { id, name }
  const [endStation, setEndStation] = useState(null);
  const [searchMode, setSearchMode] = useState('time'); // 'time' (최적) | 'transfer' (최소환승)
  const [barrierFreeTheme, setBarrierFreeTheme] = useState(false); // 교통약자 모드 활성 여부
  
  // 자동완성 제안 리스트 제어 (최대 8개 노출)
  const [activeInput, setActiveInput] = useState(null); // 'start' | 'end' | null
  const [selectedStationId, setSelectedStationId] = useState(null); // 지도시각 하이라이트 타겟
  const [activePathResult, setActivePathResult] = useState(null); // 다익스트라 탐색 결과 경로 데이터

  // 랜덤 여행 모달 제어
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // 모바일 사이드바 접기/열기 상태
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // --- 자동완성 제안 리스트 산출 (최대 8개) ---
  const suggestions = useMemo(() => {
    const query = activeInput === 'start' ? startQuery : endQuery;
    if (!query || query.trim() === '') return [];
    
    const cleanQuery = query.trim().toLowerCase();
    return Object.values(stations)
      .filter(st => st.name.toLowerCase().includes(cleanQuery) || st.id.toLowerCase().includes(cleanQuery))
      .slice(0, 8); // 최대 8개 제한
  }, [activeInput, startQuery, endQuery]);

  // --- 길찾기 엔진 실행 연동 ---
  const handleFindPath = () => {
    if (!startStation || !endStation) return;
    
    const result = pathFinder.findPath(startStation.id, endStation.id, {
      mode: searchMode,
      isAccessibleOnly: barrierFreeTheme
    });

    if (result) {
      setActivePathResult(result);
      // 모바일 환경일 시 길찾기 수행 후 화면이 잘 보이도록 사이드바를 접음
      setIsSidebarExpanded(false);
    } else {
      alert('선택하신 조건(교통약자 필터 등)으로 도달할 수 있는 경로가 존재하지 않습니다.');
      setActivePathResult(null);
    }
  };

  // 탐색 조건 또는 역 선택이 바뀔 때 자동 재검색 트리거
  useEffect(() => {
    if (startStation && endStation) {
      handleFindPath();
    } else {
      setActivePathResult(null);
    }
  }, [startStation, endStation, searchMode, barrierFreeTheme]);

  // 출발-도착 스왑 버튼
  const handleSwapStations = () => {
    const tempStation = startStation;
    const tempQuery = startQuery;

    setStartStation(endStation);
    setStartQuery(endQuery);
    
    setEndStation(tempStation);
    setEndQuery(tempQuery);
  };

  // 역 선택 처리 (검색 제안 클릭 등)
  const handleSelectSuggestion = (station, type) => {
    if (type === 'start') {
      setStartStation(station);
      setStartQuery(station.name);
    } else {
      setEndStation(station);
      setEndQuery(station.name);
    }
    setActiveInput(null);
    setSelectedStationId(station.id);
  };

  // 맵 클릭 콜백 연동
  const handleStationClickFromMap = (stationId) => {
    setSelectedStationId(stationId);
    // 모바일/PC 레이아웃 조율에 따라 상세창이 활성화됨
  };

  // 퀵 길찾기 셋업 콜백
  const handleSetRouteFromDetail = (type, stationId) => {
    const station = stations[stationId];
    if (!station) return;

    if (type === 'start') {
      setStartStation({ id: stationId, name: station.name });
      setStartQuery(station.name);
    } else {
      setEndStation({ id: stationId, name: station.name });
      setEndQuery(station.name);
    }
    setSelectedStationId(stationId);
  };

  // 추천지 투어 테마 선택 후 적용
  const handleApplyTheme = (theme) => {
    if (theme.stations.length === 1) {
      // 단일지일 시 도착지로 임포트하고 하이라이트
      const destId = theme.stations[0];
      const destStation = stations[destId];
      if (destStation) {
        setEndStation({ id: destId, name: destStation.name });
        setEndQuery(destStation.name);
        setSelectedStationId(destId);
      }
    } else if (theme.stations.length >= 2) {
      // 다중 거점일 시 각각 출발/도착지 자동 매핑
      const sId = theme.stations[0];
      const eId = theme.stations[1];
      if (stations[sId] && stations[eId]) {
        setStartStation({ id: sId, name: stations[sId].name });
        setStartQuery(stations[sId].name);
        setEndStation({ id: eId, name: stations[eId].name });
        setEndQuery(stations[eId].name);
        setSelectedStationId(eId);
      }
    }
    setShowThemeModal(false);
  };

  return (
    <div id="app" className={barrierFreeTheme ? 'barrier-free-theme' : ''}>
      {/* 백그라운드 오로라 글로우 */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* 헤더 */}
      <header className="main-header glass-panel">
        <div className="header-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map neon-icon"><path d="M14.106 5.553a2 2 0 0 0-1.788 0l-3.66 1.83a2 2 0 0 1-1.787 0L3 5.554V18.44a2 2 0 0 0 2.21 1.99l3.684-.369a2 2 0 0 1 1.788 0l3.66 1.83a2 2 0 0 0 1.787 0l4.66-2.33a2 2 0 0 0 1.211-1.79V5.555ZM15 6v12"/><path d="M9 6v12"/></svg>
          <h1>Round<span>Map</span></h1>
        </div>
        <div className="header-actions">
          {/* 배리어프리 모드 토글 */}
          <button 
            className={`btn-toggle ${barrierFreeTheme ? 'active' : ''}`}
            onClick={() => setBarrierFreeTheme(!barrierFreeTheme)}
            title="휠체어 우회 및 무장애 이동경로 필터 활성화"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-accessibility"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4 24h2"/><path d="M12 24h2"/><path d="M12 17v4"/><path d="M8 21v-4"/></svg>
            <span>교통 약자 모드</span>
          </button>
          
          {/* 지하철 랜덤 여행 추천 버튼 */}
          <button 
            className="btn-action"
            onClick={() => {
              const randomTheme = randomTripThemes[Math.floor(Math.random() * randomTripThemes.length)];
              setSelectedTheme(randomTheme);
              setShowThemeModal(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.414 4.242-4.242 1.414 1.414-4.242 4.242-1.414Z"/><path d="M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"/></svg>
            <span>랜덤 여행 추천</span>
          </button>
        </div>
      </header>

      {/* 좌측 검색 및 길찾기 결과 사이드바 */}
      <aside 
        className={`search-panel glass-panel ${isSidebarExpanded ? 'expanded' : ''}`}
      >
        <div 
          className="panel-handle"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
        ></div>

        <div className="panel-tabs">
          <div className="tab-btn active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            <span>경로 및 길찾기</span>
          </div>
        </div>

        <div className="tab-content">
          {/* 검색 입력 폼 */}
          <div className="search-inputs">
            {/* 출발역 */}
            <div className="input-wrapper">
              <div className="dot-indicator start"></div>
              <input 
                type="text" 
                placeholder="출발역 이름 입력..."
                value={startQuery}
                onChange={(e) => {
                  setStartQuery(e.target.value);
                  setStartStation(null); // 수정 중엔 매핑 해제
                  setActiveInput('start');
                }}
                onFocus={() => setActiveInput('start')}
              />
              {startQuery && (
                <button 
                  className="btn-clear" 
                  onClick={() => { setStartQuery(''); setStartStation(null); }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* 도착역 */}
            <div className="input-wrapper">
              <div className="dot-indicator end"></div>
              <input 
                type="text" 
                placeholder="도착역 이름 입력..."
                value={endQuery}
                onChange={(e) => {
                  setEndQuery(e.target.value);
                  setEndStation(null);
                  setActiveInput('end');
                }}
                onFocus={() => setActiveInput('end')}
              />
              {endQuery && (
                <button 
                  className="btn-clear" 
                  onClick={() => { setEndQuery(''); setEndStation(null); }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* 스왑 버튼 */}
            <button 
              className="btn-swap" 
              onClick={handleSwapStations}
              title="출발역/도착역 위치 교체"
            >
              ⇅
            </button>

            {/* 자동완성 제안 팝오버 */}
            {activeInput && suggestions.length > 0 && (
              <div className="search-suggestions active">
                {suggestions.map(st => (
                  <div 
                    key={st.id} 
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion(st, activeInput)}
                  >
                    <span className="suggestion-name">{st.name}</span>
                    <div className="suggestion-lines">
                      {st.lines.map(lineId => (
                        <span 
                          key={lineId} 
                          className="line-tag-mini"
                          style={{ backgroundColor: stations[st.id].lines.length > 0 ? (lineId === 'GTX-A' ? '#06928C' : '#3b82f6') : '#9ca3af' }}
                        >
                          {lineId}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 탐색 모드 셀렉터 (최적 vs 최소환승) */}
          <div className="search-mode-selector">
            <button 
              className={`mode-btn ${searchMode === 'time' ? 'active' : ''}`}
              onClick={() => setSearchMode('time')}
            >
              최적 경로
            </button>
            <button 
              className={`mode-btn ${searchMode === 'transfer' ? 'active' : ''}`}
              onClick={() => setSearchMode('transfer')}
            >
              최소 환승
            </button>
          </div>

          {/* 길찾기 결과 영역 */}
          <div className="search-result-container">
            {activePathResult ? (
              <div className="path-result-card">
                {/* 헤더 요약 */}
                <div className="result-header-summary">
                  <div className="result-time-box">
                    <div className="result-time-val">
                      {activePathResult.totalTime}<span>분</span>
                    </div>
                  </div>
                  <div className="result-meta-box">
                    <div>환승 횟수: {activePathResult.transferCount}회</div>
                    <div>경유 역사: {activePathResult.path.filter(p => !p.transferStep).length}개역</div>
                  </div>
                </div>

                {/* 교통약자 모드 하에서 이슈 경고 발생 시 */}
                {activePathResult.accessibilityIssues.length > 0 && (
                  <div className="barrier-alert-banner">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    <div>
                      <strong>교통약자 이동 주의구간 안내:</strong>
                      <ul style={{ paddingLeft: '14px', marginTop: '4px', fontSize: '11px' }}>
                        {activePathResult.accessibilityIssues.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 상세 타임라인 목록 */}
                <div className="path-timeline">
                  {(() => {
                    const steps = [];
                    let lastLine = null;

                    for (let i = 0; i < activePathResult.path.length; i++) {
                      const step = activePathResult.path[i];
                      const isTransfer = i > 0 && activePathResult.path[i - 1].stationId === step.stationId;

                      if (isTransfer) {
                        steps.push(
                          <div key={`transfer-${i}`} className="timeline-step transfer-step">
                            <div className="step-node"></div>
                            <div className="step-info">
                              <div className="step-transfer-desc">
                                ↺ {activePathResult.path[i - 1].line}호선에서 {step.line}호선으로 환승
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        steps.push(
                          <div key={`station-${i}`} className="timeline-step">
                            <div className="step-node"></div>
                            <div className="step-info">
                              <div className="step-station-row">
                                <span className="step-station-name">{step.stationName}</span>
                                <span 
                                  className="line-badge-micro"
                                  style={{ backgroundColor: step.line === 'GTX-A' ? '#06928C' : '#3b82f6', color: '#fff' }}
                                >
                                  {step.line}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                    return steps;
                  })()}
                </div>
              </div>
            ) : (
              <div className="result-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <p>출발역과 도착역을 입력하시면<br/>실시간 데이터가 반영된 최적 경로를 알려드립니다.</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 실제 다크 지형 지도 렌더러 컴포넌트 */}
      <SubwayMap 
        onStationSelect={handleStationClickFromMap}
        selectedStationId={selectedStationId}
        activePath={activePathResult?.path}
        barrierFreeTheme={barrierFreeTheme}
      />

      {/* 우측 팝업 / 모바일 바텀시트 상세 정보 카드 */}
      {selectedStationId && (
        <StationDetail 
          stationId={selectedStationId}
          onClose={() => setSelectedStationId(null)}
          onSetRoute={handleSetRouteFromDetail}
        />
      )}

      {/* 랜덤 지하철 여행 테마 팝업 모달 */}
      {showThemeModal && selectedTheme && (
        <div className="modal-overlay">
          <div className="modal-card glass-panel">
            <div className="modal-header">
              <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.414 4.242-4.242 1.414 1.414-4.242 4.242-1.414Z"/><path d="M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Z"/></svg>
                추천 지하철 여행
              </h3>
              <button 
                className="btn-close-modal" 
                onClick={() => setShowThemeModal(false)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-content">
              <div 
                className="trip-recommendation-box"
                style={{ background: selectedTheme.bgGradient }}
              >
                <h4>{selectedTheme.title}</h4>
                <p>{selectedTheme.description}</p>
              </div>

              <div className="trip-spots-list">
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>대표 명소 리스트</div>
                {selectedTheme.spots.map((spot, idx) => (
                  <div key={idx} className="trip-spot-item">
                    <div className="spot-title">⛳ {spot.name}</div>
                    <div className="spot-desc">{spot.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-pill"
                onClick={() => setShowThemeModal(false)}
              >
                취소
              </button>
              <button 
                className="btn-pill active"
                onClick={() => handleApplyTheme(selectedTheme)}
              >
                경로 적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
