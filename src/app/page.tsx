"use client";

import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import GraphView from "../components/GraphView";
import AlgorithmControls from "../components/AlgorithmControls";
import { graphData } from "../components/graphConfig";

export default function GraphVisualizer() {
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs");
  const [language, setLanguage] = useState<string>("javascript"); // Kept as a string
  const [order, setOrder] = useState<string[]>([]);

  const runAlgorithm = () => {
    const visited = new Set<string>();
    const traversalOrder: string[] = [];

    if (algorithm === "bfs") {
      let queue: string[] = ["1"];
      while (queue.length > 0) {
        let node = queue.shift();
        if (node && !visited.has(node)) {
          visited.add(node);
          traversalOrder.push(node);
          queue.push(...(graphData[node] || []));
        }
      }
    } else {
      const dfs = (node: string) => {
        if (visited.has(node)) return;
        visited.add(node);
        traversalOrder.push(node);
        (graphData[node] || []).forEach(dfs);
      };
      dfs("1");
    }

    setOrder(traversalOrder);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left side: Code Editor */}
      <div className="w-1/2 h-full flex flex-col">
        {/* Header with Title and Controls */}
        <div className="flex items-center justify-between px-6 py-2">
          <h2 className="text-xl font-bold">
            {algorithm.toUpperCase()} Algorithm
          </h2>
          <AlgorithmControls
            algorithm={algorithm}
            language={language}
            setAlgorithm={setAlgorithm}
            setLanguage={setLanguage} // Accepts a string
            runAlgorithm={runAlgorithm}
          />
        </div>

        {/* Code Editor */}
        <div className="flex-grow h-full">
          <CodeEditor algorithm={algorithm} language={language} />
        </div>
      </div>

      {/* Right side: Graph View */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-full h-full">
          <GraphView order={order} />
        </div>
      </div>
    </div>
  );
}
