import { stations, links, transfers } from './subwayData.js';

/**
 * 다익스트라 알고리즘 기반 지하철 경로 탐색 클래스
 */
export class SubwayPathFinder {
  constructor() {
    this.graph = {};
    this.buildGraph();
  }

  /**
   * (역ID, 노선ID) 조합을 노드로 하여 인접 리스트 형태의 그래프를 생성합니다.
   * 이렇게 하면 역내 환승 소요 시간과 노선 간 가중치를 완벽하게 시뮬레이션할 수 있습니다.
   */
  buildGraph() {
    this.graph = {};

    // 1. 모든 역과 해당 역이 속한 노선에 대해 노드 생성
    // 노드 ID 포맷: "stationId_lineId" (예: "seoul_1", "seoul_4")
    Object.keys(stations).forEach(stationId => {
      const station = stations[stationId];
      station.lines.forEach(lineId => {
        const nodeId = `${stationId}_${lineId}`;
        this.graph[nodeId] = [];
      });
    });

    // 2. 물리적 역 간 링크(선로 연결) 추가
    links.forEach(link => {
      const sourceNode = `${link.source}_${link.line}`;
      const targetNode = `${link.target}_${link.line}`;

      if (this.graph[sourceNode] && this.graph[targetNode]) {
        // 양방향 연결
        this.graph[sourceNode].push({
          to: targetNode,
          weight: link.weight,
          type: 'travel',
          line: link.line,
          accessible: link.accessible
        });
        this.graph[targetNode].push({
          to: sourceNode,
          weight: link.weight,
          type: 'travel',
          line: link.line,
          accessible: link.accessible
        });
      }
    });

    // 3. 환승역 내부 노선 간 환승 링크 추가
    Object.keys(transfers).forEach(stationId => {
      const stationTransfers = transfers[stationId];
      const station = stations[stationId];

      station.lines.forEach(lineA => {
        station.lines.forEach(lineB => {
          if (lineA === lineB) return;

          const nodeA = `${stationId}_${lineA}`;
          const nodeB = `${stationId}_${lineB}`;
          
          // 환승 시간 조회 (없으면 기본값 5분)
          const key = `${lineA}-${lineB}`;
          const weight = stationTransfers[key] || 5;
          const isAccessible = stationTransfers.accessible !== false;

          this.graph[nodeA].push({
            to: nodeB,
            weight: weight,
            type: 'transfer',
            line: null,
            accessible: isAccessible
          });
        });
      });
    });
  }

  /**
   * 경로 탐색 실행
   * @param {string} startStationId 출발역 ID
   * @param {string} endStationId 도착역 ID
   * @param {object} options { mode: 'time'|'transfer', isAccessibleOnly: boolean }
   */
  findPath(startStationId, endStationId, options = {}) {
    const { mode = 'time', isAccessibleOnly = false } = options;

    if (!stations[startStationId] || !stations[endStationId]) {
      return null;
    }

    if (startStationId === endStationId) {
      return {
        path: [{ stationId: startStationId, line: stations[startStationId].lines[0] }],
        totalTime: 0,
        transferCount: 0,
        accessibilityIssues: []
      };
    }

    // 출발역의 모든 노선 노드를 출발점으로 설정
    const startLines = stations[startStationId].lines;
    const endLines = stations[endStationId].lines;

    let bestResult = null;

    // 출발 노선 조합별로 다익스트라 실행 후 가장 우수한 경로 채택
    startLines.forEach(startLine => {
      const startNode = `${startStationId}_${startLine}`;
      const result = this.runDijkstra(startNode, endStationId, endLines, mode, isAccessibleOnly);
      
      if (result) {
        if (!bestResult) {
          bestResult = result;
        } else {
          // 모드에 따라 최선의 결과 갱신
          if (mode === 'transfer') {
            if (result.transferCount < bestResult.transferCount ||
               (result.transferCount === bestResult.transferCount && result.totalTime < bestResult.totalTime)) {
              bestResult = result;
            }
          } else { // 'time' 모드
            if (result.totalTime < bestResult.totalTime) {
              bestResult = result;
            }
          }
        }
      }
    });

    return bestResult;
  }

