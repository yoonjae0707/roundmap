/**
 * 서울 지하철 아크릴모피즘 지도 애플리케이션 Mock 데이터셋
 */

// 노선 정보 (색상 및 노선명)
export const lines = {
  '1': { name: '1호선', color: '#0052A4', textColor: '#FFFFFF' },
  '2': { name: '2호선', color: '#00A84D', textColor: '#FFFFFF' },
  '3': { name: '3호선', color: '#EF7C1C', textColor: '#FFFFFF' },
  '4': { name: '4호선', color: '#00A2D1', textColor: '#FFFFFF' },
  '5': { name: '5호선', color: '#996CAC', textColor: '#FFFFFF' },
  '6': { name: '6호선', color: '#CD7C2F', textColor: '#FFFFFF' }
};

// 역 정보 목록
// SVG 좌표(x, y)는 노선도 렌더링에 사용됩니다.
export const stations = {
  'seoul': {
    id: 'seoul',
    name: '서울역',
    lines: ['1', '4'],
    x: 150,
    y: 350,
    facilities: {
      toilet: '개찰구 외부 B2층 (1번 출구 방향)',
      nursing: 'B1층 고객안내센터 옆',
      locker: '1번 출구 앞 및 4번 출구 앞 지하 통로',
      elevatorLocation: '1번 출구 앞 외부 엘리베이터 및 1-4호선 환승 통로 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: true,
      accessibleRoute: '1번 출구 외부 엘리베이터 탑승 -> 지하 1층 대합실 -> 1, 4호선 승강장 전용 엘리베이터 이용 가능'
    }
  },
  'city-hall': {
    id: 'city-hall',
    name: '시청역',
    lines: ['1', '2'],
    x: 200,
    y: 230,
    facilities: {
      toilet: '개찰구 내부 1호선 승강장 지하 1층',
      nursing: '지하 1층 대합실 수유실',
      locker: '2번 출구 및 5번 출구 대합실',
      elevatorLocation: '2번 및 12번 출구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '12번 출구 외부 엘리베이터 이용 -> 지하 1층 대합실 진입 -> 게이트 통과 후 1/2호선 엘리베이터 연동'
    }
  },
  'gwanghwamun': {
    id: 'gwanghwamun',
    name: '광화문역',
    lines: ['5'],
    x: 200,
    y: 120,
    facilities: {
      toilet: '개찰구 외부 지하 1층 세종문화회관 방향',
      nursing: '지하 1층 고객행복센터 내부',
      locker: '3, 4번 출구 방향 지하 1층',
      elevatorLocation: '7번 출구 및 8번 출구 인근 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '8번 출구 엘리베이터로 대합실 이동 -> 개찰구(교통약자 전용 게이트) 통과 -> 5호선 승강장 엘리베이터 탑승'
    }
  },
  'gyeongbokgung': {
    id: 'gyeongbokgung',
    name: '경복궁역',
    lines: ['3'],
    x: 130,
    y: 80,
    facilities: {
      toilet: '개찰구 외부 지하 1층 미술관 방향',
      nursing: '없음',
      locker: '5번 출구 지하 통로',
      elevatorLocation: '4번 출구 방향 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: true,
      accessibleRoute: '4번 출구 엘리베이터 이용 -> 대합실 -> 3호선 대화/오금 방향 승강장 엘리베이터 탑승'
    }
  },
  'anguk': {
    id: 'anguk',
    name: '안국역',
    lines: ['3'],
    x: 270,
    y: 80,
    facilities: {
      toilet: '개찰구 내부 지하 1층',
      nursing: '없음',
      locker: '1번, 4번 출구 앞 대합실',
      elevatorLocation: '5번 출구 인근 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '5번 출구 엘리베이터 탑승 -> 지하 1층 대합실 -> 엘리베이터로 지하 2층 승강장 이동'
    }
  },
  'jongno3': {
    id: 'jongno3',
    name: '종로3가역',
    lines: ['1', '3', '5'],
    x: 350,
    y: 170,
    facilities: {
      toilet: '개찰구 내부 1호선 승강장 구역 및 5호선 대합실',
      nursing: '3호선 대합실 고객안내센터 옆',
      locker: '1번, 2번, 8번 출구 대합실',
      elevatorLocation: '15번 출구 인근 외부 엘리베이터, 3호선 승강장 연계 엘리베이터'
    },
    accessible: {
      hasElevator: false,
      hasWheelchairLift: true,
      accessibleRoute: '15번 출구 앞 엘리베이터 -> 1호선 대합실 -> 3호선 연계구간 휠체어 리프트 이용 필요(직원 호출 필수)'
    }
  },
  'euljiro-입구': {
    id: 'euljiro-입구',
    name: '을지로입구역',
    lines: ['2'],
    x: 290,
    y: 260,
    facilities: {
      toilet: '개찰구 외부 지하 1층 1-2번 출구 사이',
      nursing: '없음',
      locker: '3, 4번 출구 사이 지하 통로',
      elevatorLocation: '8번 출구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '8번 출구 롯데백화점 옆 엘리베이터 탑승 -> 지하 1층 대합실 -> 2호선 승강장 엘리베이터 연동'
    }
  },
  'euljiro3': {
    id: 'euljiro3',
    name: '을지로3가역',
    lines: ['2', '3'],
    x: 410,
    y: 260,
    facilities: {
      toilet: '개찰구 외부 지하 1층 대합실 중앙',
      nursing: '없음',
      locker: '1번 및 9번 출구 인근',
      elevatorLocation: '2번 출구 및 12번 출구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '12번 출구 엘리베이터 탑승 -> 지하 1층 대합실 -> 2호선 및 3호선 환승 구역 전용 엘리베이터 이용'
    }
  },
  'euljiro4': {
    id: 'euljiro4',
    name: '을지로4가역',
    lines: ['2', '5'],
    x: 520,
    y: 260,
    facilities: {
      toilet: '개찰구 내부 지하 1층 대합실',
      nursing: '5호선 고객센터 옆',
      locker: '4번, 8번 출구 대합실',
      elevatorLocation: '5번 출구 및 9번 출구 인근 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '5번 출구 엘리베이터 -> 지하 1층 대합실 -> 2/5호선 승강장 전용 엘리베이터 이용'
    }
  },
  'dongdaemun': {
    id: 'dongdaemun',
    name: '동대문역',
    lines: ['1', '4'],
    x: 520,
    y: 120,
    facilities: {
      toilet: '개찰구 외부 지하 1층 4호선 구역',
      nursing: '4호선 고객안내센터 옆',
      locker: '5번 출구 및 9번 출구 대합실',
      elevatorLocation: '6번 및 10번 출구 인근 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: true,
      accessibleRoute: '6번 출구 엘리베이터 탑승 -> 1, 4호선 대합실 연계 -> 승강장 엘리베이터 이용'
    }
  },
  'ddp': {
    id: 'ddp',
    name: '동대문역사문화공원역',
    lines: ['2', '4', '5'],
    x: 620,
    y: 220,
    facilities: {
      toilet: '개찰구 내부 2/4호선 환승 통로 및 5호선 대합실',
      nursing: '5호선 고객안내센터 내부',
      locker: '1번, 2번 출구 DDP 연결 통로',
      elevatorLocation: '1번 출구 DDP 광장 외부 엘리베이터, 14번 출구 앞 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '14번 출구 앞 엘리베이터 -> 지하 1층 대합실 -> 2, 4호선 환승 엘리베이터 탑승 -> 5호선 연결 대합실 이동'
    }
  },
  'chungmuro': {
    id: 'chungmuro',
    name: '충무로역',
    lines: ['3', '4'],
    x: 410,
    y: 350,
    facilities: {
      toilet: '개찰구 내부 3/4호선 승강장 연결층',
      nursing: '지하 1층 대합실 내부',
      locker: '2번 출구 및 8번 출구 대합실',
      elevatorLocation: '1번 및 8번 출구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '1번 출구 엘리베이터 -> 지하 1층 대합실 -> 3호선 및 4호선 승강장 직통 엘리베이터 탑승'
    }
  },
  'myeongdong': {
    id: 'myeongdong',
    name: '명동역',
    lines: ['4'],
    x: 310,
    y: 350,
    facilities: {
      toilet: '개찰구 내부 지하 1층 2, 3번 출구 방향',
      nursing: '없음',
      locker: '1번 및 10번 출구 지하 통로',
      elevatorLocation: '1번 출구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '1번 출구 외부 엘리베이터 -> 대합실 -> 승강장 엘리베이터 직접 탑승'
    }
  },
  'hoehyun': {
    id: 'hoehyun',
    name: '회현역',
    lines: ['4'],
    x: 230,
    y: 350,
    facilities: {
      toilet: '개찰구 내부 지하 1층 남대문시장 방면',
      nursing: '없음',
      locker: '5번 출구 및 7번 출구',
      elevatorLocation: '5번 출구 남대문시장 입구 앞 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '5번 출구 엘리베이터 탑승 -> 지하 1층 대합실 -> 개찰구 통과 후 승강장 엘리베이터 연동'
    }
  },
  'sindang': {
    id: 'sindang',
    name: '신당역',
    lines: ['2', '6'],
    x: 730,
    y: 260,
    facilities: {
      toilet: '개찰구 외부 2호선 대합실 및 6호선 환승 통로',
      nursing: '2호선 고객안내실 옆',
      locker: '10번 출구 및 11번 출구 대합실',
      elevatorLocation: '4번 출구 및 6번 출구 방향 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '6번 출구 엘리베이터 -> 6호선 지하 대합실 -> 2호선 환승 통로 무장애(경사로 및 엘리베이터) 이동'
    }
  },
  'yaksu': {
    id: 'yaksu',
    name: '약수역',
    lines: ['3', '6'],
    x: 520,
    y: 430,
    facilities: {
      toilet: '개찰구 외부 지하 1층 대합실',
      nursing: '없음',
      locker: '5번, 7번 출구 방향 지하 1층',
      elevatorLocation: '8번 출구 및 3번 출구 방향 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '8번 출구 엘리베이터 -> 지하 1층 대합실 -> 3호선 및 6호선 연계 엘리베이터 완비'
    }
  },
  'cheonggu': {
    id: 'cheonggu',
    name: '청구역',
    lines: ['5', '6'],
    x: 640,
    y: 400,
    facilities: {
      toilet: '개찰구 외부 5호선 대합실',
      nursing: '5호선 수유실',
      locker: '1번, 3번 출구 대합실',
      elevatorLocation: '3번 출구 방향 외부 엘리베이터'
    },
    accessible: {
      hasElevator: true,
      hasWheelchairLift: false,
      accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 5, 6호선 엘리베이터를 통한 휠체어 이동 지원'
    }
  }
};

