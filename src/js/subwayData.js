/**
 * Round Map - 실제 개별 지정 GPS 위도/경도 기반 수도권 광역 Master 데이터셋 (GTX-A 및 신규 광역선 포함)
 * 모든 역은 1:1 개별 지정 좌표를 가지며, 환승역의 편의시설/접근성 정보는 호선별로 세분화되어 제공됩니다.
 */

// 14개 광역 노선 정보
export const lines = {
  '1': { name: '1호선', color: '#0052A4', textColor: '#FFFFFF' },
  '2': { name: '2호선', color: '#00A84D', textColor: '#FFFFFF' },
  '3': { name: '3호선', color: '#EF7C1C', textColor: '#FFFFFF' },
  '4': { name: '4호선', color: '#00A2D1', textColor: '#FFFFFF' },
  '5': { name: '5호선', color: '#996CAC', textColor: '#FFFFFF' },
  '6': { name: '6호선', color: '#CD7C2F', textColor: '#FFFFFF' },
  '7': { name: '7호선', color: '#747F00', textColor: '#FFFFFF' },
  '8': { name: '8호선', color: '#EA545D', textColor: '#FFFFFF' },
  '9': { name: '9호선', color: '#A17E46', textColor: '#FFFFFF' },
  'S': { name: '신분당선', color: '#D4003B', textColor: '#FFFFFF' },
  'B': { name: '수인분당선', color: '#F2A900', textColor: '#FFFFFF' },
  'K': { name: '경의중앙선', color: '#77C4A3', textColor: '#FFFFFF' },
  'A': { name: '공항철도', color: '#0090D2', textColor: '#FFFFFF' },
  'GTX-A': { name: 'GTX-A', color: '#06928C', textColor: '#FFFFFF' }
};

