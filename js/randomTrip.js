import { randomTripThemes, stations, lines } from './subwayData.js';

/**
 * 랜덤 지하철 여행을 추천하고 모달창을 렌더링하는 클래스
 */
export class RandomTripManager {
  constructor(modalId, contentId, onSelectTripStation) {
    this.modal = document.getElementById(modalId);
    this.contentContainer = document.getElementById(contentId);
    this.onSelectTripStation = onSelectTripStation; // 길찾기 연결 콜백

    this.currentTheme = null;

    this.init();
  }

  init() {
    this.setupEvents();
  }

  setupEvents() {
    // 모달 닫기
    document.getElementById('btn-close-modal').addEventListener('click', () => this.close());
    
    // 오버레이 클릭 시 닫기
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // 다른 곳 가기(Reroll)
    document.getElementById('btn-reroll-trip').addEventListener('click', () => {
      this.recommendRandom();
    });

    // 이 역으로 길찾기 버튼
    document.getElementById('btn-trip-direction').addEventListener('click', () => {
      if (this.currentTheme && this.onSelectTripStation) {
        // 추천 테마의 첫 번째 역을 대상 목적지로 지정
        const targetStationId = this.currentTheme.stations[0];
        this.onSelectTripStation(targetStationId);
        this.close();
      }
    });
  }

  open() {
    this.recommendRandom();
    this.modal.classList.remove('hidden');
    // Lucide 아이콘 로딩
    lucide.createIcons();
  }

  close() {
    this.modal.classList.add('hidden');
    this.currentTheme = null;
  }

  /**
   * 무작위로 하나의 테마를 선택하여 카드 UI 렌더링
   */
  recommendRandom() {
    // 현재 선택되어 있던 것과 다른 테마를 뽑기 위한 루프
    let nextTheme = null;
    do {
      const randomIndex = Math.floor(Math.random() * randomTripThemes.length);
      nextTheme = randomTripThemes[randomIndex];
    } while (randomTripThemes.length > 1 && this.currentTheme && nextTheme.id === this.currentTheme.id);

    this.currentTheme = nextTheme;
    this.renderTheme(nextTheme);
  }

  renderTheme(theme) {
    this.contentContainer.innerHTML = '';

    // 1. 헤더 카드 (아크릴모피즘 그라데이션)
    const headerBox = document.createElement('div');
    headerBox.className = 'trip-recommendation-box';
    headerBox.style.background = theme.bgGradient;
    headerBox.style.backdropFilter = 'blur(10px)';
    
    // 타겟 역 이름들 추출
    const stationNames = theme.stations.map(id => stations[id]?.name || id).join(', ');

    headerBox.innerHTML = `
      <h4>${theme.title}</h4>
      <p style="margin-bottom: 12px; font-weight: 500;">추천 기점: ${stationNames}</p>
      <p>${theme.description}</p>
    `;
    this.contentContainer.appendChild(headerBox);

    // 2. 추천 랜드마크(Spot) 리스트 컨테이너
    const listTitle = document.createElement('h5');
    listTitle.textContent = '반드시 가봐야 할 핵심 스팟';
    listTitle.style.fontSize = '14px';
    listTitle.style.fontWeight = '600';
    listTitle.style.margin = '10px 0 2px';
    this.contentContainer.appendChild(listTitle);

    const spotsList = document.createElement('div');
    spotsList.className = 'trip-spots-list';

    theme.spots.forEach(spot => {
      const spotCard = document.createElement('div');
      spotCard.className = 'trip-spot-item';
      spotCard.innerHTML = `
        <div class="spot-title">
          <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i>
          <span>${spot.name}</span>
        </div>
        <div class="spot-desc">${spot.description}</div>
      `;
      spotsList.appendChild(spotCard);
    });

    this.contentContainer.appendChild(spotsList);
    
    // Lucide 동적 생성
    lucide.createIcons();
  }
}