// 지하철 네트워크 링크 (그래프 연결선)
// source, target, line, weight(시간, 분 단위), accessible(교통약자가 직접 이동할 수 있는 경로 여부)
export const links = [
  // 1호선
  { source: 'seoul', target: 'city-hall', line: '1', weight: 2, accessible: true },
  { source: 'city-hall', target: 'jongno3', line: '1', weight: 4, accessible: true },
  { source: 'jongno3', target: 'dongdaemun', line: '1', weight: 3, accessible: false },

  // 2호선
  { source: 'city-hall', target: 'euljiro-입구', line: '2', weight: 2, accessible: true },
  { source: 'euljiro-입구', target: 'euljiro3', line: '2', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'euljiro4', line: '2', weight: 2, accessible: true },
  { source: 'euljiro4', target: 'ddp', line: '2', weight: 2, accessible: true },
  { source: 'ddp', target: 'sindang', line: '2', weight: 3, accessible: true },

  // 3호선
  { source: 'gyeongbokgung', target: 'anguk', line: '3', weight: 3, accessible: true },
  { source: 'anguk', target: 'jongno3', line: '3', weight: 2, accessible: true },
  { source: 'jongno3', target: 'euljiro3', line: '3', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'chungmuro', line: '3', weight: 2, accessible: true },
  { source: 'chungmuro', target: 'yaksu', line: '3', weight: 4, accessible: true },

  // 4호선
  { source: 'dongdaemun', target: 'ddp', line: '4', weight: 2, accessible: true },
  { source: 'ddp', target: 'chungmuro', line: '4', weight: 3, accessible: true },
  { source: 'chungmuro', target: 'myeongdong', line: '4', weight: 2, accessible: true },
  { source: 'myeongdong', target: 'hoehyun', line: '4', weight: 2, accessible: true },
  { source: 'hoehyun', target: 'seoul', line: '4', weight: 2, accessible: true },

  // 5호선
  { source: 'gwanghwamun', target: 'jongno3', line: '5', weight: 2, accessible: false },
  { source: 'jongno3', target: 'euljiro4', line: '5', weight: 2, accessible: false },
  { source: 'euljiro4', target: 'ddp', line: '5', weight: 2, accessible: true },
  { source: 'ddp', target: 'cheonggu', line: '5', weight: 3, accessible: true },

  // 6호선
  { source: 'yaksu', target: 'cheonggu', line: '6', weight: 2, accessible: true },
  { source: 'cheonggu', target: 'sindang', line: '6', weight: 2, accessible: true }
];

