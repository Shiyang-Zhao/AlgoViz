export const algorithms: Record<string, Record<string, string>> = {
  bfs: {
    python: `def bfs(graph, start):
    queue = [start]
    visited = set()
    
    while queue:
        node = queue.pop(0)
        if node not in visited:
            visited.add(node)
            print(node)
            queue.extend(graph.get(node, []))`,

    cpp: `#include <iostream>
#include <queue>
#include <unordered_set>
#include <map>
#include <vector>

using namespace std;

void bfs(map<string, vector<string>> &graph, string start) {
    queue<string> q;
    unordered_set<string> visited;
    q.push(start);
    
    while (!q.empty()) {
        string node = q.front();
        q.pop();
        if (visited.find(node) == visited.end()) {
            visited.insert(node);
            cout << node << endl;
            for (string neighbor : graph[node]) {
                q.push(neighbor);
            }
        }
    }
}`,

    java: `import java.util.*;

public class BFS {
    public static void bfs(Map<String, List<String>> graph, String start) {
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        queue.add(start);
        
        while (!queue.isEmpty()) {
            String node = queue.poll();
            if (!visited.contains(node)) {
                visited.add(node);
                System.out.println(node);
                queue.addAll(graph.getOrDefault(node, Collections.emptyList()));
            }
        }
    }
}`,

    c: `#include <stdio.h>
#include <stdlib.h>

void bfs(int graph[][10], int start, int n) {
    int queue[10], front = 0, rear = 0, visited[10] = {0};
    queue[rear++] = start;
    visited[start] = 1;
    
    while (front < rear) {
        int node = queue[front++];
        printf("%d ", node);
        
        for (int i = 0; i < n; i++) {
            if (graph[node][i] && !visited[i]) {
                queue[rear++] = i;
                visited[i] = 1;
            }
        }
    }
}`,

    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void BFS(Dictionary<string, List<string>> graph, string start) {
        Queue<string> queue = new Queue<string>();
        HashSet<string> visited = new HashSet<string>();
        queue.Enqueue(start);
        
        while (queue.Count > 0) {
            string node = queue.Dequeue();
            if (!visited.Contains(node)) {
                visited.Add(node);
                Console.WriteLine(node);
                foreach (var neighbor in graph[node]) {
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
}`,

    javascript: `function bfs(graph, start) {
  let queue = [start];
  let visited = new Set();
  
  while (queue.length > 0) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      queue.push(...(graph[node] || []));
    }
  }
}`,

    go: `package main

import "fmt"

func bfs(graph map[string][]string, start string) {
    queue := []string{start}
    visited := make(map[string]bool)
    
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        if !visited[node] {
            visited[node] = true
            fmt.Println(node)
            queue = append(queue, graph[node]...)
        }
    }
}`,
  },

  dfs: {
    python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    if start not in visited:
        visited.add(start)
        print(start)
        for neighbor in graph.get(start, []):
            dfs(graph, neighbor, visited)`,

    cpp: `#include <iostream>
#include <unordered_set>
#include <map>
#include <vector>

using namespace std;

void dfs(map<string, vector<string>> &graph, string node, unordered_set<string> &visited) {
    if (visited.find(node) != visited.end()) return;
    visited.insert(node);
    cout << node << endl;
    for (string neighbor : graph[node]) {
        dfs(graph, neighbor, visited);
    }
}

void startDFS(map<string, vector<string>> &graph, string start) {
    unordered_set<string> visited;
    dfs(graph, start, visited);
}`,

    java: `import java.util.*;

public class DFS {
    public static void dfs(Map<String, List<String>> graph, String node, Set<String> visited) {
        if (visited.contains(node)) return;
        visited.add(node);
        System.out.println(node);
        for (String neighbor : graph.getOrDefault(node, Collections.emptyList())) {
            dfs(graph, neighbor, visited);
        }
    }

    public static void startDFS(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        dfs(graph, start, visited);
    }
}`,

    c: `#include <stdio.h>

void dfs(int graph[][10], int node, int visited[], int n) {
    if (visited[node]) return;
    visited[node] = 1;
    printf("%d ", node);
    for (int i = 0; i < n; i++) {
        if (graph[node][i] && !visited[i]) {
            dfs(graph, i, visited, n);
        }
    }
}`,

    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void DFS(Dictionary<string, List<string>> graph, string node, HashSet<string> visited) {
        if (visited.Contains(node)) return;
        visited.Add(node);
        Console.WriteLine(node);
        foreach (var neighbor in graph[node]) {
            DFS(graph, neighbor, visited);
        }
    }

    static void StartDFS(Dictionary<string, List<string>> graph, string start) {
        HashSet<string> visited = new HashSet<string>();
        DFS(graph, start, visited);
    }
}`,

    javascript: `function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  (graph[node] || []).forEach(neighbor => dfs(graph, neighbor, visited));
}`,

    go: `package main

import "fmt"

func dfs(graph map[string][]string, node string, visited map[string]bool) {
    if visited[node] {
        return
    }
    visited[node] = true
    fmt.Println(node)
    for _, neighbor := range graph[node] {
        dfs(graph, neighbor, visited)
    }
}

func startDFS(graph map[string][]string, start string) {
    visited := make(map[string]bool)
    dfs(graph, start, visited)
}`,
  },
};

export const graphData: Record<string, string[]> = {
  "1": ["2", "3", "4"],
  "2": ["5", "6"],
  "3": ["7", "8"],
  "4": ["9"],
  "5": ["10"],
  "6": ["11", "12"],
  "7": [],
  "8": ["13", "14"],
  "9": ["15", "16"],
  "10": [],
  "11": ["17"],
  "12": [],
  "13": ["18"],
  "14": [],
  "15": [],
  "16": ["19", "20"],
  "17": [],
  "18": [],
  "19": [],
  "20": []
};

