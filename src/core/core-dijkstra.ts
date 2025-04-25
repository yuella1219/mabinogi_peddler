// 타입 정의
export type Graph = Record<string, { to: string; weight: number }[]>;

export function dijkstra(graph: Graph, start: string, end: string): string[] {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue: string[] = [];

  // 초기화
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    queue.push(node);
  }
  distances[start] = 0;

  while (queue.length > 0) {
    // 가장 가까운 노드 선택
    queue.sort((a, b) => distances[a] - distances[b]);
    const current = queue.shift();
    if (!current) break;
    if (current === end) break;

    for (const neighbor of graph[current]) {
      const alt = distances[current] + neighbor.weight;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }
  }

  // 경로 추적
  const path: string[] = [];
  let curr: string | null = end;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return path;
}