// 환승역 도보 가중치 (역내 환승 시간, 분 단위)
// 동일 역 내 환승 시 노선 조합에 따른 소요 시간 및 교통약자 이동 가능 여부
export const transfers = {
  'seoul': { '1-4': 4, '4-1': 4, accessible: true },
  'city-hall': { '1-2': 3, '2-1': 3, accessible: true },
  'jongno3': {
    '1-3': 5, '3-1': 5,
    '1-5': 8, '5-1': 8,
    '3-5': 6, '5-3': 6,
    accessible: false
  },
  'euljiro3': { '2-3': 3, '3-2': 3, accessible: true },
  'euljiro4': { '2-5': 4, '5-2': 4, accessible: true },
  'dongdaemun': { '1-4': 5, '4-1': 5, accessible: true },
  'ddp': {
    '2-4': 3, '4-2': 3,
    '2-5': 5, '5-2': 5,
    '4-5': 4, '5-4': 4,
    accessible: true
  },
  'chungmuro': { '3-4': 2, '4-3': 2, accessible: true },
  'sindang': { '2-6': 6, '6-2': 6, accessible: true },
  'yaksu': { '3-6': 3, '6-3': 3, accessible: true },
  'cheonggu': { '5-6': 3, '6-5': 3, accessible: true }
};