  /**
   * 다익스트라 코어 연산
   */
  runDijkstra(startNode, endStationId, endLines, mode, isAccessibleOnly) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    
    // 초기화
    Object.keys(this.graph).forEach(node => {
      distances[node] = Infinity;
    });
    distances[startNode] = 0;

    // 우선순위 큐 역할 (단순 구현)
    const queue = [startNode];

    while (queue.length > 0) {
      // 거리가 가장 짧은 노드 추출
      queue.sort((a, b) => distances[a] - distances[b]);
      const currentNode = queue.shift();

      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      const [currStationId, currLineId] = currentNode.split('_');

      // 목적지 중 하나에 도달했는지 확인
      if (currStationId === endStationId) {
        // 경로 역추적
        return this.reconstructPath(currentNode, startNode, previous, distances[currentNode]);
      }

      const neighbors = this.graph[currentNode] || [];
      for (const neighbor of neighbors) {
        // 교통약자 필터링 옵션이 켜져 있으면 accessible이 false인 엣지는 통과할 수 없음
        if (isAccessibleOnly && !neighbor.accessible) {
          continue;
        }

        // 해당 목적지역 자체가 교통약자 미지원(엘리베이터 없음)이면 통과하지 않음 (단, 출발/도착지는 예외적으로 허용하되 경고 표시)
        const [neighborStationId] = neighbor.to.split('_');
        if (isAccessibleOnly && neighborStationId !== endStationId) {
          const destStation = stations[neighborStationId];
          if (destStation && !destStation.accessible.hasElevator) {
            continue;
          }
        }

        // 가중치 계산 규칙
        // 최소 환승 모드일 때는 환승 링크 통과 시 엄청난 패널티(예: 1000분)를 주어 환승을 피하도록 강제함
        let edgeWeight = neighbor.weight;
        if (mode === 'transfer' && neighbor.type === 'transfer') {
          edgeWeight += 1000; // 환승 패널티 추가
        }

        const newDist = distances[currentNode] + edgeWeight;

        if (newDist < distances[neighbor.to]) {
          distances[neighbor.to] = newDist;
          previous[neighbor.to] = currentNode;
          queue.push(neighbor.to);
        }
      }
    }

    return null;
  }

  /**
   * 역추적을 통한 경로 데이터 생성
   */
  reconstructPath(endNode, startNode, previous, totalDist) {
    const rawPath = [];
    let curr = endNode;
    
    while (curr) {
      rawPath.push(curr);
      curr = previous[curr];
    }
    rawPath.reverse();

    const pathSteps = [];
    let transferCount = 0;
    let totalTime = 0;
    const accessibilityIssues = [];

    for (let i = 0; i < rawPath.length; i++) {
      const [stationId, line] = rawPath[i].split('_');
      const station = stations[stationId];

      // 교통약자 접근성 이슈 체크
      if (!station.accessible.hasElevator) {
        accessibilityIssues.push(`${station.name} (엘리베이터 없음)`);
      }

      pathSteps.push({
        stationId,
        stationName: station.name,
        line,
        lat: station.lat,
        lng: station.lng
      });

      if (i > 0) {
        const [prevStationId, prevLine] = rawPath[i - 1].split('_');
        
        // 시간 가중치 및 환승 여부 검증
        if (prevStationId === stationId) {
          // 환승 발생
          transferCount++;
          const key = `${prevLine}-${line}`;
          const transferTime = transfers[stationId]?.[key] || 5;
          totalTime += transferTime;

          if (transfers[stationId]?.accessible === false) {
            accessibilityIssues.push(`${station.name} 내 ${prevLine}호선 ↔ ${line}호선 환승 동선 휠체어 리프트 이용 필요`);
          }
        } else {
          // 단순 이동
          const link = links.find(l => 
            (l.source === prevStationId && l.target === stationId && l.line === line) ||
            (l.target === prevStationId && l.source === stationId && l.line === line)
          );
          if (link) {
            totalTime += link.weight;
            if (!link.accessible) {
              accessibilityIssues.push(`${stations[prevStationId].name} ↔ ${station.name} 구간 이동 통로 휠체어 이용 복잡`);
            }
          } else {
            totalTime += 2; // 안전용 기본 이동가중치
          }
        }
      }
    }

    return {
      path: pathSteps,
      totalTime,
      transferCount,
      // 중복 이슈 제거
      accessibilityIssues: [...new Set(accessibilityIssues)]
    };
  }
}
