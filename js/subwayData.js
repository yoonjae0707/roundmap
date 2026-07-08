/**
 * Round Map - 실제 위도/경도 기반 수도권 광역 지하철 Master 데이터셋 (GTX-A 및 신규 광역선 포함)
 */

// 14개 광역 노선 정보 (색상 및 노선명)
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

// 수도권 주요 55개 역 실제 GPS 위도(lat), 경도(lng) 좌표 정보
export const stations = {
  // --- GTX-A 노선 개통역 ---
  '운정': {
    id: '운정', name: '운정중앙역', lines: ['GTX-A'], lat: 37.7289, lng: 126.7451,
    facilities: { toilet: '지하 1층 개찰구 옆', nursing: '지하 1층 고객안내센터 인근', locker: '2번 출구 지하 통로', elevatorLocation: '1, 3번 출구 인근 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 엘리베이터 이용 -> 지하 대합실 -> GTX-A 승강장 전용 초고속 엘리베이터 탑승' }
  },
  'kintex': {
    id: 'kintex', name: '킨텍스역(GTX)', lines: ['GTX-A'], lat: 37.6698, lng: 126.7482,
    facilities: { toilet: '지하 1층 대합실 내부', nursing: '없음', locker: '1번 출구 에스컬레이터 옆', elevatorLocation: '킨텍스 제2전시장 연결 방향 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '대합실에서 승강장까지 휠체어 전용 이동통로 및 무단차 슬로프 구비' }
  },
  'daehwa': {
    id: 'daehwa', name: '대화역', lines: ['3'], lat: 37.6760, lng: 126.7475,
    facilities: { toilet: '지하 1층 대합실 중앙', nursing: '없음', locker: '2번, 5번 출구 앞', elevatorLocation: '3번, 6번 출구 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 외부 엘리베이터 탑승 -> 지하 대합실 -> 3호선 승강장 엘리베이터 연동' }
  },
  'samsong': {
    id: 'samsong', name: '삼송역', lines: ['3'], lat: 37.6531, lng: 126.8955,
    facilities: { toilet: '지하 1층 대합실 서편', nursing: '없음', locker: '1, 8번 출구 대합실', elevatorLocation: '6번 출구 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 지하 대합실 -> 3호선 승강장 엘리베이터 완비' }
  },
  'yeonsinnae': {
    id: 'yeonsinnae', name: '연신내역', lines: ['3', '6', 'GTX-A'], lat: 37.6186, lng: 126.9208,
    facilities: { toilet: '지하 1층 개찰구 외부', nursing: '없음', locker: '3번 출구 방향', elevatorLocation: '7번 출구 외부 엘리베이터 및 GTX 환승용 수직 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: true, accessibleRoute: '7번 출구 엘리베이터 -> 지하 대합실 -> 3/6호선 및 GTX-A 환승 대형 엘리베이터 탑승' }
  },
  'seoul': {
    id: 'seoul', name: '서울역', lines: ['1', '4', 'A', 'GTX-A'], lat: 37.5546, lng: 126.9706,
    facilities: { toilet: 'B2층 1번 출구 방향 및 공항철도 B1층', nursing: 'B1층 고객안내센터 옆', locker: '1, 4번 출구 통로 및 KTX 대합실', elevatorLocation: '1번 출구 앞 및 공항철도 환승통로 곳곳 설치' },
    accessible: { hasElevator: true, hasWheelchairLift: true, accessibleRoute: '1번 출구 엘리베이터 -> 지하 1층 -> 1, 4호선 및 공항철도/GTX 환승 전용 초고속 수직 엘리베이터 완비' }
  },
  'suseo': {
    id: 'suseo', name: '수서역', lines: ['3', 'B', 'GTX-A'], lat: 37.4874, lng: 127.1012,
    facilities: { toilet: '지하 1층 대합실 내부 및 SRT 연결 광장', nursing: '지하 1층 고객안내실 옆', locker: 'SRT 지하 환승통로', elevatorLocation: '3번 출구 방향 및 SRT 맞이방 내부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 3호선/수인분당선 및 GTX-A 직통 수직 환승 엘리베이터 제공' }
  },
  'seongnam': {
    id: 'seongnam', name: '성남역', lines: ['GTX-A', 'K'], lat: 37.3934, lng: 127.1265,
    facilities: { toilet: '지하 1층 대합실 공통 구역', nursing: '지하 1층 고객센터 내', locker: '1번 출구 방향 통로', elevatorLocation: '2번, 4번 출구 인근 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2번 출구 엘리베이터 탑승 -> 지하 1층 대합실 -> 경의중앙/경강선 및 GTX-A 지하 승강장 엘리베이터 직접 연계' }
  },
  'guseong': {
    id: 'guseong', name: '구성역', lines: ['B', 'GTX-A'], lat: 37.2863, lng: 127.1158,
    facilities: { toilet: '지하 1층 대합실', nursing: '없음', locker: '1번 출구 에스컬레이터 옆', elevatorLocation: '3번 출구 방향 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 외부 엘리베이터 -> 지하 대합실 -> 수인분당선 및 GTX-A 지하 승강장 연계 수직기 이용' }
  },
  'dongtan': {
    id: 'dongtan', name: '동탄역(GTX)', lines: ['GTX-A'], lat: 37.1996, lng: 127.0963,
    facilities: { toilet: '지하 4층 대합실 내부', nursing: '지하 4층 고객안내센터 옆', locker: '지하 4층 SRT 매표소 인근', elevatorLocation: '지상 버스정류장 연계용 대형 수직 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상에서 승강장(지하 6층)까지 이동하는 무장애 수직 엘리베이터 라인 완비' }
  },

  // --- 인천/부천/서부권 ---
  'incheon-airport': {
    id: 'incheon-airport', name: '인천공항T1역', lines: ['A'], lat: 37.4475, lng: 126.4525,
    facilities: { toilet: 'B1층 교통센터 내부', nursing: 'B1층 여객터미널 동편', locker: '교통센터 중앙', elevatorLocation: '각 터미널 연결통로 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '공항 교통센터에서 승강장까지 턱이 없는 경사로 및 엘리베이터가 제공됩니다.' }
  },
  'incheon': {
    id: 'incheon', name: '인천역', lines: ['1', 'B'], lat: 37.4766, lng: 126.6171,
    facilities: { toilet: '1호선 지상 승강장 끝', nursing: '없음', locker: '1번 출구 대합실', elevatorLocation: '1번 출구 광장 및 내부 연결기' },
    accessible: { hasElevator: true, hasWheelchairLift: true, accessibleRoute: '지상 1호선 승강장에서 개방형 평지 진출입 가능, 지하 분당선 승강장은 엘리베이터 이용' }
  },
  'bupyeong': {
    id: 'bupyeong', name: '부평역', lines: ['1', '7'], lat: 37.4895, lng: 126.7248,
    facilities: { toilet: '지하 1층 개찰구 밖', nursing: '7호선 고객행복센터 옆', locker: '부평 지하상가 분수대 옆', elevatorLocation: '북부 및 남부 광장 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '북부광장 엘리베이터 -> 지하 대합실 -> 1/7호선 승강장 엘리베이터 완비' }
  },
  'bucheon': {
    id: 'bucheon', name: '부천역', lines: ['1'], lat: 37.4841, lng: 126.7827,
    facilities: { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '남부 출구 대합실', elevatorLocation: '북부광장 버스쉘터 옆' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '북부광장 엘리베이터로 대합실 진입 후 1호선 상/하행 승강장 리프트 없이 엘리베이터 연결' }
  },
  'gimpo-airport': {
    id: 'gimpo-airport', name: '김포공항역', lines: ['5', '9', 'A'], lat: 37.5618, lng: 126.8019,
    facilities: { toilet: '지하 1층 및 지하 2층 대합실 내부', nursing: '국내선 연결 방향 통로', locker: '국내선 환승 통로', elevatorLocation: '승강장 및 외부 연동 엘리베이터 다수' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '전 노선 수평 이동 및 수직 환승 엘리베이터가 장애 없이 구축된 교통 약자 1등급 역사' }
  },

  // --- 경기 남서/수원권 ---
  'suwon': {
    id: 'suwon', name: '수원역', lines: ['1', 'B'], lat: 37.2662, lng: 126.9998,
    facilities: { toilet: '2층 대합실 매표소 옆', nursing: '2층 고객센터 내부', locker: '지하 1층 분당선 대합실', elevatorLocation: '동부 및 서부 역전 광장 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '민자역사 내부 에스컬레이터 및 수직 엘리베이터를 통한 무장애 이동로 지원' }
  },
  'geumjeong': {
    id: 'geumjeong', name: '금정역', lines: ['1', '4'], lat: 37.3722, lng: 126.9434,
    facilities: { toilet: '지상 2층 대합실 중앙', nursing: '없음', locker: '지상 2층 출구 통로', elevatorLocation: '1, 2번 출구 지상 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '동일 플랫폼 평면 승강장으로 환승 시 계단이나 엘리베이터 이용조차 필요 없음 (휠체어 환승 최적)' }
  },
  'oido': {
    id: 'oido', name: '오이도역', lines: ['4', 'B'], lat: 37.3624, lng: 126.7387,
    facilities: { toilet: '지하 1층 개찰구 내부', nursing: '고객안내센터 옆', locker: '1번 출구 앞', elevatorLocation: '1번 출구 지상 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 대합실과 지하 승강장 간 연결 엘리베이터 제공' }
  },

  // --- 서울 서부권 ---
  'sindorim': {
    id: 'sindorim', name: '신도림역', lines: ['1', '2'], lat: 37.5087, lng: 126.8912,
    facilities: { toilet: '지하 1층 개찰구 외부', nursing: '지상 2층 맞이방 옆', locker: '디큐브시티 지하 연결 광장', elevatorLocation: '1번, 6번 출구 외부 엘리베이터' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 외부 엘리베이터 탑승 -> 지하 대합실 -> 1, 2호선 승강장 전용 엘리베이터 연동' }
  },
  'ydp-office': {
    id: 'ydp-office', name: '영등포구청역', lines: ['2', '5'], lat: 37.5258, lng: 126.8967,
    facilities: { toilet: '2호선 개찰구 내부 및 5호선 대합실 외부', nursing: '없음', locker: '1, 6번 출구 통로', elevatorLocation: '3번, 7번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7번 출구 엘리베이터로 대합실 진입 -> 2/5호선 승강장까지 엘리베이터로만 환승 가능' }
  },
  'yeongdeungpo': {
    id: 'yeongdeungpo', name: '영등포역', lines: ['1'], lat: 37.5156, lng: 126.9076,
    facilities: { toilet: '지상 3층 맞이방 코너', nursing: '3층 여행자센터 내부', locker: '롯데백화점 지하 연결 통로', elevatorLocation: '남부/북부광장 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 외부 엘리베이터 -> 3층 맞이방 진입 -> 1호선 승강장 전용 수직 엘리베이터 탑승' }
  },
  'singil': {
    id: 'singil', name: '신길역', lines: ['1', '5'], lat: 37.5171, lng: 126.9171,
    facilities: { toilet: '1호선 지상 3층 및 5호선 지하 대합실', nursing: '5호선 고객안내실 옆', locker: '5호선 개찰구 인근', elevatorLocation: '3번 출구 방향 및 환승통로 무빙워크 경사로' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '환승 경사로와 수직 엘리베이터로 구성되어 다소 길지만 휠체어 무장애 이동 가능' }
  },
  'yeouido': {
    id: 'yeouido', name: '여의도역', lines: ['5', '9'], lat: 37.5216, lng: 126.9242,
    facilities: { toilet: '지하 1.5층 5호선 개찰구 외부', nursing: '없음', locker: 'IFC몰 지하 연결 입구', elevatorLocation: '5번 출구 IFC 광장 방향' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 5, 9호선 승강장 전용 엘리베이터 연동' }
  },
  'hapjeong': {
    id: 'hapjeong', name: '합정역', lines: ['2', '6'], lat: 37.5494, lng: 126.9138,
    facilities: { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '8번 출구 마포한강푸르지오 지하 연결', elevatorLocation: '5번, 9번 출구 인근 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 탑승 -> 지하 대합실 -> 2, 6호선 전용 엘리베이터 환승 가능' }
  },
  'hongik': {
    id: 'hongik', name: '홍대입구역', lines: ['2', 'K', 'A'], lat: 37.5575, lng: 126.9244,
    facilities: { toilet: '2호선 개찰구 안쪽 및 공항철도 B1층 대합실', nursing: '공항철도 수유실', locker: '4, 8, 9번 출구 인근 지하', elevatorLocation: '4번, 8번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 2호선 및 공항철도/경의선 환승 전 구간 리프트 우회 엘리베이터 배치' }
  },

  // --- 서울 도심 북부 ---
  'gyeongbokgung': {
    id: 'gyeongbokgung', name: '경복궁역', lines: ['3'], lat: 37.5758, lng: 126.9735,
    facilities: { toilet: '지하 1층 개찰구 외부 미술관 방향', nursing: '없음', locker: '5번 출구 방향', elevatorLocation: '4번 출구 방향 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: true, accessibleRoute: '4번 출구 엘리베이터 탑승 -> 지하 대합실 -> 3호선 승강장 수직 엘리베이터 연계' }
  },
  'gwanghwamun': {
    id: 'gwanghwamun', name: '광화문역', lines: ['5'], lat: 37.5715, lng: 126.9768,
    facilities: { toilet: '지하 1층 세종문화회관 연결구역 개찰구 외부', nursing: '고객안내센터 내부', locker: '3번 출구 방향', elevatorLocation: '8번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 5호선 승강장 전용 엘리베이터 탑승' }
  },
  'city-hall': {
    id: 'city-hall', name: '시청역', lines: ['1', '2'], lat: 37.5657, lng: 126.9769,
    facilities: { toilet: '1호선 대합실 및 지하 1층 외부 상가', nursing: '지하 1층 대합실 고객실 옆', locker: '2번, 5번 출구 대합실', elevatorLocation: '12번 출구 외부 및 1-2호선 연결통로' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 탑승 -> 대합실 -> 1, 2호선 전용 엘리베이터 환승구간 제공' }
  },
  'anguk': {
    id: 'anguk', name: '안국역', lines: ['3'], lat: 37.5765, lng: 126.9854,
    facilities: { toilet: '지하 1층 대합실 내부', nursing: '없음', locker: '1번, 4번 출구 앞', elevatorLocation: '5번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 엘리베이터 탑승 후 3호선 승강장 이동' }
  },
  'jongno3': {
    id: 'jongno3', name: '종로3가역', lines: ['1', '3', '5'], lat: 37.5716, lng: 126.9918,
    facilities: { toilet: '1호선 대합실 및 5호선 구역 개찰구 외부', nursing: '3호선 대합실 옆 수유센터', locker: '1, 8번 출구 인근', elevatorLocation: '15번 출구 앞 외부' },
    accessible: { hasElevator: false, hasWheelchairLift: true, accessibleRoute: '15번 출구 엘리베이터 -> 1호선 대합실 -> 3/5호선 환승은 수동 휠체어 리프트 탑승 필수(직원 동반 필요)' }
  },
  'euljiro-입구': {
    id: 'euljiro-입구', name: '을지로입구역', lines: ['2'], lat: 37.5660, lng: 126.9826,
    facilities: { toilet: '지하 1층 개찰구 밖 롯데 연결 통로', nursing: '없음', locker: '3번 출구 방향', elevatorLocation: '8번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 외부 엘리베이터 -> 대합실 -> 2호선 승강장 전용 엘리베이터 탑승' }
  },
  'euljiro3': {
    id: 'euljiro3', name: '을지로3가역', lines: ['2', '3'], lat: 37.5663, lng: 126.9910,
    facilities: { toilet: '지하 1층 대합실 중앙 개찰구 외부', nursing: '없음', locker: '1, 9번 출구 대합실', elevatorLocation: '12번 출구 외부 및 2-3호선 환승통로' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '12번 출구 엘리베이터 -> 대합실 -> 2, 3호선 승강장 연결 엘리베이터 완비' }
  },
  'euljiro4': {
    id: 'euljiro4', name: '을지로4가역', lines: ['2', '5'], lat: 37.5666, lng: 126.9980,
    facilities: { toilet: '지하 1층 개찰구 내부', nursing: '5호선 고객행복센터 옆', locker: '4번 출구 대합실', elevatorLocation: '5번, 9번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 2, 5호선 전용 환승 수직기 제공' }
  },

  // --- 서울 도심 동/남부 허브 ---
  'dongdaemun': {
    id: 'dongdaemun', name: '동대문역', lines: ['1', '4'], lat: 37.5714, lng: 127.0094,
    facilities: { toilet: '지하 1층 4호선 개찰구 밖', nursing: '4호선 고객안내센터 내', locker: '5번, 9번 출구', elevatorLocation: '6번, 10번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: true, accessibleRoute: '6번 출구 엘리베이터 -> 1, 4호선 대합실 연계 -> 승강장 엘리베이터 이용' }
  },
  'ddp': {
    id: 'ddp', name: '동대문역사문화공원역', lines: ['2', '4', '5'], lat: 37.5657, lng: 127.0079,
    facilities: { toilet: '2/4호선 환승통로 및 5호선 대합실 내부', nursing: '5호선 고객안내실 옆', locker: '1, 2번 출구 지하 DDP 연결통로', elevatorLocation: '1번 출구 DDP 광장 및 14번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '14번 출구 앞 엘리베이터 -> 지하 대합실 -> 2, 4, 5호선 수직 환승 엘리베이터 지원' }
  },
  'chungmuro': {
    id: 'chungmuro', name: '충무로역', lines: ['3', '4'], lat: 37.5614, lng: 126.9942,
    facilities: { toilet: '3/4호선 지하 승강장 연결층 내부', nursing: '지하 1층 대합실 코너', locker: '2번, 8번 출구 앞', elevatorLocation: '1번, 8번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 엘리베이터 -> 지하 1층 대합실 -> 3호선 및 4호선 승강장 엘리베이터 직접 연결' }
  },
  'myeongdong': {
    id: 'myeongdong', name: '명동역', lines: ['4'], lat: 37.5609, lng: 126.9863,
    facilities: { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '1번, 10번 출구 통로', elevatorLocation: '1번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '1번 출구 외부 엘리베이터 -> 대합실 -> 승강장 전용 엘리베이터 탑승' }
  },
  'hoehyun': {
    id: 'hoehyun', name: '회현역', lines: ['4'], lat: 37.5585, lng: 126.9782,
    facilities: { toilet: '지하 1층 개찰구 내부', nursing: '없음', locker: '5, 7번 출구', elevatorLocation: '5번 출구 남대문시장 방면 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '5번 출구 엘리베이터 -> 지하 대합실 -> 개찰구 거쳐 4호선 승강장 엘리베이터 연동' }
  },
  'samgakji': {
    id: 'samgakji', name: '삼각지역', lines: ['4', '6'], lat: 37.5345, lng: 126.9729,
    facilities: { toilet: '6호선 대합실 및 환승 통로', nursing: '6호선 고객안내실 옆', locker: '1, 14번 출구', elevatorLocation: '11번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '11번 출구 엘리베이터 -> 지하 대합실 -> 4/6호선 간 엘리베이터 환승 동선 완비' }
  },

  // --- 서울 동북/왕십리권 ---
  'sindang': {
    id: 'sindang', name: '신당역', lines: ['2', '6'], lat: 37.5656, lng: 127.0195,
    facilities: { toilet: '2호선 대합실 외부 및 6호선 환승로 내부', nursing: '2호선 고객안내실 옆', locker: '10번, 11번 출구', elevatorLocation: '4번, 6번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '6번 출구 엘리베이터 -> 6호선 대합실 -> 2호선 경사로 및 엘리베이터 완무장애 환승' }
  },
  'cheonggu': {
    id: 'cheonggu', name: '청구역', lines: ['5', '6'], lat: 37.5602, lng: 127.0153,
    facilities: { toilet: '5호선 대합실 개찰구 외부', nursing: '5호선 수유실', locker: '1, 3번 출구', elevatorLocation: '3번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3번 출구 엘리베이터 -> 지하 대합실 -> 5/6호선 승강장 엘리베이터 탑승' }
  },
  'yaksu': {
    id: 'yaksu', name: '약수역', lines: ['3', '6'], lat: 37.5544, lng: 127.0108,
    facilities: { toilet: '지하 1층 개찰구 밖', nursing: '없음', locker: '5, 7번 출구', elevatorLocation: '3번, 8번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8번 출구 엘리베이터 -> 지하 대합실 -> 3/6호선 연계 엘리베이터 제공' }
  },
  'wangsimni': {
    id: 'wangsimni', name: '왕십리역', lines: ['2', '5', 'B', 'K'], lat: 37.5619, lng: 127.0385,
    facilities: { toilet: '2, 5호선 대합실 및 비트플렉스 광장', nursing: '경의중앙선 고객지원실 옆', locker: '5, 12번 출구 앞', elevatorLocation: '6-1번 출구 외부 및 환승 통로 곳곳' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '민자역사 대형 복합 동선이나, 엘리베이터 및 수평 무빙워크가 완비된 역사' }
  },
  'konkuk': {
    id: 'konkuk', name: '건대입구역', lines: ['2', '7'], lat: 37.5404, lng: 127.0692,
    facilities: { toilet: '2호선 B1층 개찰구 외부 및 7호선 대합실 내부', nursing: '7호선 고객안내실 옆', locker: '2번 출구 스타시티 방향', elevatorLocation: '2호선 5번 출구 앞 및 7호선 3번 출구 앞' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '7호선 지하에서 지상 2호선 승강장 환승 통로 내 무단차 엘리베이터 연동' }
  },
  'cheongnyangni': {
    id: 'cheongnyangni', name: '청량리역', lines: ['1', 'B', 'K'], lat: 37.5801, lng: 127.0490,
    facilities: { toilet: '지하 1층 대합실 및 KTX역사 3층', nursing: 'KTX 맞이방 수유실', locker: '1호선 3번 출구 앞', elevatorLocation: '1번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '경사로 및 환승 엘리베이터를 제공하여 휠체어로 원활한 환승 탑승 가능' }
  },
  'sangbong': {
    id: 'sangbong', name: '상봉역', lines: ['7', 'K'], lat: 37.5960, lng: 127.0850,
    facilities: { toilet: '개찰구 내부 지하 1층', nursing: '없음', locker: '2번, 8번 출구 대합실', elevatorLocation: '1번, 8번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 경의중앙선 승강장과 지하 7호선 승강장 간 엘리베이터 수평동선 제공' }
  },
  'yangpyeong': {
    id: 'yangpyeong', name: '양평역(경의선)', lines: ['K'], lat: 37.4928, lng: 127.4875,
    facilities: { toilet: '지상 2층 맞이방 개찰구 옆', nursing: '없음', locker: '1번 출구 앞 대합실', elevatorLocation: '1, 2번 출구 지상' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '지상 2층 맞이방과 지상 1층 전철 승강장 간 수직 엘리베이터로 연결' }
  },

  // --- 서울 남부 및 한강 이남권 ---
  'sports-complex': {
    id: 'sports-complex', name: '종합운동장역', lines: ['2', '9'], lat: 37.5109, lng: 127.0722,
    facilities: { toilet: '2호선 B1층 및 9호선 지하 대합실', nursing: '9호선 수유센터', locker: '2번 출구 주경기장 방향', elevatorLocation: '9번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '9호선 신설 환승구역 엘리베이터 탑승하여 2호선으로 램프 통행' }
  },
  'jamsil': {
    id: 'jamsil', name: '잠실역', lines: ['2', '8'], lat: 37.5133, lng: 127.1001,
    facilities: { toilet: '2호선 개찰구 밖 3번 출구 방향 및 8호선 지하 1층', nursing: '8호선 고객행복센터 옆', locker: '지하 분수 광장 롯데월드몰 입구', elevatorLocation: '3번, 11번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '롯데월드몰/타워 엘리베이터와 연계되고 지하 환승통로 내 무장애 동선 확보' }
  },
  'gangnam': {
    id: 'gangnam', name: '강남역', lines: ['2', 'S'], lat: 37.4979, lng: 127.0276,
    facilities: { toilet: '2호선 지하 1층 개찰구 밖, 신분당선 개찰구 내부 B1층', nursing: '신분당선 고객서비스센터 내', locker: '11번, 12번 출구 지하 통로', elevatorLocation: '1번, 12번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '신분당선 민자 환승통로 곳곳에 수직 엘리베이터 및 경사로 무단차 연동 구축' }
  },
  'gyodae': {
    id: 'gyodae', name: '교대역', lines: ['2', '3'], lat: 37.4939, lng: 127.0146,
    facilities: { toilet: '2호선 대합실 및 3호선 개찰구 외부 지하 1층', nursing: '없음', locker: '1, 12번 출구', elevatorLocation: '1번, 5번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '2-3호선 휠체어 슬로프형 무계단 환승 통로 및 전용 수직 엘리베이터 완비' }
  },
  'sadang': {
    id: 'sadang', name: '사당역', lines: ['2', '4'], lat: 37.4765, lng: 126.9816,
    facilities: { toilet: '2호선 및 4호선 개찰구 내부', nursing: '4호선 고객안내센터 내 수유실', locker: '3번, 4번 출구 지하 환승주차장 연결부', elevatorLocation: '3번, 5번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '환승 통로에 계단이 없어 엘리베이터를 이용하여 전 구간 휠체어 통행 편리' }
  },
  'express-bus': {
    id: 'express-bus', name: '고속터미널역', lines: ['3', '7', '9'], lat: 37.5049, lng: 127.0049,
    facilities: { toilet: '3, 7, 9호선 각 개찰구 인근', nursing: '9호선 대합실 고객지원실 옆', locker: '신세계백화점 지하 연결부', elevatorLocation: '8번 출구 앞 광장 외부 및 백화점 연동' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '3개 노선 복합 대합실이나 전 구간 휠체어 램프 슬로프와 엘리베이터 완비' }
  },
  'yangjae': {
    id: 'yangjae', name: '양재역', lines: ['3', 'S'], lat: 37.4841, lng: 127.0346,
    facilities: { toilet: '3호선 대합실 개찰구 밖', nursing: '없음', locker: '1번, 12번 출구 대합실', elevatorLocation: '12번 출구 앞 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '신분당선 환승 경로에 엘리베이터 및 무장애 설계가 완벽히 구성됨' }
  },
  'pangyo': {
    id: 'pangyo', name: '판교역', lines: ['S'], lat: 37.3948, lng: 127.1112,
    facilities: { toilet: '지하 1층 대합실 내부', nursing: '지하 1층 고객지원센터 내부 수유센터', locker: '3번 출구 방향 지하', elevatorLocation: '1번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '신규 광역 노선 규격에 맞춰 100% 엘리베이터 이동 및 무단차 동선 확보' }
  },
  'jeongja': {
    id: 'jeongja', name: '정자역', lines: ['S', 'B'], lat: 37.3664, lng: 127.1084,
    facilities: { toilet: '분당선 지하 대합실 및 신분당선 개찰구 내부', nursing: '신분당선 고객지원실 내', locker: '분당선 3번 출구 대합실', elevatorLocation: '2번 출구 방향 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '수인분당선 및 신분당선 전철 환승 시 엘리베이터 및 슬로프 연결 완료' }
  },
  'moran': {
    id: 'moran', name: '모란역', lines: ['8', 'B'], lat: 37.4321, lng: 127.1290,
    facilities: { toilet: '8호선 대합실 밖 및 분당선 개찰구 안', nursing: '8호선 고객행복센터 내', locker: '8번 출구 대합실', elevatorLocation: '4번, 11번 출구 외부' },
    accessible: { hasElevator: true, hasWheelchairLift: false, accessibleRoute: '8호선 지하 승강장과 분당선 지하 승강장 간 환승 엘리베이터 연동 보장' }
  }
};

// 실제 위경도 좌표 기준 수도권 전체 지하철 선로 링크 연결 데이터
export const links = [
  // --- GTX-A 노선 ---
  { source: '운정', target: 'kintex', line: 'GTX-A', weight: 4, accessible: true },
  { source: 'kintex', target: 'daehwa', line: 'GTX-A', weight: 2, accessible: true }, // 킨텍스역 환승연계
  { source: 'daehwa', target: 'yeonsinnae', line: 'GTX-A', weight: 8, accessible: true },
  { source: 'yeonsinnae', target: 'seoul', line: 'GTX-A', weight: 4, accessible: true },
  { source: 'seoul', target: 'suseo', line: 'GTX-A', weight: 6, accessible: true },
  { source: 'suseo', target: 'seongnam', line: 'GTX-A', weight: 3, accessible: true },
  { source: 'seongnam', target: 'guseong', line: 'GTX-A', weight: 5, accessible: true },
  { source: 'guseong', target: 'dongtan', line: 'GTX-A', weight: 4, accessible: true },

  // --- 1호선 ---
  { source: 'incheon', target: 'bupyeong', line: '1', weight: 8, accessible: true },
  { source: 'bupyeong', target: 'bucheon', line: '1', weight: 6, accessible: true },
  { source: 'bucheon', target: 'sindorim', line: '1', weight: 10, accessible: true },
  { source: 'sindorim', target: 'yeongdeungpo', line: '1', weight: 3, accessible: true },
  { source: 'yeongdeungpo', target: 'singil', line: '1', weight: 2, accessible: true },
  { source: 'singil', target: 'seoul', line: '1', weight: 8, accessible: true },
  { source: 'seoul', target: 'city-hall', line: '1', weight: 2, accessible: true },
  { source: 'city-hall', target: 'jongno3', line: '1', weight: 4, accessible: true },
  { source: 'jongno3', target: 'dongdaemun', line: '1', weight: 3, accessible: false }, // 종로3가역 내 환승통로 휠체어 단절
  { source: 'dongdaemun', target: 'cheongnyangni', line: '1', weight: 5, accessible: true },

  // --- 2호선 ---
  { source: 'sindorim', target: 'ydp-office', line: '2', weight: 5, accessible: true },
  { source: 'ydp-office', target: 'hapjeong', line: '2', weight: 4, accessible: true },
  { source: 'hapjeong', target: 'hongik', line: '2', weight: 2, accessible: true },
  { source: 'hongik', target: 'city-hall', line: '2', weight: 8, accessible: true },
  { source: 'city-hall', target: 'euljiro-입구', line: '2', weight: 2, accessible: true },
  { source: 'euljiro-입구', target: 'euljiro3', line: '2', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'euljiro4', line: '2', weight: 2, accessible: true },
  { source: 'euljiro4', target: 'ddp', line: '2', weight: 2, accessible: true },
  { source: 'ddp', target: 'sindang', line: '2', weight: 2, accessible: true },
  { source: 'sindang', target: 'wangsimni', line: '2', weight: 3, accessible: true },
  { source: 'wangsimni', target: 'konkuk', line: '2', weight: 4, accessible: true },
  { source: 'konkuk', target: 'jamsil', line: '2', weight: 6, accessible: true },
  { source: 'jamsil', target: 'sports-complex', line: '2', weight: 3, accessible: true },
  { source: 'sports-complex', target: 'gangnam', line: '2', weight: 8, accessible: true },
  { source: 'gangnam', target: 'gyodae', line: '2', weight: 2, accessible: true },
  { source: 'gyodae', target: 'sadang', line: '2', weight: 5, accessible: true },
  { source: 'sadang', target: 'sindorim', line: '2', weight: 10, accessible: true },

  // --- 3호선 ---
  { source: 'daehwa', target: 'samsong', line: '3', weight: 12, accessible: true },
  { source: 'samsong', target: 'yeonsinnae', line: '3', weight: 5, accessible: true },
  { source: 'yeonsinnae', target: 'gyeongbokgung', line: '3', weight: 8, accessible: true },
  { source: 'gyeongbokgung', target: 'anguk', line: '3', weight: 2, accessible: true },
  { source: 'anguk', target: 'jongno3', line: '3', weight: 2, accessible: true },
  { source: 'jongno3', target: 'euljiro3', line: '3', weight: 2, accessible: true },
  { source: 'euljiro3', target: 'chungmuro', line: '3', weight: 2, accessible: true },
  { source: 'chungmuro', target: 'yaksu', line: '3', weight: 3, accessible: true },
  { source: 'yaksu', target: 'express-bus', line: '3', weight: 6, accessible: true },
  { source: 'express-bus', target: 'gyodae', line: '3', weight: 3, accessible: true },
  { source: 'gyodae', target: 'yangjae', line: '3', weight: 3, accessible: true },
  { source: 'yangjae', target: 'suseo', line: '3', weight: 8, accessible: true },

  // --- 4호선 ---
  { source: 'dongdaemun', target: 'ddp', line: '4', weight: 2, accessible: true },
  { source: 'ddp', target: 'chungmuro', line: '4', weight: 2, accessible: true },
  { source: 'chungmuro', target: 'myeongdong', line: '4', weight: 2, accessible: true },
  { source: 'myeongdong', target: 'hoehyun', line: '4', weight: 2, accessible: true },
  { source: 'hoehyun', target: 'seoul', line: '4', weight: 2, accessible: true },
  { source: 'seoul', target: 'samgakji', line: '4', weight: 4, accessible: true },
  { source: 'samgakji', target: 'sadang', line: '4', weight: 8, accessible: true },
  { source: 'sadang', target: 'geumjeong', line: '4', weight: 14, accessible: true },
  { source: 'geumjeong', target: 'oido', line: '4', weight: 20, accessible: true },

  // --- 5호선 ---
  { source: 'gimpo-airport', target: 'ydp-office', line: '5', weight: 14, accessible: true },
  { source: 'ydp-office', target: 'singil', line: '5', weight: 3, accessible: true },
  { source: 'singil', target: 'yeouido', line: '5', weight: 2, accessible: true },
  { source: 'yeouido', target: 'gwanghwamun', line: '5', weight: 7, accessible: true },
  { source: 'gwanghwamun', target: 'jongno3', line: '5', weight: 2, accessible: false }, // 종로3가 주변 5호선 휠체어 단절
  { source: 'jongno3', target: 'euljiro4', line: '5', weight: 2, accessible: false },
  { source: 'euljiro4', target: 'ddp', line: '5', weight: 2, accessible: true },
  { source: 'ddp', target: 'cheonggu', line: '5', weight: 2, accessible: true },
  { source: 'cheonggu', target: 'wangsimni', line: '5', weight: 4, accessible: true },

  // --- 6호선 ---
  { source: 'yeonsinnae', target: 'hapjeong', line: '6', weight: 12, accessible: true },
  { source: 'hapjeong', target: 'samgakji', line: '6', weight: 8, accessible: true },
  { source: 'samgakji', target: 'yaksu', line: '6', weight: 6, accessible: true },
  { source: 'yaksu', target: 'cheonggu', line: '6', weight: 2, accessible: true },
  { source: 'cheonggu', target: 'sindang', line: '6', weight: 2, accessible: true },

  // --- 7호선 ---
  { source: 'bupyeong', target: 'sindorim', line: '7', weight: 18, accessible: true }, // 부평-신도림 가상연계화
  { source: 'sindorim', target: 'sadang', line: '7', weight: 8, accessible: true },
  { source: 'sadang', target: 'express-bus', line: '7', weight: 8, accessible: true },
  { source: 'express-bus', target: 'konkuk', line: '7', weight: 10, accessible: true },
  { source: 'konkuk', target: 'sangbong', line: '7', weight: 8, accessible: true },

  // --- 8호선 ---
  { source: 'jamsil', target: 'moran', line: '8', weight: 12, accessible: true },

  // --- 9호선 ---
  { source: 'gimpo-airport', target: 'yeouido', line: '9', weight: 15, accessible: true },
  { source: 'yeouido', target: 'express-bus', line: '9', weight: 8, accessible: true },
  { source: 'express-bus', target: 'sports-complex', line: '9', weight: 10, accessible: true },

  // --- 신분당선 (S) ---
  { source: 'gangnam', target: 'yangjae', line: 'S', weight: 2, accessible: true },
  { source: 'yangjae', target: 'pangyo', line: 'S', weight: 8, accessible: true },
  { source: 'pangyo', target: 'jeongja', line: 'S', weight: 3, accessible: true },

  // --- 수인분당선 (B) ---
  { source: 'cheongnyangni', target: 'wangsimni', line: 'B', weight: 3, accessible: true },
  { source: 'wangsimni', target: 'suseo', line: 'B', weight: 20, accessible: true },
  { source: 'suseo', target: 'jeongja', line: 'B', weight: 10, accessible: true },
  { source: 'jeongja', target: 'moran', line: 'B', weight: 5, accessible: true },
  { source: 'moran', target: 'guseong', line: 'B', weight: 20, accessible: true },
  { source: 'guseong', target: 'suwon', line: 'B', weight: 12, accessible: true },
  { source: 'suwon', target: 'incheon', line: 'B', weight: 30, accessible: true },

  // --- 경의중앙선 (K) ---
  { source: 'hongik', target: 'seoul', line: 'K', weight: 4, accessible: true },
  { source: 'seoul', target: 'seongnam', line: 'K', weight: 12, accessible: true }, // 가상연결
  { source: 'seongnam', target: 'wangsimni', line: 'K', weight: 10, accessible: true },
  { source: 'wangsimni', target: 'cheongnyangni', line: 'K', weight: 3, accessible: true },
  { source: 'cheongnyangni', target: 'sangbong', line: 'K', weight: 5, accessible: true },
  { source: 'sangbong', target: 'yangpyeong', line: 'K', weight: 30, accessible: true },

  // --- 공항철도 (A) ---
  { source: 'incheon-airport', target: 'gimpo-airport', line: 'A', weight: 28, accessible: true },
  { source: 'gimpo-airport', target: 'hongik', line: 'A', weight: 8, accessible: true },
  { source: 'hongik', target: 'seoul', line: 'A', weight: 4, accessible: true }
];

// 수도권 전체 핵심 환승 노드 도보 가중치 (역내 환승 시간, 분 단위)
export const transfers = {
  'seoul': { '1-4': 4, '4-1': 4, '1-A': 6, 'A-1': 6, '4-A': 5, 'A-4': 5, '1-GTX-A': 6, 'GTX-A-1': 6, '4-GTX-A': 5, 'GTX-A-4': 5, accessible: true },
  'city-hall': { '1-2': 3, '2-1': 3, accessible: true },
  'jongno3': {
    '1-3': 5, '3-1': 5, '1-5': 8, '5-1': 8, '3-5': 6, '5-3': 6,
    accessible: false
  },
  'euljiro3': { '2-3': 3, '3-2': 3, accessible: true },
  'euljiro4': { '2-5': 4, '5-2': 4, accessible: true },
  'dongdaemun': { '1-4': 5, '4-1': 5, accessible: true },
  'ddp': {
    '2-4': 3, '4-2': 3, '2-5': 5, '5-2': 5, '4-5': 4, '5-4': 4,
    accessible: true
  },
  'chungmuro': { '3-4': 2, '4-3': 2, accessible: true },
  'sindang': { '2-6': 6, '6-2': 6, accessible: true },
  'yaksu': { '3-6': 3, '6-3': 3, accessible: true },
  'cheonggu': { '5-6': 3, '6-5': 3, accessible: true },
  'incheon': { '1-B': 4, 'B-1': 4, accessible: true },
  'bupyeong': { '1-7': 5, '7-1': 5, accessible: true },
  'gimpo-airport': {
    '5-9': 2, '9-5': 2, '5-A': 3, 'A-5': 3, '9-A': 2, 'A-9': 2,
    accessible: true
  },
  'suwon': { '1-B': 4, 'B-1': 4, accessible: true },
  'geumjeong': { '1-4': 1, '4-1': 1, accessible: true }, // 평면 환승 1분
  'oido': { '4-B': 2, 'B-4': 2, accessible: true },
  'yeonsinnae': { '3-6': 4, '6-3': 4, '3-GTX-A': 4, 'GTX-A-3': 4, accessible: true },
  'sindorim': { '1-2': 3, '2-1': 3, accessible: true },
  'ydp-office': { '2-5': 4, '5-2': 4, accessible: true },
  'singil': { '1-5': 5, '5-1': 5, accessible: true },
  'yeouido': { '5-9': 3, '9-5': 3, accessible: true },
  'hapjeong': { '2-6': 3, '6-2': 3, accessible: true },
  'hongik': {
    '2-K': 4, 'K-2': 4, '2-A': 4, 'A-2': 4, 'K-A': 3, 'A-K': 3,
    accessible: true
  },
  'samgakji': { '4-6': 4, '6-4': 4, accessible: true },
  'wangsimni': {
    '2-5': 4, '5-2': 4, '2-B': 5, 'B-2': 5, '2-K': 4, 'K-2': 4,
    '5-B': 5, 'B-5': 5, '5-K': 4, 'K-5': 4, 'B-K': 3, 'K-B': 3,
    accessible: true
  },
  'konkuk': { '2-7': 4, '7-2': 4, accessible: true },
  'cheongnyangni': {
    '1-B': 4, 'B-1': 4, '1-K': 4, 'K-1': 4, 'B-K': 3, 'K-B': 3,
    accessible: true
  },
  'sangbong': { '7-K': 3, 'K-7': 3, accessible: true },
  'jamsil': { '2-8': 4, '8-2': 4, accessible: true },
  'sports-complex': { '2-9': 4, '9-2': 4, accessible: true },
  'gangnam': { '2-S': 3, 'S-2': 3, accessible: true },
  'gyodae': { '2-3': 3, '3-2': 3, accessible: true },
  'sadang': { '2-4': 3, '4-2': 3, accessible: true },
  'express-bus': {
    '3-7': 5, '7-3': 5, '3-9': 4, '9-3': 4, '7-9': 5, '9-7': 5,
    accessible: true
  },
  'yangjae': { '3-S': 3, 'S-3': 3, accessible: true },
  'jeongja': { 'S-B': 3, 'B-S': 3, accessible: true },
  'moran': { '8-B': 4, 'B-8': 4, accessible: true },
  'suseo': { '3-B': 4, 'B-3': 4, '3-GTX-A': 5, 'GTX-A-3': 5, 'B-GTX-A': 4, 'GTX-A-B': 4, accessible: true },
  'seongnam': { 'GTX-A-K': 3, 'K-GTX-A': 3, accessible: true },
  'guseong': { 'B-GTX-A': 4, 'GTX-A-B': 4, accessible: true }
};

// 시간대별 혼잡도 통계 예측 비율 (%)
export const congestionBaseline = {
  5: 15,  6: 35,  7: 65,  8: 92,  9: 60,  10: 40,
  11: 38, 12: 45, 13: 48, 14: 43, 15: 50, 16: 58,
  17: 78, 18: 95, 19: 80, 20: 55, 21: 48, 22: 42,
  23: 30, 24: 15
};

// 역별 혼잡도 가중치 타입
export const stationCongestionTypes = {
  'seoul': 'office', 'city-hall': 'office', 'gwanghwamun': 'office',
  'gyeongbokgung': 'tourism', 'anguk': 'tourism', 'jongno3': 'tourism',
  'euljiro-입구': 'office', 'euljiro3': 'office', 'euljiro4': 'office',
  'dongdaemun': 'tourism', 'ddp': 'tourism', 'chungmuro': 'office',
  'myeongdong': 'tourism', 'hoehyun': 'tourism', 'sindang': 'residential',
  'yaksu': 'residential', 'cheonggu': 'residential', 'hongik': 'tourism',
  'gangnam': 'office', 'jamsil': 'tourism', 'gimpo-airport': 'tourism',
  'suwon': 'residential', 'bupyeong': 'residential', 'daehwa': 'residential',
  'express-bus': 'office', 'sports-complex': 'tourism', 'dongtan': 'office',
  'suseo': 'office', 'seongnam': 'residential'
};

// 랜덤 여행 추천 테마 목록 (광역 랜드마크 추가)
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