// 시간대별 혼잡도 통계 예측 비율 (%)
// baseline에 각 역별 특정 계수(출퇴근용 역, 관광용 역)를 곱해서 최종 혼잡도를 계산합니다.
export const congestionBaseline = {
  5: 15,  6: 35,  7: 65,  8: 92,  9: 60,  10: 40,
  11: 38, 12: 45, 13: 48, 14: 43, 15: 50, 16: 58,
  17: 78, 18: 95, 19: 80, 20: 55, 21: 48, 22: 42,
  23: 30, 24: 15
};

// 역별 혼잡도 가중치 타입
// 'office'(출퇴근시 극대화), 'tourism'(낮~저녁 완만한 분포), 'residential'(평범)
export const stationCongestionTypes = {
  'seoul': 'office',
  'city-hall': 'office',
  'gwanghwamun': 'office',
  'gyeongbokgung': 'tourism',
  'anguk': 'tourism',
  'jongno3': 'tourism',
  'euljiro-입구': 'office',
  'euljiro3': 'office',
  'euljiro4': 'office',
  'dongdaemun': 'tourism',
  'ddp': 'tourism',
  'chungmuro': 'office',
  'myeongdong': 'tourism',
  'hoehyun': 'tourism',
  'sindang': 'residential',
  'yaksu': 'residential',
  'cheonggu': 'residential'
};