// 92개 주요 전 역사 개별 지정 WGS84 좌표 및 호선별 세부 데이터 구조
export const stations = {
  // === GTX-A 노선 ===
  'unjeong': {
    id: 'unjeong', name: '운정중앙역', lines: ['GTX-A'], lat: 37.7289, lng: 126.7451,
    facilities: {
      'GTX-A': { toilet: '지하 1층 대합실 개찰구 옆', nursing: '지하 1층 고객안내센터 내부', locker: '2번 출구 인근 통로', elevatorLocation: '1, 3번 출구 인근 외부 수직 엘리베이터' }
    },
    accessible: {
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 엘리베이터 탑승 -> 지하 1층 대합실 -> 승강장 직통 대형 리프트 이용' }
    }
  },
  'kintex': {
    id: 'kintex', name: '킨텍스역', lines: ['GTX-A'], lat: 37.6698, lng: 126.7482,
    facilities: {
      'GTX-A': { toilet: '지하 1층 대합실 중앙', nursing: '없음', locker: '1번 출구 에스컬레이터 인근', elevatorLocation: '킨텍스 제2전시장 연결 방향 엘리베이터' }
    },
    accessible: {
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '킨텍스 전시장 야외 에스컬레이터 하단 엘리베이터 탑승 -> 지하 1층 대합실 -> 승강장 엘리베이터 연동' }
    }
  },
  'seongnam': {
    id: 'seongnam', name: '성남역', lines: ['GTX-A', 'K'], lat: 37.3934, lng: 127.1265,
    facilities: {
      'GTX-A': { toilet: '지하 1층 대합실 중앙 개찰구 외부', nursing: '지하 1층 고객센터 내', locker: '1번 출구 에스컬레이터 옆', elevatorLocation: '2번, 4번 출구 외부 엘리베이터' },
      'K': { toilet: '지하 1층 경강선 게이트 인근', nursing: '없음', locker: '경강선 대합실 입구', elevatorLocation: '경강선 승강장 전용 리프트' }
    },
    accessible: {
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 외부 엘리베이터 -> 지하 1층 대합실 -> GTX-A 승강장 전용 수직 리프트 연계' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지하 1층 대합실 -> 경강선 승강장 연결 리프트 탑승' }
    }
  },
  'guseong': {
    id: 'guseong', name: '구성역', lines: ['B', 'GTX-A'], lat: 37.2863, lng: 127.1158,
    facilities: {
      'GTX-A': { toilet: '지하 1층 대합실 중앙', nursing: '없음', locker: 'GTX 개찰구 입구', elevatorLocation: '3번 출구 방향 외부 엘리베이터' },
      'B': { toilet: '수인분당선 지하 개찰구 외부', nursing: '없음', locker: '수인분당선 대합실 통로', elevatorLocation: '수인분당선 지상 외부 연계 엘리베이터' }
    },
    accessible: {
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 1층 대합실 -> GTX-A 승강장 전용 수직기 이용' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '수인분당선 외부 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 연결 엘리베이터 연동' }
    }
  },
  'dongtan': {
    id: 'dongtan', name: '동탄역', lines: ['GTX-A'], lat: 37.1996, lng: 127.0963,
    facilities: {
      'GTX-A': { toilet: '지하 4층 대합실 내부 및 지하 5층 연결부', nursing: '지하 4층 SRT 맞이방 옆 수유실', locker: '지하 4층 매표소 인근', elevatorLocation: '지상 버스정류장 연계 대형 엘리베이터' }
    },
    accessible: {
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 광장 엘리베이터 -> B4 대합실 -> B6 GTX-A 승강장 직통 무장애 수직 리프트 라인 완비' }
    }
  },

  // === 1호선 라인 ===
  'soyosan': {
    id: 'soyosan', name: '소요산역', lines: ['1'], lat: 37.9479, lng: 127.0611,
    facilities: { '1': { toilet: '지상 1층 개찰구 옆', nursing: '없음', locker: '없음', elevatorLocation: '1번 출구 외부 지상용 리프트' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 평면 개찰구 진출입 구조로 휠체어 단차 없이 1호선 승강장 진입 가능' } }
  },
  'dongducheon': {
    id: 'dongducheon', name: '동두천역', lines: ['1'], lat: 37.9272, lng: 127.0548,
    facilities: { '1': { toilet: '지상 2층 맞이방 내부', nursing: '없음', locker: '1번 출구 통로', elevatorLocation: '1번, 2번 출구 지상 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 대합실 -> 1호선 승강장 엘리베이터 연동' } }
  },
  'uijeongbu': {
    id: 'uijeongbu', name: '의정부역', lines: ['1'], lat: 37.7392, lng: 127.0448,
    facilities: { '1': { toilet: '지상 3층 맞이방 동편', nursing: '3층 고객센터 내', locker: '동부 및 서부 출구 통로', elevatorLocation: '3번, 6번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 외부 엘리베이터 -> 지상 3층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'dobongsan': {
    id: 'dobongsan', name: '도봉산역', lines: ['1', '7'], lat: 37.6895, lng: 127.0428,
    facilities: {
      '1': { toilet: '지상 1층 1호선 개찰구 밖', nursing: '없음', locker: '1번 출구 옆', elevatorLocation: '1번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 내부', nursing: '7호선 고객안내실 옆', locker: '7호선 개찰구 앞', elevatorLocation: '7호선 승강장 환승 엘리베이터' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 환승통로 -> 1호선 승강장 엘리베이터' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7호선 환승 전용 엘리베이터 탑승 -> 지하 1층 7호선 승강장 연계' }
    }
  },
  'changdong': {
    id: 'changdong', name: '창동역', lines: ['1', '4'], lat: 37.6532, lng: 127.0478,
    facilities: {
      '1': { toilet: '지상 2층 1호선 대합실 안쪽', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번 출구 외부' },
      '4': { toilet: '지상 3층 4호선 개찰구 외부', nursing: '없음', locker: '2번 출구 출구방향', elevatorLocation: '2번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 2층 대합실 -> 3층 4호선 승강장 엘리베이터 연동' }
    }
  },
  'nowon': {
    id: 'nowon', name: '노원역', lines: ['4', '7'], lat: 37.6542, lng: 127.0608,
    facilities: {
      '4': { toilet: '지상 3층 4호선 개찰구 외부', nursing: '없음', locker: '2번, 9번 출구 인근', elevatorLocation: '2번, 9번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 안쪽', nursing: '7호선 안내소 옆', locker: '5번 출구 대합실', elevatorLocation: '5번 출구 외부' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 외부 엘리베이터 -> 지상 3층 대합실 -> 4호선 승강장 이동' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 전용 엘리베이터 연동' }
    }
  },
  'seokgye': {
    id: 'seokgye', name: '석계역', lines: ['1', '6'], lat: 37.6150, lng: 127.0658,
    facilities: {
      '1': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 인근', elevatorLocation: '1번 출구 외부' },
      '6': { toilet: '지하 1층 대합실 내부', nursing: '없음', locker: '6호선 대합실 출구앞', elevatorLocation: '6호선 6번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 1호선 승강장 리프트 연동' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트 이용' }
    }
  },
  'cheongnyangni': {
    id: 'cheongnyangni', name: '청량리역', lines: ['1', 'B', 'K'], lat: 37.5801, lng: 127.0490,
    facilities: {
      '1': { toilet: '지하 1층 대합실 중앙', nursing: '없음', locker: '3번 출구 방향', elevatorLocation: '1번, 3번 출구 외부' },
      'B': { toilet: '지상 3층 KTX 역사 내부', nursing: 'KTX 역사 내 수유실 공유', locker: '대합실 중앙', elevatorLocation: '경의중앙/분당 환승통로용 리프트' },
      'K': { toilet: '지상 3층 맞이방 안쪽', nursing: '없음', locker: '대합실 중앙', elevatorLocation: '경의중앙선 승강장 엘리베이터' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 1호선 승강장 엘리베이터 탑승' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: 'KTX 역사 엘리베이터 -> 수인분당선 환승통로 무장애 경사로 연결' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: 'KTX 역사 엘리베이터 -> 지상 1층 경의중앙선 승강장 연결 수직기 탑승' }
    }
  },
  'dongdaemun': {
    id: 'dongdaemun', name: '동대문역', lines: ['1', '4'], lat: 37.5714, lng: 127.0094,
    facilities: {
      '1': { toilet: '지하 1.5층 1호선 개찰구 밖', nursing: '없음', locker: '1번, 5번 출구 대합실', elevatorLocation: '6번 출구 외부 엘리베이터' },
      '4': { toilet: '지하 1층 4호선 대합실', nursing: '4호선 고객안내센터 내', locker: '8번, 9번 출구 지하 통로', elevatorLocation: '10번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 외부 엘리베이터 -> 1호선 대합실 -> 1호선 승강장 연결 수직기 탑승' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '10번 출구 엘리베이터 -> 4호선 대합실 -> 4호선 승강장 리프트 연제' }
    }
  },
  'jongno3': {
    id: 'jongno3', name: '종로3가역', lines: ['1', '3', '5'], lat: 37.5716, lng: 126.9918,
    facilities: {
      '1': { toilet: '지하 1층 1호선 대합실 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '15번 출구 앞 외부 엘리베이터' },
      '3': { toilet: '지하 1층 3호선 대합실 중앙', nursing: '3호선 맞이방 수유실', locker: '8번 출구 대합실', elevatorLocation: '없음' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '없음', locker: '5호선 대합실 안쪽', elevatorLocation: '5호선 5번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '15번 출구 엘리베이터 -> 지하 대합실 -> 1호선 승강장 엘리베이터 연동' },
      '3': { hasElevator: false, hasWheelchairLift: true, accessibleRoute: '⚠️ 엘리베이터 없음. 지상에서 승강장으로 이동하려면 수동 휠체어 리프트 이용(직원 동반 필요)' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 5호선 지하 대합실 -> 5호선 승강장 연결 리프트' }
    }
  },
  'city-hall': {
    id: 'city-hall', name: '시청역', lines: ['1', '2'], lat: 37.5657, lng: 126.9769,
    facilities: {
      '1': { toilet: '지하 1층 1호선 대합실 개찰구 밖', nursing: '없음', locker: '1번, 5번 출구 지하상가 연결부', elevatorLocation: '12번 출구 외부' },
      '2': { toilet: '지하 1층 2호선 대합실 안쪽', nursing: '2호선 고객안내센터 내', locker: '9번, 10번 출구 대합실', elevatorLocation: '11번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 1호선 지하 대합실 -> 1호선 승강장 연결 수직 리프트' },
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '11번 출구 엘리베이터 -> 2호선 대합실 -> 2호선 승강장 직접 연계' }
    }
  },
  'seoul': {
    id: 'seoul', name: '서울역', lines: ['1', '4', 'A', 'GTX-A'], lat: 37.5546, lng: 126.9706,
    facilities: {
      '1': { toilet: '1호선 대합실 1, 2번 출구 사이', nursing: '없음', locker: '1호선 개찰구 앞 물품보관함', elevatorLocation: '1번 출구 외부 엘리베이터' },
      '4': { toilet: '4호선 B2층 게이트 인근', nursing: '없음', locker: '4호선 14번 출구 지하 통로', elevatorLocation: '14번 출구 인근 외부' },
      'A': { toilet: '공항철도 지하 1층 및 지하 3층 개찰구 내부', nursing: '지하 1층 고객안내센터 인근', locker: '공항철도 B1층 트래블센터 옆', elevatorLocation: '교통센터 연결 엘리베이터' },
      'GTX-A': { toilet: '지하 4층 대합실 내부', nursing: '지하 4층 맞이방 옆', locker: '지하 4층 환승 통로', elevatorLocation: 'KTX 대합실 직통 대형 리프트' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 외부 엘리베이터 -> 지하 1층 개찰구 -> 1호선 승강장 직접 연결' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '14번 출구 엘리베이터 -> B2층 대합실 -> 4호선 승강장 엘리베이터 연동' },
      'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '공항철도 교통센터 엘리베이터 -> B3층 환승 게이트 -> B7층 승강장 초고속 리프트 이용' },
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 KTX 광장 남측 엘리베이터 -> 지하 4층 GTX 맞이방 -> 지하 6층 승강장 직통 수직기 탑승' }
    }
  },
  'namyeong': {
    id: 'namyeong', name: '남영역', lines: ['1'], lat: 37.5416, lng: 126.9711,
    facilities: { '1': { toilet: '지상 1층 개찰구 외부', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번 출구 방향 외부 리프트' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 지상 엘리베이터 -> 지상 2층 1호선 승강장 무단차 연결' } }
  },
  'yongsan': {
    id: 'yongsan', name: '용산역', lines: ['1', 'K'], lat: 37.5298, lng: 126.9648,
    facilities: {
      '1': { toilet: '지상 3층 맞이방 중앙', nursing: '3층 매표소 인근 수유방', locker: '아이파크몰 지하 연결부', elevatorLocation: '1번 출구 광장 방면' },
      'K': { toilet: '지상 3층 맞이방 서편', nursing: '없음', locker: '아이파크몰 입구 인근', elevatorLocation: '경의중앙선 승강장 엘리베이터' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '용산역 광장 엘리베이터 -> 지상 3층 대합실 -> 1호선 승강장 연결 리프트 탑승' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3층 대합실 -> 경의중앙선 승강장 직통 전용 수직 리프트 연계' }
    }
  },
  'noryangjin': {
    id: 'noryangjin', name: '노량진역', lines: ['1', '9'], lat: 37.5142, lng: 126.9427,
    facilities: {
      '1': { toilet: '지상 1층 1호선 대합실 안쪽', nursing: '없음', locker: '1번 출구 인근', elevatorLocation: '1번 출구 앞' },
      '9': { toilet: '지하 1층 9호선 개찰구 밖', nursing: '9호선 안내실 옆', locker: '9호선 대합실 중앙', elevatorLocation: '3번, 8번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 지상 엘리베이터 -> 1호선 승강장 평지 무단차 진입로 이용' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 9호선 승강장 전용 수직기 이용' }
    }
  },
  'singil': {
    id: 'singil', name: '신길역', lines: ['1', '5'], lat: 37.5171, lng: 126.9171,
    facilities: {
      '1': { toilet: '지상 2층 1호선 대합실', nursing: '없음', locker: '1호선 3번 출구 방향', elevatorLocation: '3번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 외부', nursing: '5호선 고객지원실 내', locker: '5호선 대합실 통로', elevatorLocation: '1번, 2번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 연결 리프트' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> B1 대합실 -> B3 5호선 승강장 엘리베이터 연동' }
    }
  },
  'sindorim': {
    id: 'sindorim', name: '신도림역', lines: ['1', '2'], lat: 37.5087, lng: 126.8912,
    facilities: {
      '1': { toilet: '지상 2층 1호선 대합실', nursing: '2층 고객센터 수유방', locker: '테크노마트 연결부', elevatorLocation: '1번, 2번 출구 외부' },
      '2': { toilet: '지하 1층 2호선 개찰구 내부', nursing: '없음', locker: '디큐브시티 연결부', elevatorLocation: '5번, 6번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' },
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> B1 대합실 -> 2호선 승강장 연결 리프트 탑승' }
    }
  },
  'guro': {
    id: 'guro', name: '구로역', lines: ['1'], lat: 37.5031, lng: 126.8820,
    facilities: { '1': { toilet: '지상 2층 맞이방 안쪽', nursing: '없음', locker: '1번 출구 통로', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 맞이방 -> 1호선 각 승강장 전용 수직 리프트 탑승' } }
  },
  'yeokgok': {
    id: 'yeokgok', name: '역곡역', lines: ['1'], lat: 37.4851, lng: 126.8115,
    facilities: { '1': { toilet: '지상 2층 개찰구 내부', nursing: '없음', locker: '1번, 2번 출구 통로', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 연결 리프트' } }
  },
  'bucheon': {
    id: 'bucheon', name: '부천역', lines: ['1'], lat: 37.4841, lng: 126.7827,
    facilities: { '1': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '남부 및 북부 지하 연결부', elevatorLocation: '북부광장 버스쉘터 옆 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '북부광장 엘리베이터 -> 지하 대합실 -> 1호선 승강장 연결 리프트 탑승' } }
  },
  'songnae': {
    id: 'songnae', name: '송내역', lines: ['1'], lat: 37.4876, lng: 126.7533,
    facilities: { '1': { toilet: '지상 2층 맞이방 내부', nursing: '없음', locker: '1번, 2번 출구 앞', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 외부 엘리베이터 -> 2층 대합실 -> 1호선 승강장 수직 리프트 연계' } }
  },
  'bupyeong': {
    id: 'bupyeong', name: '부평역', lines: ['1', '7'], lat: 37.4895, lng: 126.7248,
    facilities: {
      '1': { toilet: '지하 1층 대합실 개찰구 밖', nursing: '없음', locker: '부평역 분수대 광장 옆', elevatorLocation: '북부광장 외부' },
      '7': { toilet: '지하 1층 7호선 개찰구 밖', nursing: '7호선 안내실 내부', locker: '7호선 대합실 안쪽', elevatorLocation: '7호선 6번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '북부광장 외부 엘리베이터 -> 지하 대합실 -> 1호선 승강장 연결 수직 리프트 탑승' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 7호선 지하 대합실 -> 7호선 승강장 엘리베이터 연동' }
    }
  },
  'juan': {
    id: 'juan', name: '주안역', lines: ['1'], lat: 37.4649, lng: 126.6798,
    facilities: { '1': { toilet: '지상 2층 맞이방 중앙', nursing: '없음', locker: '남부 및 북부 출구 연결로', elevatorLocation: '남부광장 및 북부광장 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '남부광장 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'dongincheon': {
    id: 'dongincheon', name: '동인천역', lines: ['1'], lat: 37.4753, lng: 126.6328,
    facilities: { '1': { toilet: '지상 2층 맞이방 안쪽', nursing: '없음', locker: '지하상가 연결부', elevatorLocation: '북부광장 방향 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '북부광장 엘리베이터 -> 2층 맞이방 -> 1호선 승강장 연결 리프트 탑승' } }
  },
  'incheon': {
    id: 'incheon', name: '인천역', lines: ['1', 'B'], lat: 37.4766, lng: 126.6171,
    facilities: {
      '1': { toilet: '지상 1층 승강장 서단', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '평면 개찰구 제공' },
      'B': { toilet: '지하 1층 수인분당선 개찰구 밖', nursing: '없음', locker: '수인분당선 대합실 안쪽', elevatorLocation: '수인분당선 외부 연결용' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 1호선 승강장까지 단차 없는 무단차 슬로프로 평지 바로 통과 가능' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 대합실 외부 엘리베이터 -> 지하 1층 -> 수인분당선 지하 승강장 리프트 연동' }
    }
  },

  // === 경부선 분기 ===
  'gasan': {
    id: 'gasan', name: '가산디지털단지역', lines: ['1', '7'], lat: 37.4803, lng: 126.8826,
    facilities: {
      '1': { toilet: '지상 2층 1호선 대합실', nursing: '없음', locker: '1번 출구 에스컬레이터 옆', elevatorLocation: '1번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 내부', nursing: '7호선 안내실 내부 수유실', locker: '6번 출구 대합실', elevatorLocation: '5번, 6번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 연결 리프트' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 연결 리프트 탑승' }
    }
  },
  'geumcheon-office': {
    id: 'geumcheon-office', name: '금천구청역', lines: ['1'], lat: 37.4554, lng: 126.8940,
    facilities: { '1': { toilet: '지상 1층 개찰구 외부', nursing: '없음', locker: '1번 출구 옆', elevatorLocation: '1번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 외부 엘리베이터 -> 2층 연결 육교 -> 1호선 승강장 리프트 탑승' } }
  },
  'anyang': {
    id: 'anyang', name: '안양역', lines: ['1'], lat: 37.4019, lng: 126.9228,
    facilities: { '1': { toilet: '지상 2층 대합실 내부', nursing: '2층 고객센터 수유방', locker: '엔터식스 연결부', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'geumjeong': {
    id: 'geumjeong', name: '금정역', lines: ['1', '4'], lat: 37.3722, lng: 126.9434,
    facilities: {
      '1': { toilet: '지상 2층 맞이방 동편', nursing: '없음', locker: '1, 2번 출구 연결로', elevatorLocation: '1번, 2번 출구 외부' },
      '4': { toilet: '지상 2층 맞이방 서편', nursing: '없음', locker: '6, 7번 출구 연결로', elevatorLocation: '6번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 2층 엘리베이터 탑승하여 대합실 경유 후 1/4호선 동일 홈 평면환승 이용 (휠체어 초간편)' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1/4호선이 평면 승강장 구조이므로 환승 시 휠체어로 계단 오르내림 없이 바로 옆 라인 환승 가능' }
    }
  },
  'uiwang': {
    id: 'uiwang', name: '의왕역', lines: ['1'], lat: 37.3211, lng: 126.9536,
    facilities: { '1': { toilet: '지상 2층 개찰구 내부', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'suwon': {
    id: 'suwon', name: '수원역', lines: ['1', 'B'], lat: 37.2662, lng: 126.9998,
    facilities: {
      '1': { toilet: '지상 2층 맞이방 중앙', nursing: '2층 철도고객센터 옆 수유방', locker: '수원역 대합실 서부 연결구역', elevatorLocation: '동부광장 외부' },
      'B': { toilet: '지하 1층 분당선 대합실', nursing: '없음', locker: 'AK플라자 연결 통로', elevatorLocation: '서부광장 외부 엘리베이터' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '동부광장 외부 엘리베이터 -> 2층 맞이방 -> 1호선 승강장 연결 리프트 탑승' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '서부광장 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 리프트 탑승' }
    }
  },
  'byeongjeom': {
    id: 'byeongjeom', name: '병점역', lines: ['1'], lat: 37.2075, lng: 127.0341,
    facilities: { '1': { toilet: '지상 2층 대합실 동편', nursing: '없음', locker: '1번, 2번 출구 중간', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 연결 리프트 탑승' } }
  },
  'osan': {
    id: 'osan', name: '오산역', lines: ['1'], lat: 37.1459, lng: 127.0667,
    facilities: { '1': { toilet: '지상 2층 통합 대합실', nursing: '없음', locker: '오산역 환승센터 내부', elevatorLocation: '1번 출구 광장 및 환승 주차장' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 외부 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'seojeongri': {
    id: 'seojeongri', name: '서정리역', lines: ['1'], lat: 37.0805, lng: 127.0543,
    facilities: { '1': { toilet: '지상 2층 대합실 중앙', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 탑승' } }
  },
  'pyyeongtaek': {
    id: 'pyyeongtaek', name: '평택역', lines: ['1'], lat: 36.9912, lng: 127.0858,
    facilities: { '1': { toilet: '지상 2층 민자역사 맞이방', nursing: '2층 고객센터 내부', locker: 'AK백화점 입구', elevatorLocation: '서부 및 동부광장 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '동부광장 엘리베이터 -> 2층 맞이방 -> 1호선 승강장 수직 리프트 탑승' } }
  },
  'cheonan': {
    id: 'cheonan', name: '천안역', lines: ['1'], lat: 36.8101, lng: 127.1462,
    facilities: { '1': { toilet: '지상 2층 개찰구 외부', nursing: '없음', locker: '동부 대합실 안쪽', elevatorLocation: '동부역 및 서부역 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '동부역 엘리베이터 -> 2층 대합실 -> 1호선 승강장 연결 리프트' } }
  },
  'sinchang': {
    id: 'sinchang', name: '신창역', lines: ['1'], lat: 36.7696, lng: 126.9515,
    facilities: { '1': { toilet: '지상 1층 대합실 개찰구 밖', nursing: '없음', locker: '없음', elevatorLocation: '1번 출구 외부' } },
    accessible: { '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 1층 대합실 -> 승강장 무단차 진입 가능' } }
  },

  // === 2호선 라인 ===
  'hapjeong': {
    id: 'hapjeong', name: '합정역', lines: ['2', '6'], lat: 37.5494, lng: 126.9138,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '8번 출구 마포한강푸르지오 지하 연결부', elevatorLocation: '9번 출구 앞 외부' },
      '6': { toilet: '지하 1층 6호선 대합실', nursing: '없음', locker: '6호선 대합실 중앙', elevatorLocation: '5번 출구 앞 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 수직 리프트 연계' }
    }
  },
  'hongik': {
    id: 'hongik', name: '홍대입구역', lines: ['2', 'K', 'A'], lat: 37.5575, lng: 126.9244,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 내부', nursing: '없음', locker: '8, 9번 출구 지하 연결로', elevatorLocation: '8번 출구 외부' },
      'K': { toilet: '지상 1층 경의선 대합실 외부', nursing: '없음', locker: '4번 출구 방향 지하', elevatorLocation: '4번, 5번 출구 외부' },
      'A': { toilet: '지하 1층 공항철도 대합실 안쪽', nursing: '공항철도 지하 1층 수유방', locker: '공항철도 개찰구 옆', elevatorLocation: '4번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 2호선 지하 대합실 -> 2호선 승강장 수직기 탑승' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 경의선 지상 대합실 -> 경의선 승강장 리프트' },
      'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 공항철도 B1층 대합실 -> B3층 승강장 초고속 리프트 연계' }
    }
  },
  'sinchon': {
    id: 'sinchon', name: '신촌역', lines: ['2'], lat: 37.5552, lng: 126.9369,
    facilities: { '2': { toilet: '지하 1층 대합실 중앙', nursing: '없음', locker: '1번, 8번 출구 통로', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트 탑승' } }
  },
  'chungjeongro': {
    id: 'chungjeongro', name: '충정로역', lines: ['2', '5'], lat: 37.5598, lng: 126.9636,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '3번 출구 방향', elevatorLocation: '3번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '없음', locker: '9번 출구 대합실', elevatorLocation: '9번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 2호선 승강장 리프트 탑승' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> B2 대합실 -> 5호선 승강장 리프트 연동' }
    }
  },
  'euljiro-ipgu': {
    id: 'euljiro-ipgu', name: '을지로입구역', lines: ['2'], lat: 37.5660, lng: 126.9826,
    facilities: { '2': { toilet: '지하 1층 개찰구 외부 롯데백화점 연결구역', nursing: '없음', locker: '3번, 5번 출구 대합실', elevatorLocation: '8번 출구 외부' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 직접 연결' } }
  },
  'euljiro3': {
    id: 'euljiro3', name: '을지로3가역', lines: ['2', '3'], lat: 37.5663, lng: 126.9910,
    facilities: {
      '2': { toilet: '지하 1층 2호선 대합실', nursing: '없음', locker: '1번, 12번 출구 대합실', elevatorLocation: '12번 출구 외부' },
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '3호선 대합실 안쪽', elevatorLocation: '12번 출구 방향 외부 공용' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트 탑승' },
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 직접 연동' }
    }
  },
  'euljiro4': {
    id: 'euljiro4', name: '을지로4가역', lines: ['2', '5'], lat: 37.5666, lng: 126.9980,
    facilities: {
      '2': { toilet: '지하 1층 2호선 대합실', nursing: '없음', locker: '4번 출구 대합실', elevatorLocation: '5번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '5호선 고객행복센터 내 수유실', locker: '5호선 대합실 안쪽', elevatorLocation: '9번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> B1 대합실 -> 2호선 승강장 연결 리프트' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> B1 대합실 -> B3 5호선 승강장 리프트 탑승' }
    }
  },
  'ddp': {
    id: 'ddp', name: '동대문역사문화공원역', lines: ['2', '4', '5'], lat: 37.5657, lng: 127.0079,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 외부', nursing: '없음', locker: 'DDP 연결 광장 통로', elevatorLocation: '1번 출구 DDP 방면 외부' },
      '4': { toilet: '지하 1층 4호선 대합실', nursing: '없음', locker: '13번, 14번 출구 방향', elevatorLocation: '14번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '5호선 안내센터 옆 수유센터', locker: '5호선 대합실 입구', elevatorLocation: '6번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 DDP 광장 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '14번 출구 엘리베이터 -> 4호선 대합실 -> 4호선 승강장 리프트 연계' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 5호선 대합실 -> 5호선 승강장 전용 수직 리프트' }
    }
  },
  'sindang': {
    id: 'sindang', name: '신당역', lines: ['2', '6'], lat: 37.5656, lng: 127.0195,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '2호선 고객안내실 옆', locker: '1번, 10번 출구', elevatorLocation: '4번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실 내부', nursing: '없음', locker: '6호선 개찰구 옆', elevatorLocation: '6번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 전용 리프트 연계' }
    }
  },
  'wangsimni': {
    id: 'wangsimni', name: '왕십리역', lines: ['2', '5', 'B', 'K'], lat: 37.5619, lng: 127.0385,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '12번 출구 대합실', elevatorLocation: '6-1번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '없음', locker: '5호선 개찰구 앞', elevatorLocation: '5번 출구 외부' },
      'B': { toilet: '지상 2층 맞이방 내부', nursing: '경의중앙선 고객지원실 옆 수유센터', locker: '비트플렉스 지하 1층 연결로', elevatorLocation: '민자역사 내부' },
      'K': { toilet: '지상 2층 맞이방 서편', nursing: '없음', locker: '민자역사 대합실', elevatorLocation: '경의중앙선 승강장용 리프트' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6-1번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 연결 리프트' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '민자역사 중앙 엘리베이터 -> 수인분당선 승강장 전용 수직 리프트 연계' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '민자역사 대합실 엘리베이터 -> 지상 1층 경의중앙선 승강장 연결 수직기 탑승' }
    }
  },
  'seongsu': {
    id: 'seongsu', name: '성수역', lines: ['2'], lat: 37.5446, lng: 127.0559,
    facilities: { '2': { toilet: '지상 2층 대합실 내부', nursing: '없음', locker: '2번, 3번 출구 방향', elevatorLocation: '2번, 3번 출구 외부 엘리베이터' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 외부 엘리베이터 -> 2층 대합실 -> 2호선 승강장 리프트 탑승' } }
  },
  'konkuk': {
    id: 'konkuk', name: '건대입구역', lines: ['2', '7'], lat: 37.5404, lng: 127.0692,
    facilities: {
      '2': { toilet: '지상 2층 2호선 대합실', nursing: '없음', locker: '2번 출구 대합실', elevatorLocation: '5번 출구 앞 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 안쪽', nursing: '7호선 고객센터 옆 수유실', locker: '3번, 4번 출구 지하 통로', elevatorLocation: '3번 출구 앞 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 2층 대합실 -> 2호선 지상 승강장 이동' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 7호선 지하 승강장 리프트 탑승' }
    }
  },
  'jamsil': {
    id: 'jamsil', name: '잠실역', lines: ['2', '8'], lat: 37.5133, lng: 127.1001,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '지하 롯데월드 연결통로 광장', elevatorLocation: '3번, 4번 출구 외부' },
      '8': { toilet: '지하 1층 8호선 대합실 안쪽', nursing: '8호선 안내실 옆 수유센터', locker: '8호선 대합실 개찰구 인근', elevatorLocation: '11번, 12번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트 탑승' },
      '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '11번 출구 엘리베이터 -> 지하 대합실 -> 8호선 승강장 직접 연결 리프트' }
    }
  },
  'samseong': {
    id: 'samseong', name: '삼성역', lines: ['2'], lat: 37.5089, lng: 127.0632,
    facilities: { '2': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '5, 6번 출구 코엑스 지하연결부', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트 탑승' } }
  },
  'seolleung': {
    id: 'seolleung', name: '선릉역', lines: ['2', 'B'], lat: 37.5045, lng: 127.0490,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '1번, 10번 출구 대합실', elevatorLocation: '1번, 4번 출구 외부' },
      'B': { toilet: '지하 1층 분당선 개찰구 밖', nursing: '없음', locker: '분당선 대합실 중앙', elevatorLocation: '7번, 8번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7번 출구 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 전용 리프트' }
    }
  },
  'gangnam': {
    id: 'gangnam', name: '강남역', lines: ['2', 'S'], lat: 37.4979, lng: 127.0276,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '11번, 12번 출구 지하상가 통로', elevatorLocation: '11번, 12번 출구 외부' },
      'S': { toilet: '신분당선 지하 B1층 개찰구 내부', nursing: '신분당선 수유방 B1층', locker: '신분당선 환승통로', elevatorLocation: '1번, 4번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트 탑승' },
      'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 신분당선 대합실 -> 신분당선 승강장 수직기 연동' }
    }
  },
  'gyodae': {
    id: 'gyodae', name: '교대역', lines: ['2', '3'], lat: 37.4939, lng: 127.0146,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '1번, 5번 출구 대합실', elevatorLocation: '1번, 5번 출구 외부' },
      '3': { toilet: '지하 1층 3호선 개찰구 안쪽', nursing: '없음', locker: '8번 출구 대합실', elevatorLocation: '8번, 13번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> B1 대합실 -> 2호선 승강장 연결 리프트' },
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> B1 대합실 -> 3호선 승강장 수직 리프트 연계' }
    }
  },
  'seocho': {
    id: 'seocho', name: '서초역', lines: ['2'], lat: 37.4919, lng: 127.0079,
    facilities: { '2': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 방향', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트 탑승' } }
  },
  'sadang': {
    id: 'sadang', name: '사당역', lines: ['2', '4'], lat: 37.4765, lng: 126.9816,
    facilities: {
      '2': { toilet: '지하 1층 2호선 대합실 외부', nursing: '없음', locker: '지하 환승주차장 연결통로', elevatorLocation: '3번, 5번 출구 외부' },
      '4': { toilet: '지하 1층 4호선 개찰구 내부', nursing: '4호선 안내센터 수유실', locker: '4호선 대합실 중앙', elevatorLocation: '9번, 10번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 전용 수직 리프트 연동' }
    }
  },
  'sillim': {
    id: 'sillim', name: '신림역', lines: ['2'], lat: 37.4843, lng: 126.9297,
    facilities: { '2': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1, 2번 출구 타임스트림 연결부', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트 탑승' } }
  },
  'daelim': {
    id: 'daelim', name: '대림역', lines: ['2', '7'], lat: 37.4930, lng: 126.8950,
    facilities: {
      '2': { toilet: '지상 2층 2호선 대합실', nursing: '없음', locker: '1번, 2번 출구 통로', elevatorLocation: '1번, 4번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 안쪽', nursing: '없음', locker: '10번, 11번 출구 지하', elevatorLocation: '10번, 11번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 2호선 지상 승강장 연결' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '10번 출구 엘리베이터 -> 지하 대합실 -> 7호선 지하 승강장 리프트 탑승' }
    }
  },

  // === 3호선 라인 ===
  'daehwa': {
    id: 'daehwa', name: '대화역', lines: ['3'], lat: 37.6760, lng: 126.7475,
    facilities: { '3': { toilet: '지하 1층 대합실 내부 중앙', nursing: '없음', locker: '2번, 5번 출구 앞', elevatorLocation: '3번, 6번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 외부 엘리베이터 -> 지하 대합실 -> 3호선 승강장 연결 수직기 탑승' } }
  },
  'jeongbalsan': {
    id: 'jeongbalsan', name: '정발산역', lines: ['3'], lat: 37.6595, lng: 126.7734,
    facilities: { '3': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 라페스타 방향', elevatorLocation: '1번, 4번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 직접 연결 리프트' } }
  },
  'baekseok': {
    id: 'baekseok', name: '백석역', lines: ['3'], lat: 37.6430, lng: 126.7865,
    facilities: { '3': { toilet: '지하 1층 개찰구 밖 고양터미널 연결구역', nursing: '없음', locker: '4번, 5번 출구 대합실', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 수직기 연동' } }
  },
  'wondang': {
    id: 'wondang', name: '원당역', lines: ['3'], lat: 37.6533, lng: 126.8430,
    facilities: { '3': { toilet: '지상 2층 개찰구 내부', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 3호선 승강장 리프트 연동' } }
  },
  'jichuk': {
    id: 'jichuk', name: '지축역', lines: ['3'], lat: 37.6481, lng: 126.9137,
    facilities: { '3': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 옆', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 3호선 승강장 연결 리프트 탑승' } }
  },
  'gupabal': {
    id: 'gupabal', name: '구파발역', lines: ['3'], lat: 37.6378, lng: 126.9188,
    facilities: { '3': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '1번, 3번 출구 롯데몰 연결구역', elevatorLocation: '2번, 4번 출구 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 직접 연결' } }
  },
  'yeonsinnae': {
    id: 'yeonsinnae', name: '연신내역', lines: ['3', '6', 'GTX-A'], lat: 37.6186, lng: 126.9208,
    facilities: {
      '3': { toilet: '지하 1층 3호선 대합실', nursing: '없음', locker: '1번, 7번 출구', elevatorLocation: '7번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실', nursing: '없음', locker: '6호선 대합실 중앙', elevatorLocation: '5번 출구 외부' },
      'GTX-A': { toilet: '지하 4층 대합실 내부', nursing: '지하 4층 고객실 내', locker: '지하 4층 환승 복도', elevatorLocation: 'GTX 환승 전용 초고속 리프트' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트 탑승' },
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 엘리베이터 -> 지하 4층 -> GTX-A 전용 수직 리프트 연계' }
    }
  },
  'gyeongbokgung': {
    id: 'gyeongbokgung', name: '경복궁역', lines: ['3'], lat: 37.5758, lng: 126.9735,
    facilities: { '3': { toilet: '지하 1층 미술관 지하연결 통로', nursing: '없음', locker: '5번 출구 방향', elevatorLocation: '4번 출구 앞 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 외부 엘리베이터 -> 지하 대합실 -> 3호선 승강장 연결 리프트 탑승' } }
  },
  'anguk': {
    id: 'anguk', name: '안국역', lines: ['3'], lat: 37.5765, lng: 126.9854,
    facilities: { '3': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구 앞', elevatorLocation: '5번 출구 앞 외부 엘리베이터' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 수직기 탑승' } }
  },
  'chungmuro': {
    id: 'chungmuro', name: '충무로역', lines: ['3', '4'], lat: 37.5614, lng: 126.9942,
    facilities: {
      '3': { toilet: '지하 1층 개찰구 밖 공용', nursing: '지하 1층 대합실 동편 수유방', locker: '2번, 8번 출구 대합실', elevatorLocation: '1번, 8번 출구 외부' },
      '4': { toilet: '지하 1층 개찰구 밖 공용', nursing: '없음', locker: '3번, 5번 출구 대합실', elevatorLocation: '1번, 8번 출구 외부 공용' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 리프트 연동' },
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 직접 연결' }
    }
  },
  'yaksu': {
    id: 'yaksu', name: '약수역', lines: ['3', '6'], lat: 37.5544, lng: 127.0108,
    facilities: {
      '3': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '3번, 7번 출구 대합실', elevatorLocation: '3번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 개찰구 밖', nursing: '없음', locker: '6호선 대합실 안쪽', elevatorLocation: '8번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 직접 연결' }
    }
  },
  'oksu': {
    id: 'oksu', name: '옥수역', lines: ['3', 'K'], lat: 37.5416, lng: 127.0175,
    facilities: {
      '3': { toilet: '지상 2층 3호선 맞이방', nursing: '없음', locker: '1번, 7번 출구 통로', elevatorLocation: '1번, 7번 출구 외부' },
      'K': { toilet: '지상 1층 경의선 맞이방', nursing: '없음', locker: '경의선 대합실 중앙', elevatorLocation: '4번 출구 앞 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 대합실 -> 3호선 지상 승강장 수직기 탑승' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지상 경의선 승강장 직접 연계' }
    }
  },
  'apgujeong': {
    id: 'apgujeong', name: '압구정역', lines: ['3'], lat: 37.5265, lng: 127.0285,
    facilities: { '3': { toilet: '지하 1층 개찰구 밖 현대백화점 연결통로', nursing: '없음', locker: '2번, 6번 출구 방향', elevatorLocation: '1번, 6번 출구 외부' } },
    accessible: { '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 연결 리프트 탑승' } }
  },
  'express-bus': {
    id: 'express-bus', name: '고속터미널역', lines: ['3', '7', '9'], lat: 37.5049, lng: 127.0049,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '3호선 대합실 백화점 입구', elevatorLocation: '8번 출구 앞 외부' },
      '7': { toilet: '지하 2층 7호선 개찰구 밖', nursing: '없음', locker: '7호선 대합실 중앙', elevatorLocation: '3번, 4번 출구 외부' },
      '9': { toilet: '지하 1층 9호선 개찰구 밖', nursing: '9호선 대합실 안내실 옆', locker: '9호선 환승 통로', elevatorLocation: '8-1번, 8-2번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> B1 대합실 -> 3호선 승강장 리프트 탑승' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B2 대합실 -> 7호선 승강장 리프트 탑승' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8-1번 출구 엘리베이터 -> B1 대합실 -> 9호선 승강장 전용 수직 리프트 연계' }
    }
  },
  'yangjae': {
    id: 'yangjae', name: '양재역', lines: ['3', 'S'], lat: 37.4841, lng: 127.0346,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '1번, 12번 출구 대합실', elevatorLocation: '12번 출구 앞 외부' },
      'S': { toilet: '신분당선 지하 B1층 개찰구 안', nursing: '신분당선 고객서비스센터 내', locker: '신분당선 환승통로', elevatorLocation: '1번, 2번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 연결 리프트' },
      'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 신분당선 대합실 -> 신분당선 승강장 리프트 탑승' }
    }
  },
  'dogok': {
    id: 'dogok', name: '도곡역', lines: ['3', 'B'], lat: 37.4909, lng: 127.0554,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구', elevatorLocation: '1번, 4번 출구 외부' },
      'B': { toilet: '지하 1층 분당선 개찰구 밖', nursing: '없음', locker: '분당선 대합실 중앙', elevatorLocation: '2번, 3번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 연결 리프트' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 리프트 연동' }
    }
  },
  'suseo': {
    id: 'suseo', name: '수서역', lines: ['3', 'B', 'GTX-A'], lat: 37.4874, lng: 127.1012,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '3호선 안내센터 수유실', locker: 'SRT 지하 연결 환승통로', elevatorLocation: '3번 출구 방향 외부' },
      'B': { toilet: '지하 1층 분당선 개찰구 내부', nursing: '없음', locker: '분당선 대합실 코너', elevatorLocation: '5번, 6번 출구 외부' },
      'GTX-A': { toilet: '지하 4층 대합실 내부', nursing: '지하 4층 맞이방 수유실', locker: 'GTX 맞이방 입구', elevatorLocation: 'SRT 역무실 연동 승강 리프트' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 직접 연계 리프트' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 수직기 탑승' },
      'GTX-A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: 'SRT 지하연결 육교용 리프트 탑승 -> 지하 4층 -> GTX-A 승강장 전용 수직기 이용' }
    }
  },
  'ogeum': {
    id: 'ogeum', name: '오금역', lines: ['3', '5'], lat: 37.5022, lng: 127.1278,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '1번, 7번 출구', elevatorLocation: '1번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '5호선 고객행복센터 내', locker: '5호선 대합실 안쪽', elevatorLocation: '3번, 5번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘이베이터 -> 지하 대합실 -> 3호선 승강장 직접 연결' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 리프트 탑승' }
    }
  },

  // === 4호선 라인 ===
  'jinjeop': {
    id: 'jinjeop', name: '진접역', lines: ['4'], lat: 37.7170, lng: 127.1855,
    facilities: { '4': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 연결 리프트 탑승' } }
  },
  'byeollae': {
    id: 'byeollae', name: '별내별가람역', lines: ['4'], lat: 37.6677, lng: 127.1287,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '2번 출구 대합실', elevatorLocation: '2번, 4번 출구 외부' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'danggogae': {
    id: 'danggogae', name: '당고개역', lines: ['4'], lat: 37.6702, lng: 127.0792,
    facilities: { '4': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번, 4번 출구 방향', elevatorLocation: '1번, 3번 출구 외부' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 4호선 승강장 직접 연계' } }
  },
  'miasageori': {
    id: 'miasageori', name: '미아사거리역', lines: ['4'], lat: 37.6133, lng: 127.0301,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번, 6번 출구 현대백화점 연결부', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'hyehwa': {
    id: 'hyehwa', name: '혜화역', lines: ['4'], lat: 37.5822, lng: 127.0019,
    facilities: { '4': { toilet: '지하 1층 대합실 중앙 개찰구 외부', nursing: '없음', locker: '1번, 4번 출구 대합실', elevatorLocation: '1번, 4번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'myeongdong': {
    id: 'myeongdong', name: '명동역', lines: ['4'], lat: 37.5609, lng: 126.9863,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번, 10번 출구 통로', elevatorLocation: '1번, 10번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 연결 리프트 탑승' } }
  },
  'hoehyun': {
    id: 'hoehyun', name: '회현역', lines: ['4'], lat: 37.5585, lng: 126.9782,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '5번, 6번 출구 남대문시장 통로', elevatorLocation: '5번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 직접 연결' } }
  },
  'samgakji': {
    id: 'samgakji', name: '삼각지역', lines: ['4', '6'], lat: 37.5345, lng: 126.9729,
    facilities: {
      '4': { toilet: '지하 1층 4호선 개찰구 밖', nursing: '없음', locker: '1번, 14번 출구', elevatorLocation: '11번, 12번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실 내부', nursing: '6호선 안내소 수유방', locker: '6호선 대합실 코너', elevatorLocation: '9번 출구 외부' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '11번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 연결 리프트' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 직접 연결' }
    }
  },
  'ichon': {
    id: 'ichon', name: '이촌역', lines: ['4', 'K'], lat: 37.5222, lng: 126.9734,
    facilities: {
      '4': { toilet: '지하 1층 4호선 개찰구 밖 국립박물관 통로', nursing: '없음', locker: '박물관 지하연결 통로', elevatorLocation: '2번 출구 외부' },
      'K': { toilet: '지하 1층 경의선 개찰구 내부', nursing: '없음', locker: '경의선 대합실 입구', elevatorLocation: '4번 출구 외부' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 연동' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지하 대합실 -> 경의중앙선 승강장 리프트 탑승' }
    }
  },
  'gwacheon-office': {
    id: 'gwacheon-office', name: '정부과천청사역', lines: ['4'], lat: 37.4265, lng: 126.9898,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번, 11번 출구 사이', elevatorLocation: '1번, 6번 출구 외부' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'indeogwon': {
    id: 'indeogwon', name: '인덕원역', lines: ['4'], lat: 37.4012, lng: 126.9767,
    facilities: { '4': { toilet: '지하 1층 대합실 중앙 개찰구 외부', nursing: '없음', locker: '2번, 7번 출구', elevatorLocation: '2번, 6번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'beomgye': {
    id: 'beomgye', name: '범계역', lines: ['4'], lat: 37.3898, lng: 126.9507,
    facilities: { '4': { toilet: '지하 1층 개찰구 내부 롯데백화점 연결구역', nursing: '없음', locker: '4번, 8번 출구 대합실', elevatorLocation: '4번, 7번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지하 대합실 -> 4호선 승강장 연결 리프트' } }
  },
  'sanbon': {
    id: 'sanbon', name: '산본역', lines: ['4'], lat: 37.3582, lng: 126.9332,
    facilities: { '4': { toilet: '지상 2층 개찰구 내부', nursing: '없음', locker: '2번, 3번 출구 방향 상가연결', elevatorLocation: '2번, 3번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 2층 대합실 -> 4호선 승강장 리프트 탑승' } }
  },
  'sangroksu': {
    id: 'sangroksu', name: '상록수역', lines: ['4'], lat: 37.3027, lng: 126.8658,
    facilities: { '4': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번, 2번 출구 맞이방', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 4호선 승강장 무단차 리프트 탑승' } }
  },
  'jungang': {
    id: 'jungang', name: '중앙역', lines: ['4', 'B'], lat: 37.3150, lng: 126.8385,
    facilities: {
      '4': { toilet: '지상 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 통로', elevatorLocation: '1번, 2번 출구 외부' },
      'B': { toilet: '수인분당선 공용 지상 1층', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번 출구 외부' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 4호선 승강장 연결 리프트' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 수인분당선 승강장 연결 리프트' }
    }
  },
  'choji': {
    id: 'choji', name: '초지역', lines: ['4', 'W', 'B'], lat: 37.3195, lng: 126.7997,
    facilities: {
      '4': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번 출구 외부' },
      'W': { toilet: '서해선 지하 대합실 내부', nursing: '없음', locker: '서해선 대합실 안쪽', elevatorLocation: '서해선 전용 외부 엘리베이터' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 4호선 승강장 연결 리프트' },
      'W': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '서해선 외부 엘리베이터 -> 지하 대합실 -> 서해선 승강장 수직기 탑승' }
    }
  },
  'ansan': {
    id: 'ansan', name: '안산역', lines: ['4', 'B'], lat: 37.3270, lng: 126.7885,
    facilities: { '4': { toilet: '지상 1층 개찰구 안', nursing: '없음', locker: '1번, 2번 출구 통로', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 4호선/분당선 공용 승강장 연결 리프트 탑승' } }
  },
  'oido': {
    id: 'oido', name: '오이도역', lines: ['4', 'B'], lat: 37.3624, lng: 126.7387,
    facilities: { '4': { toilet: '지상 2층 대합실 개찰구 밖', nursing: '2층 고객지원실 옆 수유실', locker: '1번 출구 대합실', elevatorLocation: '1번 출구 외부 엘리베이터' } },
    accessible: { '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 대합실 -> 승강장 직접 연결 수직기 탑승' } }
  },

  // === 5호선 라인 ===
  'banghwa': {
    id: 'banghwa', name: '방화역', lines: ['5'], lat: 37.5778, lng: 126.8128,
    facilities: { '5': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구 대합실', elevatorLocation: '1번, 3번 출구 외부' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 리프트 탑승' } }
  },
  'gimpo-airport': {
    id: 'gimpo-airport', name: '김포공항역', lines: ['5', '9', 'A'], lat: 37.5618, lng: 126.8019,
    facilities: {
      '5': { toilet: '지하 1층 개찰구 외부 공용', nursing: '국내선 연결 방향 롯데몰 통로 수유방', locker: '국내선 연결통로 중앙', elevatorLocation: '국내선 연결층 엘리베이터' },
      '9': { toilet: '지하 1층 개찰구 외부 공용', nursing: '없음', locker: '9호선 대합실 안쪽', elevatorLocation: '9호선 승강장 연결' },
      'A': { toilet: '지하 1층 공항철도 대합실', nursing: '공항철도 맞이방 수유실', locker: '공항철도 개찰구 옆', elevatorLocation: '공항철도 승강장 연결' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '롯데몰 지하 연결통로 엘리베이터 -> 지하 대합실 -> 5호선 승강장 리프트 연동' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '환승 층 엘리베이터 -> 9호선/공항철도 평면 및 복합 동선 리프트 무장애 이용 가능' }
    }
  },
  'hwagok': {
    id: 'hwagok', name: '화곡역', lines: ['5'], lat: 37.5416, lng: 126.8404,
    facilities: { '5': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '3번, 8번 출구 대합실', elevatorLocation: '3번, 8번 출구 외부 엘리베이터' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 연결 리프트 탑승' } }
  },
  'mokdong': {
    id: 'mokdong', name: '목동역', lines: ['5'], lat: 37.5258, lng: 126.8647,
    facilities: { '5': { toilet: '지하 1.5층 대합실 내부', nursing: '없음', locker: '1번, 8번 출구 지하', elevatorLocation: '1번, 7번 출구 외부 엘리베이터' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 연결 리프트 탑승' } }
  },
  'ydp-office': {
    id: 'ydp-office', name: '영등포구청역', lines: ['2', '5'], lat: 37.5258, lng: 126.8967,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '1, 6번 출구 연결통로', elevatorLocation: '3번 출구 외부' },
      '5': { toilet: '지하 1층 5호선 개찰구 안쪽', nursing: '없음', locker: '5호선 대합실 중앙', elevatorLocation: '7번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 연결 리프트' },
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 연결 리프트' }
    }
  },
  'yeouido': {
    id: 'yeouido', name: '여의도역', lines: ['5', '9'], lat: 37.5216, lng: 126.9242,
    facilities: {
      '5': { toilet: '지하 1.5층 5호선 개찰구 외부', nursing: '없음', locker: 'IFC몰 지하 연결 통로', elevatorLocation: '5번 출구 IFC 광장 방향' },
      '9': { toilet: '지하 1층 9호선 개찰구 내부', nursing: '없음', locker: '9호선 대합실 안쪽', elevatorLocation: '9호선 3번 출구 외부' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> B1 대합실 -> 5호선 승강장 리프트 탑승' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 9호선 승강장 리프트 탑승' }
    }
  },
  'mapo': {
    id: 'mapo', name: '마포역', lines: ['5'], lat: 37.5398, lng: 126.9460,
    facilities: { '5': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구 대합실', elevatorLocation: '2번, 3번 출구 외부 엘리베이터' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 리프트 탑승' } }
  },
  'gongdeok': {
    id: 'gongdeok', name: '공덕역', lines: ['5', '6', 'K', 'A'], lat: 37.5432, lng: 126.9515,
    facilities: {
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '없음', locker: '5호선 개찰구 근처', elevatorLocation: '2번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실 내부', nursing: '없음', locker: '6호선 개찰구 앞', elevatorLocation: '6번 출구 외부' },
      'K': { toilet: '지상 1층 경의선 맞이방', nursing: '없음', locker: '경의선 대합실 안쪽', elevatorLocation: '10번 출구 외부' },
      'A': { toilet: '지하 1층 공항철도 대합실', nursing: '공항철도 수유방 B1층', locker: '공항철도 게이트 인근', elevatorLocation: '공항철도 전용 외부' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> B1 대합실 -> 5호선 승강장 리프트 탑승' },
      'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '공항철도 외부 엘리베이터 -> B1 대합실 -> B5 공항철도 승강장 연결 초고속 리프트 탑승' }
    }
  },
  'gwanghwamun': {
    id: 'gwanghwamun', name: '광화문역', lines: ['5'], lat: 37.5715, lng: 126.9768,
    facilities: { '5': { toilet: '지하 1층 세종문화회관 연결통로 개찰구 밖', nursing: '5호선 고객안내센터 내 수유지원', locker: '1번, 8번 출구 대합실', elevatorLocation: '8번 출구 앞 외부 엘리베이터' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 외부 엘리베이터 -> 지하 대합실 -> 5호선 승강장 전용 수직 리프트' } }
  },
  'cheonggu': {
    id: 'cheonggu', name: '청구역', lines: ['5', '6'], lat: 37.5602, lng: 127.0153,
    facilities: {
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '5호선 수유방 B1층', locker: '1번 출구 대합실', elevatorLocation: '3번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실', nursing: '없음', locker: '6호선 대합실 코너', elevatorLocation: '3번 출구 외부 공용' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 5호선 승강장 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 6호선 승강장 직접 연결 리프트' }
    }
  },
  'gunja': {
    id: 'gunja', name: '군자역', lines: ['5', '7'], lat: 37.5572, lng: 127.0795,
    facilities: {
      '5': { toilet: '지하 1층 5호선 개찰구 밖', nursing: '없음', locker: '5, 6번 출구 방향', elevatorLocation: '5번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 대합실 안쪽', nursing: '없음', locker: '7, 8번 출구 방향', elevatorLocation: '8번 출구 외부' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> B1 대합실 -> 5호선 승강장 리프트 연동' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> B1 대합실 -> 7호선 승강장 리프트 탑승' }
    }
  },
  'cheonho': {
    id: 'cheonho', name: '천호역', lines: ['5', '8'], lat: 37.5385, lng: 127.1235,
    facilities: {
      '5': { toilet: '지하 1층 5호선 개찰구 밖 현대백화점 연결구역', nursing: '없음', locker: '지하 공영주차장 연결부', elevatorLocation: '3번, 6번 출구 외부' },
      '8': { toilet: '지하 1층 8호선 대합실', nursing: '8호선 안내실 옆 수유실', locker: '8호선 개찰구 인근', elevatorLocation: '9번, 10번 출구 외부' }
    },
    accessible: {
      '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 5호선 승강장 리프트 탑승' },
      '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> B1 대합실 -> 8호선 승강장 리프트 직접 연결' }
    }
  },
  'gangdong': {
    id: 'gangdong', name: '강동역', lines: ['5'], lat: 37.5358, lng: 127.1325,
    facilities: { '5': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구 대합실', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 리프트 탑승' } }
  },
  'hanam': {
    id: 'hanam', name: '하남검단산역', lines: ['5'], lat: 37.5397, lng: 127.2240,
    facilities: { '5': { toilet: '지하 1층 개찰구 밖', nursing: '지하 1층 고객센터 내 수유실', locker: '3번 출구 앞', elevatorLocation: '1번, 3번 출구 외부' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 전용 수직 리프트' } }
  },
  'macheon': {
    id: 'macheon', name: '마천역', lines: ['5'], lat: 37.4949, lng: 127.1528,
    facilities: { '5': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번, 2번 출구 통로', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { '5': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 승강장 무단차 경사 통행로 탑승' } }
  },

  // === 6호선 라인 ===
  'eungam': {
    id: 'eungam', name: '응암역', lines: ['6'], lat: 37.5986, lng: 126.9155,
    facilities: { '6': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 4번 출구 대합실', elevatorLocation: '1번, 4번 출구 외부 엘리베이터' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 직접 연결 리프트' } }
  },
  'dmc': {
    id: 'dmc', name: '디지털미디어시티역', lines: ['6', 'K', 'A'], lat: 37.5767, lng: 126.8990,
    facilities: {
      '6': { toilet: '지하 1층 6호선 개찰구 밖', nursing: '없음', locker: '3번, 4번 출구', elevatorLocation: '3번 출구 외부' },
      'K': { toilet: '지상 1층 경의선 맞이방', nursing: '없음', locker: '경의선 출구 복도', elevatorLocation: '경의선 6번 출구 외부' },
      'A': { toilet: '지하 1층 공항철도 대합실 안쪽', nursing: '공항철도 수유실 B1층', locker: '공항철도 개찰구 옆', elevatorLocation: '8번, 9번 출구 외부' }
    },
    accessible: {
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트' },
      'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 공항철도 대합실 -> 공항철도 승강장 연결 리프트' }
    }
  },
  'mangwon': {
    id: 'mangwon', name: '망원역', lines: ['6'], lat: 37.5560, lng: 126.9100,
    facilities: { '6': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번 출구 외부 엘리베이터' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 연결 리프트 탑승' } }
  },
  'dongmyo': {
    id: 'dongmyo', name: '동묘앞역', lines: ['1', '6'], lat: 37.5732, lng: 127.0165,
    facilities: {
      '1': { toilet: '지하 1층 1호선 개찰구 외부', nursing: '없음', locker: '2번, 3번 출구 통로', elevatorLocation: '2번, 3번 출구 외부' },
      '6': { toilet: '지하 1층 6호선 대합실 내부', nursing: '없음', locker: '6호선 개찰구 인근', elevatorLocation: '10번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 1호선 승강장 리프트 탑승' },
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '10번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트 직접 연결' }
    }
  },
  'korea-univ': {
    id: 'korea-univ', name: '고려대역', lines: ['6'], lat: 37.5904, lng: 127.0361,
    facilities: { '6': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 방향', elevatorLocation: '1번, 3번 출구 외부' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 연결 리프트 탑승' } }
  },
  'seokgye6': {
    id: 'seokgye6', name: '석계역(6)', lines: ['6'], lat: 37.6150, lng: 127.0658,
    facilities: { '6': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '6번 출구 방향', elevatorLocation: '6번 출구 외부 엘리베이터' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트' } }
  },
  'bonghwasan': {
    id: 'bonghwasan', name: '봉화산역', lines: ['6'], lat: 37.6171, lng: 127.0911,
    facilities: { '6': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '3번 출구 앞', elevatorLocation: '1번, 4번 출구 외부' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 직접 연결 리프트' } }
  },
  'sinnae': {
    id: 'sinnae', name: '신내역', lines: ['6'], lat: 37.6128, lng: 127.1032,
    facilities: { '6': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번 출구 지상 외부' } },
    accessible: { '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 지상 엘리베이터 -> 2층 6호선 승강장 평면 연결' } }
  },

  // === 7호선 라인 ===
  '장암': {
    id: 'jangam', name: '장암역', lines: ['7'], lat: 37.7001, lng: 127.0531,
    facilities: { '7': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '평면 개찰구 및 경사로 제공' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 단독 역사 구조로 휠체어 단차 장애 없이 7호선 단선식 승강장 바로 진입 가능' } }
  },
  'nowon7': {
    id: 'nowon7', name: '노원역(7)', lines: ['7'], lat: 37.6542, lng: 127.0608,
    facilities: { '7': { toilet: '지하 1층 개찰구 외부', nursing: '7호선 고객센터 옆 수유방', locker: '5번 출구 대합실', elevatorLocation: '5번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 외부 엘리베이터 -> 지하 대합실 -> 7호선 승강장 연결 리프트' } }
  },
  'taereung': {
    id: 'taereung', name: '태릉입구역', lines: ['6', '7'], lat: 37.6180, lng: 127.0780,
    facilities: {
      '6': { toilet: '지하 1층 6호선 개찰구 밖', nursing: '없음', locker: '6호선 대합실 중앙', elevatorLocation: '6번, 7번 출구 외부' },
      '7': { toilet: '지하 1.5층 7호선 개찰구 안쪽', nursing: '7호선 고객행복센터 내', locker: '7호선 대합실 안쪽', elevatorLocation: '3번, 4번 출구 외부' }
    },
    accessible: {
      '6': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 6호선 승강장 리프트' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 리프트 탑승' }
    }
  },
  'sangbong': {
    id: 'sangbong', name: '상봉역', lines: ['7', 'K'], lat: 37.5960, lng: 127.0850,
    facilities: {
      '7': { toilet: '지하 1층 7호선 개찰구 밖', nursing: '없음', locker: '2번, 3번 출구 대합실', elevatorLocation: '1번, 8번 출구 외부' },
      'K': { toilet: '지상 1층 경의중앙선 맞이방', nursing: '없음', locker: '경의선 대합실 입구', elevatorLocation: '경의선 전용 지상 외부' }
    },
    accessible: {
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 리프트' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '경의선 외부 엘리베이터 -> 지상 2층 경의선 승강장 연결 리프트 탑승' }
    }
  },
  'sangdo': {
    id: 'sangdo', name: '상도역', lines: ['7'], lat: 37.5028, lng: 126.9479,
    facilities: { '7': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번, 5번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 연결 리프트 탑승' } }
  },
  'boramae': {
    id: 'boramae', name: '보라매역', lines: ['7'], lat: 37.4988, lng: 126.9197,
    facilities: { '7': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '2번, 6번 출구 방향', elevatorLocation: '2번, 6번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 연결 리프트 탑승' } }
  },
  'daelim7': {
    id: 'daelim7', name: '대림역(7)', lines: ['7'], lat: 37.4930, lng: 126.8950,
    facilities: { '7': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '10번, 11번 출구 대합실', elevatorLocation: '10번, 11번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '10번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 수직기 탑승' } }
  },
  'sinpung': {
    id: 'sinpung', name: '신풍역', lines: ['7'], lat: 37.5001, lng: 126.9097,
    facilities: { '7': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '1번, 6번 출구 대합실', elevatorLocation: '1번, 5번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 리프트 탑승' } }
  },
  'onsu': {
    id: 'onsu', name: '온수역', lines: ['1', '7'], lat: 37.4922, lng: 126.8236,
    facilities: {
      '1': { toilet: '지상 2층 1호선 맞이방', nursing: '없음', locker: '1번, 3번 출구 방향', elevatorLocation: '3번 출구 외부' },
      '7': { toilet: '지하 1층 7호선 개찰구 밖', nursing: '7호선 고객안내센터 내', locker: '7호선 대합실 안쪽', elevatorLocation: '5번 출구 외부' }
    },
    accessible: {
      '1': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 2층 대합실 -> 1호선 승강장 리프트 연동' },
      '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 리프트 탑승' }
    }
  },
  'bupyeong-office': {
    id: 'bupyeong-office', name: '부평구청역', lines: ['7'], lat: 37.5085, lng: 126.7207,
    facilities: { '7': { toilet: '지하 1층 개찰구 내부', nursing: '7호선 안내실 내부 수유실', locker: '3번, 6번 출구 대합실', elevatorLocation: '3번, 7번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 리프트 탑승' } }
  },
  'seoknam': {
    id: 'seoknam', name: '석남역', lines: ['7'], lat: 37.5065, lng: 126.6761,
    facilities: { '7': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '7': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 7호선 승강장 연결 리프트' } }
  },

  // === 8호선 라인 ===
  'byeollae8': {
    id: 'byeollae8', name: '별내역', lines: ['8'], lat: 37.6433, lng: 127.1268,
    facilities: { '8': { toilet: '지하 1층 개찰구 밖', nursing: '지하 1층 고객안내센터 옆', locker: '1번 출구 앞', elevatorLocation: '2번 출구 외부 엘리베이터' } },
    accessible: { '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 8호선 승강장 연결 리프트' } }
  },
  'guri': {
    id: 'guri', name: '구리역', lines: ['8', 'K'], lat: 37.6033, lng: 127.1432,
    facilities: {
      '8': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '8호선 대합실 안쪽', elevatorLocation: '2번 출구 외부' },
      'K': { toilet: '지상 2층 경의중앙선 맞이방', nursing: '경의중앙선 안내실 내', locker: '1번 출구 롯데백화점 통로', elevatorLocation: '1번 출구 외부' }
    },
    accessible: {
      '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 8호선 승강장 리프트' },
      'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 경의중앙선 승강장 리프트 탑승' }
    }
  },
  'amsa': {
    id: 'amsa', name: '암사역', lines: ['8'], lat: 37.5502, lng: 127.1278,
    facilities: { '8': { toilet: '지하 1층 개찰구 내부', nursing: '고객안내센터 내 수유지원', locker: '1번, 4번 출구 대합실', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 8호선 승강장 연결 리프트 탑승' } }
  },
  'bokjeong': {
    id: 'bokjeong', name: '복정역', lines: ['8', 'B'], lat: 37.4709, lng: 127.1265,
    facilities: {
      '8': { toilet: '지하 1층 개찰구 외부 공용', nursing: '지하 1층 대합실 수유방', locker: '2번, 3번 출구 방향', elevatorLocation: '2번 출구 외부' },
      'B': { toilet: '수인분당선 지하 개찰구 외부 공용', nursing: '없음', locker: '분당선 대합실 안쪽', elevatorLocation: '1번 출구 외부' }
    },
    accessible: {
      '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> B1 대합실 -> 8호선 승강장 리프트 탑승' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> B1 대합실 -> 분당선 승강장 리프트 탑승' }
    }
  },
  'sanseong': {
    id: 'sanseong', name: '산성역', lines: ['8'], lat: 37.4571, lng: 127.1498,
    facilities: { '8': { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 1층 -> 지하 3층 대합실 -> 승강장 리프트 연계' } }
  },
  'moran': {
    id: 'moran', name: '모란역', lines: ['8', 'B'], lat: 37.4321, lng: 127.1290,
    facilities: {
      '8': { toilet: '지하 1층 8호선 개찰구 밖', nursing: '8호선 고객지원실 내 수유방', locker: '8호선 3번, 4번 출구 지하', elevatorLocation: '4번 출구 외부' },
      'B': { toilet: '지하 1층 분당선 개찰구 안쪽', nursing: '없음', locker: '분당선 대합실 중앙', elevatorLocation: '11번, 12번 출구 외부' }
    },
    accessible: {
      '8': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '4번 출구 엘리베이터 -> 지하 대합실 -> 8호선 승강장 리프트 탑승' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '11번 출구 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 연결 리프트' }
    }
  },

  // === 9호선 라인 ===
  'gaehwa': {
    id: 'gaehwa', name: '개화역', lines: ['9'], lat: 37.5786, lng: 126.7981,
    facilities: { '9': { toilet: '지상 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번 출구 외부 경사로' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 단독역사 구조로 휠체어 단차 없는 개찰구 경사로 진입 및 승강장 직접 연결' } }
  },
  'dangsan': {
    id: 'dangsan', name: '당산역', lines: ['2', '9'], lat: 37.5348, lng: 126.9027,
    facilities: {
      '2': { toilet: '지상 2층 2호선 대합실 내부', nursing: '없음', locker: '1번, 4번 출구 방향', elevatorLocation: '1번, 3번 출구 외부' },
      '9': { toilet: '지하 1층 9호선 개찰구 외부', nursing: '9호선 수유방 B1층', locker: '9호선 대합실 코너', elevatorLocation: '10번, 13번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 대합실 -> 2호선 지상 승강장 연결' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '13번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 연결 수직기 탑승' }
    }
  },
  'assembly': {
    id: 'assembly', name: '국회의사당역', lines: ['9'], lat: 37.5281, lng: 126.9178,
    facilities: { '9': { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '2번, 5번 출구 대합실', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 직접 연결 리프트' } }
  },
  'saetgang': {
    id: 'saetgang', name: '샛강역', lines: ['9'], lat: 37.5172, lng: 126.9284,
    facilities: { '9': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번, 4번 출구 외부' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 연결 리프트 탑승' } }
  },
  'noryangjin9': {
    id: 'noryangjin9', name: '노량진역(9)', lines: ['9'], lat: 37.5142, lng: 126.9427,
    facilities: { '9': { toilet: '지하 1층 개찰구 외부', nursing: '9호선 고객센터 옆 수유실', locker: '3번, 8번 출구 지하', elevatorLocation: '3번, 8번 출구 외부 엘리베이터' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 직접 리프트' } }
  },
  'dongjak': {
    id: 'dongjak', name: '동작역', lines: ['4', '9'], lat: 37.5029, lng: 126.9798,
    facilities: {
      '4': { toilet: '지상 2층 4호선 개찰구 밖', nursing: '없음', locker: '1번 출구 현충원 방향', elevatorLocation: '1번 출구 외부' },
      '9': { toilet: '지하 1층 9호선 개찰구 밖', nursing: '9호선 수유방 B1층', locker: '9호선 대합실 안쪽', elevatorLocation: '9번 출구 외부' }
    },
    accessible: {
      '4': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 2층 대합실 -> 4호선 승강장 수직 리프트' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 직접 리프트 연동' }
    }
  },
  'sinnonhyeon': {
    id: 'sinnonhyeon', name: '신논현역', lines: ['9'], lat: 37.5045, lng: 127.0255,
    facilities: { '9': { toilet: '지하 1층 개찰구 밖 지하상가 통로', nursing: '없음', locker: '4번, 5번 출구 대합실', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 연결 리프트 탑승' } }
  },
  'sports-complex': {
    id: 'sports-complex', name: '종합운동장역', lines: ['2', '9'], lat: 37.5109, lng: 127.0722,
    facilities: {
      '2': { toilet: '지하 1층 2호선 개찰구 밖', nursing: '없음', locker: '2번 출구 야구장 방향', elevatorLocation: '2번, 5번 출구 외부' },
      '9': { toilet: '지하 1층 9호선 개찰구 밖', nursing: '9호선 수유실 B1층', locker: '9호선 대합실 중앙', elevatorLocation: '9번 출구 외부' }
    },
    accessible: {
      '2': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 2호선 승강장 리프트' },
      '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 직접 리프트 탑승' }
    }
  },
  'bohun-hospital': {
    id: 'bohun-hospital', name: '중앙보훈병원역', lines: ['9'], lat: 37.5222, lng: 127.1481,
    facilities: { '9': { toilet: '지하 1층 개찰구 내부', nursing: '지하 1층 안내센터 옆 수유실', locker: '1번, 3번 출구 통로', elevatorLocation: '1번, 2번 출구 병원 연결 통로' } },
    accessible: { '9': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 9호선 승강장 연결 리프트 탑승' } }
  },

  // === 신분당선 라인 (S) ===
  'sinsa': {
    id: 'sinsa', name: '신사역', lines: ['3', 'S'], lat: 37.5164, lng: 127.0205,
    facilities: {
      '3': { toilet: '지하 1층 3호선 개찰구 밖', nursing: '없음', locker: '4번, 8번 출구 대합실', elevatorLocation: '3번, 6번 출구 외부' },
      'S': { toilet: '신분당선 지하 B1층 개찰구 내부', nursing: '신분당선 수유방 B1층', locker: '신분당선 환승통로', elevatorLocation: '1번, 4번 출구 외부' }
    },
    accessible: {
      '3': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> B1 대합실 -> 3호선 승강장 리프트 탑승' },
      'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 신분당선 대합실 -> 신분당선 승강장 직접 연결' }
    }
  },
  'pangyo': {
    id: 'pangyo', name: '판교역', lines: ['S'], lat: 37.3948, lng: 127.1112,
    facilities: { 'S': { toilet: '지하 1층 개찰구 밖', nursing: '지하 1층 안내소 내 수유방', locker: '3번 출구 방향 현대백화점 연결구역', elevatorLocation: '1번, 4번 출구 외부 엘리베이터' } },
    accessible: { 'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 신분당선 승강장 전용 수직 리프트' } }
  },
  'jeongja': {
    id: 'jeongja', name: '정자역', lines: ['S', 'B'], lat: 37.3664, lng: 127.1084,
    facilities: {
      'S': { toilet: '신분당선 지하 개찰구 안쪽 B1층', nursing: '신분당선 고객지원실 내', locker: '신분당선 대합실 서단', elevatorLocation: '5번, 6번 출구 외부' },
      'B': { toilet: '분당선 지하 개찰구 밖', nursing: '없음', locker: '분당선 3번, 4번 출구', elevatorLocation: '2번, 3번 출구 외부' }
    },
    accessible: {
      'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 신분당선 승강장 리프트 탑승' },
      'B': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 -> 지하 대합실 -> 수인분당선 승강장 연결 리프트' }
    }
  },
  'dongcheon': {
    id: 'dongcheon', name: '동천역', lines: ['S'], lat: 37.3378, lng: 127.1032,
    facilities: { 'S': { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번, 3번 출구 외부 엘리베이터' } },
    accessible: { 'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 대합실 -> 신분당선 승강장 리프트 탑승' } }
  },
  'gwanggyo': {
    id: 'gwanggyo', name: '광교역', lines: ['S'], lat: 37.2996, lng: 127.0463,
    facilities: { 'S': { toilet: '지상 1층 개찰구 내부', nursing: '지상 1층 고객안내센터 내 수유방', locker: '1번 출구 대합실', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { 'S': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 신분당선 승강장 직접 연결' } }
  },

  // === 경의중앙선 라인 (K) ===
  'yangpyeong': {
    id: 'yangpyeong', name: '양평역', lines: ['K'], lat: 37.4928, lng: 127.4875,
    facilities: { 'K': { toilet: '지상 2층 맞이방 개찰구 옆', nursing: '없음', locker: '1번 출구 앞', elevatorLocation: '1번, 2번 출구 외부 엘리베이터' } },
    accessible: { 'K': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 맞이방 -> 경의중앙선 승강장 연결 리프트 탑승' } }
  },

  // === 공항철도 라인 (A) ===
  'unseo': {
    id: 'unseo', name: '운서역', lines: ['A'], lat: 37.4929, lng: 126.4938,
    facilities: { 'A': { toilet: '지상 1층 개찰구 밖', nursing: '없음', locker: '1번, 2번 출구 대합실', elevatorLocation: '1번, 2번 출구 외부' } },
    accessible: { 'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지상 2층 승강장 연결 리프트 탑승' } }
  },
  'incheon-airport': {
    id: 'incheon-airport', name: '인천공항1터미널역', lines: ['A'], lat: 37.4475, lng: 126.4525,
    facilities: { 'A': { toilet: 'B1층 교통센터 중앙 개찰구 외부', nursing: '여객터미널 동편 교통센터 수유센터', locker: '교통센터 매표소 인근', elevatorLocation: '교통센터 무단차 리프트 완비' } },
    accessible: { 'A': { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '교통센터에서 단차 없는 경사 무빙워크 및 엘리베이터를 통해 승강장까지 100% 무장애 이동' } }
  }
};

// 92개 역사 간의 노선별 연결 폴리라인 링크 (실지도 궤적 기반)
export const links = [
  // GTX-A 노선 링크
  { source: 'unjeong', target: 'kintex', line: 'GTX-A', weight: 4, accessible: true },
  { source: 'kintex', target: 'yeonsinnae', line: 'GTX-A', weight: 8, accessible: true },
  { source: 'yeonsinnae', target: 'seoul', line: 'GTX-A', weight: 4, accessible: true },
  { source: 'seoul', target: 'suseo', line: 'GTX-A', weight: 6, accessible: true },
  { source: 'suseo', target: 'seongnam', line: 'GTX-A', weight: 3, accessible: true },
  { source: 'seongnam', target: 'guseong', line: 'GTX-A', weight: 5, accessible: true },
  { source: 'guseong', target: 'dongtan', line: 'GTX-A', weight: 4, accessible: true },

  // 1호선 경원/경인/경부 라인 링크
  { source: 'soyosan', target: 'dongducheon', line: '1', weight: 4, accessible: true },
  { source: 'dongducheon', target: 'uijeongbu', line: '1', weight: 12, accessible: true },
  { source: 'uijeongbu', target: 'dobongsan', line: '1', weight: 6, accessible: true },
  { source: 'dobongsan', target: 'changdong', line: '1', weight: 5, accessible: true },
  { source: 'changdong', target: 'seokgye', line: '1', weight: 4, accessible: true },
  { source: 'seokgye', target: 'cheongnyangni', line: '1', weight: 6, accessible: true },
  { source: 'cheongnyangni', target: 'dongdaemun', line: '1', weight: 5, accessible: true },
  { source: 'dongdaemun', target: 'jongno3', line: '1', weight: 3, accessible: false }, // 종로3가역 내 환승통로 휠체어 단절
  { source: 'jongno3', target: 'city-hall', line: '1', weight: 3, accessible: true },
  { source: 'city-hall', target: 'seoul', line: '1', weight: 2, accessible: true },
  { source: 'seoul', target: 'namyeong', line: '1', weight: 2, accessible: true },
  { source: 'namyeong', target: '용산', line: '1', weight: 2, accessible: true },
  { source: '용산', target: 'noryangjin', line: '1', weight: 3, accessible: true },
  { source: 'noryangjin', target: 'singil', line: '1', weight: 2, accessible: true },
  { source: 'singil', target: 'sindorim', line: '1', weight: 3, accessible: true },
  { source: 'sindorim', target: 'guro', line: '1', weight: 2, accessible: true },

  // 경인선 분기
  { source: 'guro', target: 'yeokgok', line: '1', weight: 5, accessible: true },
  { source: 'yeokgok', target: 'bucheon', line: '1', weight: 3, accessible: true },
  { source: 'bucheon', target: 'songnae', line: '1', weight: 4, accessible: true },
  { source: 'songnae', target: 'bupyeong', line: '1', weight: 3, accessible: true },
  { source: 'bupyeong', target: 'juan', line: '1', weight: 6, accessible: true },
  { source: 'juan', target: 'dongincheon', line: '1', weight: 5, accessible: true },
  { source: 'dongincheon', target: 'incheon', line: '1', weight: 2, accessible: true },

  // 경부선 분기
  { source: 'guro', target: 'gasan', line: '1', weight: 3, accessible: true },
  { source: 'gasan', target: 'geumcheon-office', line: '1', weight: 4, accessible: true },
  { source: 'geumcheon-office', target: 'anyang', line: '1', weight: 6, accessible: true },
  { source: 'anyang', target: 'geumjeong', line: '1', weight: 4, accessible: true },
  { source: 'geumjeong', target: 'uiwang', line: '1', weight: 5, accessible: true },
  { source: 'uiwang', target: 'suwon', line: '1', weight: 6, accessible: true },
  { source: 'suwon', target: 'byeongjeom', line: '1', weight: 6, accessible: true },
  { source: 'byeongjeom', target: 'osan', line: '1', weight: 6, accessible: true },
  { source: 'osan', target: 'seojeongri', line: '1', weight: 8, accessible: true },
  { source: 'seojeongri', target: 'pyyeongtaek', line: '1', weight: 7, accessible: true },
  { source: 'pyyeongtaek', target: 'cheonan', line: '1', weight: 14, accessible: true },
  { source: 'cheonan', target: 'sinchang', line: '1', weight: 12, accessible: true },

  // 2호선 순환 라인 링크
  { source: 'city-hall', target: 'euljiro-ipgu', line: '2', weight: 2, accessible: true },
  { source: 'euljiro-ipgu', target: 'euljiro3', line: '2', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'euljiro4', line: '2', weight: 2, accessible: true },
  { source: 'euljiro4', target: 'ddp', line: '2', weight: 2, accessible: true },
  { source: 'ddp', target: 'sindang', line: '2', weight: 2, accessible: true },
  { source: 'sindang', target: 'wangsimni', line: '2', weight: 3, accessible: true },
  { source: 'wangsimni', target: 'seongsu', line: '2', weight: 4, accessible: true },
  { source: 'seongsu', target: 'konkuk', line: '2', weight: 2, accessible: true },
  { source: 'konkuk', target: 'jamsil', line: '2', weight: 6, accessible: true },
  { source: 'jamsil', target: 'sports-complex', line: '2', weight: 3, accessible: true },
  { source: 'sports-complex', target: 'samseong', line: '2', weight: 2, accessible: true },
  { source: 'samseong', target: 'seolleung', line: '2', weight: 2, accessible: true },
  { source: 'seolleung', target: 'gangnam', line: '2', weight: 3, accessible: true },
  { source: 'gangnam', target: 'gyodae', line: '2', weight: 2, accessible: true },
  { source: 'gyodae', target: 'seocho', line: '2', weight: 2, accessible: true },
  { source: 'seocho', target: 'sadang', line: '2', weight: 6, accessible: true },
  { source: 'sadang', target: 'sillim', line: '2', weight: 6, accessible: true },
  { source: 'sillim', target: 'daelim', line: '2', weight: 5, accessible: true },
  { source: 'daelim', target: 'sindorim', line: '2', weight: 3, accessible: true },
  { source: 'sindorim', target: 'ydp-office', line: '2', weight: 4, accessible: true },
  { source: 'ydp-office', target: 'dangsan', line: '2', weight: 3, accessible: true },
  { source: 'dangsan', target: 'hapjeong', line: '2', weight: 3, accessible: true },
  { source: 'hapjeong', target: 'hongik', line: '2', weight: 2, accessible: true },
  { source: 'hongik', target: 'sinchon', line: '2', weight: 2, accessible: true },
  { source: 'sinchon', target: 'chungjeongro', line: '2', weight: 3, accessible: true },
  { source: 'chungjeongro', target: 'city-hall', line: '2', weight: 2, accessible: true },

  // 3호선 라인 링크
  { source: 'daehwa', target: 'jeongbalsan', line: '3', weight: 3, accessible: true },
  { source: 'jeongbalsan', target: 'baekseok', line: '3', weight: 4, accessible: true },
  { source: 'baekseok', target: 'wondang', line: '3', weight: 6, accessible: true },
  { source: 'wondang', target: 'jichuk', line: '3', weight: 7, accessible: true },
  { source: 'jichuk', target: 'gupabal', line: '3', weight: 2, accessible: true },
  { source: 'gupabal', target: 'yeonsinnae', line: '3', weight: 2, accessible: true },
  { source: 'yeonsinnae', target: 'gyeongbokgung', line: '3', weight: 8, accessible: true },
  { source: 'gyeongbokgung', target: 'anguk', line: '3', weight: 2, accessible: true },
  { source: 'anguk', target: 'jongno3', line: '3', weight: 2, accessible: true },
  { source: 'jongno3', target: 'euljiro3', line: '3', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'chungmuro', line: '3', weight: 2, accessible: true },
  { source: 'chungmuro', target: 'yaksu', line: '3', weight: 3, accessible: true },
  { source: 'yaksu', target: 'oksu', line: '3', weight: 2, accessible: true },
  { source: 'oksu', target: 'apgujeong', line: '3', weight: 3, accessible: true },
  { source: 'apgujeong', target: 'express-bus', line: '3', weight: 4, accessible: true },
  { source: 'express-bus', target: 'gyodae', line: '3', weight: 3, accessible: true },
  { source: 'gyodae', target: 'yangjae', line: '3', weight: 3, accessible: true },
  { source: 'yangjae', target: 'dogok', line: '3', weight: 3, accessible: true },
  { source: 'dogok', target: 'suseo', line: '3', weight: 6, accessible: true },
  { source: 'suseo', target: 'ogeum', line: '3', weight: 4, accessible: true },

  // 4호선 라인 링크
  { source: 'jinjeop', target: 'byeollae', line: '4', weight: 6, accessible: true },
  { source: 'byeollae', target: 'danggogae', line: '4', weight: 7, accessible: true },
  { source: 'danggogae', target: 'nowon', line: '4', weight: 3, accessible: true },
  { source: 'nowon', target: 'changdong', line: '4', weight: 2, accessible: true },
  { source: 'changdong', target: 'miasageori', line: '4', weight: 7, accessible: true },
  { source: 'miasageori', target: 'hyehwa', line: '4', weight: 6, accessible: true },
  { source: 'hyehwa', target: 'dongdaemun', line: '4', weight: 3, accessible: true },
  { source: 'dongdaemun', target: 'ddp', line: '4', weight: 2, accessible: true },
  { source: 'ddp', target: 'chungmuro', line: '4', weight: 2, accessible: true },
  { source: 'chungmuro', target: 'myeongdong', line: '4', weight: 2, accessible: true },
  { source: 'myeongdong', target: 'hoehyun', line: '4', weight: 2, accessible: true },
  { source: 'hoehyun', target: 'seoul', line: '4', weight: 2, accessible: true },
  { source: 'seoul', target: 'samgakji', line: '4', weight: 4, accessible: true },
  { source: 'samgakji', target: 'ichon', line: '4', weight: 3, accessible: true },
  { source: 'ichon', target: 'dongjak', line: '4', weight: 4, accessible: true },
  { source: 'dongjak', target: 'sadang', line: '4', weight: 4, accessible: true },
  { source: 'sadang', target: 'gwacheon-office', line: '4', weight: 10, accessible: true },
  { source: 'gwacheon-office', target: 'indeogwon', line: '4', weight: 4, accessible: true },
  { source: 'indeogwon', target: 'beomgye', line: '4', weight: 4, accessible: true },
  { source: 'beomgye', target: 'geumjeong', line: '4', weight: 3, accessible: true },
  { source: 'geumjeong', target: 'sanbon', line: '4', weight: 3, accessible: true },
  { source: 'sanbon', target: 'sangroksu', line: '4', weight: 7, accessible: true },
  { source: 'sangroksu', target: 'jungang', line: '4', weight: 4, accessible: true },
  { source: 'jungang', target: 'choji', line: '4', weight: 3, accessible: true },
  { source: 'choji', target: 'ansan', line: '4', weight: 2, accessible: true },
  { source: 'ansan', target: 'oido', line: '4', weight: 8, accessible: true },

  // 5호선 라인 링크
  { source: 'banghwa', target: 'gimpo-airport', line: '5', weight: 4, accessible: true },
  { source: 'gimpo-airport', target: 'hwagok', line: '5', weight: 6, accessible: true },
  { source: 'hwagok', target: 'mokdong', line: '5', weight: 5, accessible: true },
  { source: 'mokdong', target: 'ydp-office', line: '5', weight: 5, accessible: true },
  { source: 'ydp-office', target: 'singil', line: '5', weight: 2, accessible: true },
  { source: 'singil', target: 'yeouido', line: '5', weight: 2, accessible: true },
  { source: 'yeouido', target: 'mapo', line: '5', weight: 3, accessible: true },
  { source: 'mapo', target: 'gongdeok', line: '5', weight: 2, accessible: true },
  { source: 'gongdeok', target: 'chungjeongro', line: '5', weight: 3, accessible: true },
  { source: 'chungjeongro', target: 'gwanghwamun', line: '5', weight: 3, accessible: true },
  { source: 'gwanghwamun', target: 'jongno3', line: '5', weight: 2, accessible: false },
  { source: 'jongno3', target: 'euljiro4', line: '5', weight: 2, accessible: false },
  { source: 'euljiro4', target: 'ddp', line: '5', weight: 2, accessible: true },
  { source: 'ddp', target: 'cheonggu', line: '5', weight: 2, accessible: true },
  { source: 'cheonggu', target: 'wangsimni', line: '5', weight: 4, accessible: true },
  { source: 'wangsimni', target: 'gunja', line: '5', weight: 5, accessible: true },
  { source: 'gunja', target: 'cheonho', line: '5', weight: 4, accessible: true },
  { source: 'cheonho', target: 'gangdong', line: '5', weight: 2, accessible: true },
  { source: 'gangdong', target: 'hanam', line: '5', weight: 14, accessible: true },
  { source: 'gangdong', target: 'macheon', line: '5', weight: 8, accessible: true },

  // 6호선 라인 링크
  { source: 'eungam', target: 'yeonsinnae', line: '6', weight: 3, accessible: true },
  { source: 'yeonsinnae', target: 'dmc', line: '6', weight: 6, accessible: true },
  { source: 'dmc', target: 'mangwon', line: '6', weight: 4, accessible: true },
  { source: 'mangwon', target: 'hapjeong', line: '6', weight: 2, accessible: true },
  { source: 'hapjeong', target: 'gongdeok', line: '6', weight: 6, accessible: true },
  { source: 'gongdeok', target: 'samgakji', line: '6', weight: 4, accessible: true },
  { source: 'samgakji', target: 'yaksu', line: '6', weight: 6, accessible: true },
  { source: 'yaksu', target: 'cheonggu', line: '6', weight: 2, accessible: true },
  { source: 'cheonggu', target: 'sindang', line: '6', weight: 2, accessible: true },
  { source: 'sindang', target: 'dongmyo', line: '6', weight: 2, accessible: true },
  { source: 'dongmyo', target: 'korea-univ', line: '6', weight: 4, accessible: true },
  { source: 'korea-univ', target: 'seokgye6', line: '6', weight: 5, accessible: true },
  { source: 'seokgye6', target: 'taereung', line: '6', weight: 2, accessible: true },
  { source: 'taereung', target: 'bonghwasan', line: '6', weight: 3, accessible: true },
  { source: 'bonghwasan', target: 'sinnae', line: '6', weight: 2, accessible: true },

  // 7호선 라인 링크
  { source: 'jangam', target: 'dobongsan', line: '7', weight: 3, accessible: true },
  { source: 'dobongsan', target: 'nowon7', line: '7', weight: 4, accessible: true },
  { source: 'nowon7', target: 'taereung', line: '7', weight: 5, accessible: true },
  { source: 'taereung', target: 'sangbong', line: '7', weight: 3, accessible: true },
  { source: 'sangbong', target: 'gunja', line: '7', weight: 8, accessible: true },
  { source: 'gunja', target: 'konkuk', line: '7', weight: 4, accessible: true },
  { source: 'konkuk', target: 'express-bus', line: '7', weight: 14, accessible: true },
  { source: 'express-bus', target: 'sangdo', line: '7', weight: 8, accessible: true },
  { source: 'sangdo', target: 'boramae', line: '7', weight: 5, accessible: true },
  { source: 'boramae', target: 'sinpung', line: '7', weight: 2, accessible: true },
  { source: 'sinpung', target: 'daelim7', line: '7', weight: 2, accessible: true },
  { source: 'daelim7', target: 'gasan', line: '7', weight: 3, accessible: true },
  { source: 'gasan', target: 'onsu', line: '7', weight: 10, accessible: true },
  { source: 'onsu', target: 'bupyeong-office', line: '7', weight: 12, accessible: true },
  { source: 'bupyeong-office', target: 'seoknam', line: '7', weight: 4, accessible: true },

  // 8호선 라인 링크
  { source: 'byeollae8', target: 'guri', line: '8', weight: 5, accessible: true },
  { source: 'guri', target: 'amsa', line: '8', weight: 8, accessible: true },
  { source: 'amsa', target: '천호', line: '8', weight: 2, accessible: true },
  { source: '천호', target: 'jamsil', line: '8', weight: 6, accessible: true },
  { source: 'jamsil', target: 'bokjeong', line: '8', weight: 10, accessible: true },
  { source: 'bokjeong', target: 'sanseong', line: '8', weight: 3, accessible: true },
  { source: 'sanseong', target: 'moran', line: '8', weight: 10, accessible: true },

  // 9호선 라인 링크
  { source: 'geahwa', target: 'gimpo-airport', line: '9', weight: 4, accessible: true },
  { source: 'gimpo-airport', target: 'dangsan', line: '9', weight: 14, accessible: true },
  { source: 'dangsan', target: 'assembly', line: '9', weight: 2, accessible: true },
  { source: 'assembly', target: 'yeouido', line: '9', weight: 2, accessible: true },
  { source: 'yeouido', target: 'saetgang', line: '9', weight: 2, accessible: true },
  { source: 'saetgang', target: 'noryangjin9', line: '9', weight: 2, accessible: true },
  { source: 'noryangjin9', target: 'dongjak', line: '9', weight: 4, accessible: true },
  { source: 'dongjak', target: 'express-bus', line: '9', weight: 3, accessible: true },
  { source: 'express-bus', target: 'sinnonhyeon', line: '9', weight: 4, accessible: true },
  { source: 'sinnonhyeon', target: 'sports-complex', line: '9', weight: 8, accessible: true },
  { source: 'sports-complex', target: 'bohun-hospital', line: '9', weight: 12, accessible: true },

  // 신분당선 라인 링크
  { source: 'sinsa', target: 'gangnam', line: 'S', weight: 4, accessible: true },
  { source: 'gangnam', target: 'yangjae', line: 'S', weight: 2, accessible: true },
  { source: 'yangjae', target: 'pangyo', line: 'S', weight: 8, accessible: true },
  { source: 'pangyo', target: 'jeongja', line: 'S', weight: 3, accessible: true },
  { source: 'jeongja', target: 'dongcheon', line: 'S', weight: 4, accessible: true },
  { source: 'dongcheon', target: 'gwanggyo', line: 'S', weight: 12, accessible: true },

  // 수인분당선 라인 링크
  { source: 'cheongnyangni', target: 'wangsimni', line: 'B', weight: 3, accessible: true },
  { source: 'wangsimni', target: 'suseo', line: 'B', weight: 18, accessible: true },
  { source: 'suseo', target: 'jeongja', line: 'B', weight: 10, accessible: true },
  { source: 'jeongja', target: 'moran', line: 'B', weight: 5, accessible: true },
  { source: 'moran', target: 'guseong', line: 'B', weight: 20, accessible: true },
  { source: 'guseong', target: 'suwon', line: 'B', weight: 12, accessible: true },
  { source: 'suwon', target: 'incheon', line: 'B', weight: 30, accessible: true },

  // 경의중앙선 라인 링크
  { source: 'hongik', target: '용산', line: 'K', weight: 6, accessible: true },
  { source: '용산', target: 'ichon', line: 'K', weight: 3, accessible: true },
  { source: 'ichon', target: 'oksu', line: 'K', weight: 8, accessible: true },
  { source: 'oksu', target: 'wangsimni', line: 'K', weight: 5, accessible: true },
  { source: 'wangsimni', target: 'cheongnyangni', line: 'K', weight: 3, accessible: true },
  { source: 'cheongnyangni', target: 'sangbong', line: 'K', weight: 5, accessible: true },
  { source: 'sangbong', target: 'guri', line: 'K', weight: 6, accessible: true },
  { source: 'guri', target: 'yangpyeong', line: 'K', weight: 32, accessible: true },

  // 공항철도 라인 링크
  { source: 'incheon-airport', target: 'unseo', line: 'A', weight: 8, accessible: true },
  { source: 'unseo', target: 'gimpo-airport', line: 'A', weight: 20, accessible: true },
  { source: 'gimpo-airport', target: 'hongik', line: 'A', weight: 8, accessible: true },
  { source: 'hongik', target: 'seoul', line: 'A', weight: 4, accessible: true }
];

export const transfers = {};

(() => {
  Object.keys(stations).forEach(stationId => {
    const station = stations[stationId];
    if (station.lines.length > 1) {
      transfers[stationId] = { accessible: true };
      
      station.lines.forEach(lineA => {
        station.lines.forEach(lineB => {
          if (lineA !== lineB) {
            const key = `${lineA}-${lineB}`;
            transfers[stationId][key] = 4.0;
          }
        });
      });

      if (station.name === '종로3가역') {
        transfers[stationId].accessible = false;
      }
    }
  });
})();

export const congestionBaseline = {
  5: 15,  6: 35,  7: 65,  8: 92,  9: 60,  10: 40,
  11: 38, 12: 45, 13: 48, 14: 43, 15: 50, 16: 58,
  17: 78, 18: 95, 19: 80, 20: 55, 21: 48, 22: 42,
  23: 30, 24: 15
};

export const stationCongestionTypes = {
  'seoul': 'office', 'city-hall': 'office', 'gwanghwamun': 'office',
  'gyeongbokgung': 'tourism', 'anguk': 'tourism', 'jongno3': 'tourism',
  'gangnam': 'office', 'jamsil': 'tourism', 'gimpo-airport': 'tourism',
  'suwon': 'residential', 'bupyeong': 'residential', 'daehwa': 'residential',
  'express-bus': 'office', 'sports-complex': 'tourism', 'dongtan': 'office',
  'suseo': 'office', 'seongnam': 'residential'
};

export const randomTripThemes = [
  {
    id: 'theme-gtx',
    title: 'GTX-A 타고 떠나는 동탄 센트럴 투어',
    description: '서울역에서 동탄까지 단 20분! 초고속 광역 급행철도로 빠르게 남부 도심 쉼터를 구경해 보세요.',
    stations: ['dongtan'],
    spots: [
      { name: '동탄센트럴파크', description: '탁 트인 호수공원 산책로와 인공 폭포, 넓은 잔디 광장이 어우러진 휴식 명소 (동탄역에서 버스로 10분)' },
      { name: '롯데백화점 동탄점', description: '수도권 최대 규모의 힐링형 문화복합 쇼핑공간과 미식 공간 제공 (동탄역 지하 직접 연결)' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(6, 146, 140, 0.25), rgba(153, 108, 172, 0.2))'
  },
  {
    id: 'theme-history',
    title: '경복궁 & 안국 고궁/역사 산책',
    description: '서울의 찬란한 역사와 한옥의 고즈넉한 멋을 느껴보세요.',
    stations: ['gyeongbokgung', 'anguk'],
    spots: [
      { name: '경복궁', description: '조선 시대의 으뜸 궁궐이자 서울 최고의 역사 명소 (경복궁역 5번 출구 연결)' },
      { name: '북촌한옥마을', description: '전통 한옥들이 보존되어 있어 고풍스러운 골목길 산책을 즐기기 좋은 곳 (안국역 2번 출구)' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(239, 124, 28, 0.2), rgba(205, 124, 47, 0.2))'
  },
  {
    id: 'theme-nature',
    title: '양평 & 남한강 힐링 자전거 여행',
    description: '경의중앙선을 타고 도심을 벗어나 남한강의 탁 트인 자전거 도로와 연꽃 정원을 달립니다.',
    stations: ['yangpyeong'],
    spots: [
      { name: '두물머리', description: '북한강과 남한강의 두 물줄기가 만나는 한적하고 고풍스러운 강변 명소 (양수리 인근)' }
    ],
    bgGradient: 'linear-gradient(135deg, rgba(119, 196, 163, 0.25), rgba(205, 124, 47, 0.2))'
  }
];