// 랜덤 여행 추천 테마 목록
export const randomTripThemes = [
  {
    id: 'theme-history',
    title: '경복궁 & 안국 고궁/역사 산책',
    description: '서울의 찬란한 역사와 한옥의 고즈넉한 멋을 함께 느껴보세요.',
    stations: ['gyeongbokgung', 'anguk'],
    spots: [
      { name: '경복궁', description: '조선 시대의 으뜸 궁궐이자 서울 최고의 역사 명소 (경복궁역 5번 출구 연결)' },
      { name: '북촌한옥마을', description: '전통 한옥들이 보존되어 있어 고풍스러운 골목길 산책을 즐기기 좋은 곳 (안국역 2번 출구)' },
      { name: '국립현대미술관 서울', description: '전통과 현대 예술이 함께 공존하는 미술 공간 (경복궁역 4번 출구 도보 10분)' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(239, 124, 28, 0.2), rgba(205, 124, 47, 0.2))'
  },
  {
    id: 'theme-shopping',
    title: '명동 & 동대문 트렌디 쇼핑 투어',
    description: '유행하는 패션 아이템부터 다채로운 길거리 음식까지 오감이 즐거운 도심 탐험!',
    stations: ['myeongdong', 'ddp', 'dongdaemun'],
    spots: [
      { name: 'DDP (동대문디자인플라자)', description: '우주선 모양의 독특한 아키텍처와 트렌디한 디자인 전시를 만날 수 있는 복합 문화 공간' },
      { name: '명동거리', description: '수많은 코스메틱 숍, 패션 몰, K-푸드 카트가 즐비한 대한민국 대표 쇼핑 메카' },
      { name: '남대문시장', description: '한국에서 가장 오래된 전통 종합 시장으로 길거리 호떡과 칼국수 골목이 유명 (회현역 인근)' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(0, 162, 209, 0.2), rgba(153, 108, 172, 0.2))'
  },
  {
    id: 'theme-culture',
    title: '광화문 & 시청 도심 문화 예술 기행',
    description: '웅장한 광장과 현대적인 전시, 도심 속 고즈넉한 궁궐을 하루에 만끽하는 코스.',
    stations: ['gwanghwamun', 'city-hall'],
    spots: [
      { name: '광화문광장', description: '세종대왕상과 이순신장군상, 탁 트인 북악산 조망을 선사하는 시각적 쉼터' },
      { name: '덕수궁 돌담길', description: '서울시청 서소문청사 옆, 연인과 걸으면 행복해지는 낭만적인 가로수길 (시청역 1번/12번 출구)' },
      { name: '서울시립미술관 (SeMA)', description: '덕수궁 뒷길에 위치한 붉은 벽돌의 옛 대법원 건물을 리모델링한 무료 공공 미술관' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(0, 82, 164, 0.2), rgba(0, 168, 77, 0.2))'
  },
  {
    id: 'theme-hip',
    title: '신당 & 충무로 레트로 힙 투어',
    description: '중앙시장 힙당동 먹거리부터 대한극장 뒷골목 필동의 감성 카페까지 뉴트로 탐색!',
    stations: ['sindang', 'chungmuro'],
    spots: [
      { name: '신당동 중앙시장 & 힙당동', description: '옛날 포장마차 감성과 젊은 요리사들의 개성 넘치는 이자카야, 감성 펍이 어우러진 신흥 핫플레이스' },
      { name: '필동 예술통', description: '충무로역 이면골목에 조성된 오픈 스트리트 뮤지엄으로 길거리 벽화와 조형 예술 감상 가능' },
      { name: '남산골한옥마을', description: '도심 속 정원과 함께 옛 선비들의 가옥들을 그대로 재현해 놓은 쉼터' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(205, 124, 47, 0.2), rgba(0, 162, 209, 0.2))'
  }
];
