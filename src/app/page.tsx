"use client";

import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import GraphView from "../components/GraphView";
import AlgorithmControls from "../components/AlgorithmControls";
import { graphData } from "../components/graphConfig";

export default function GraphVisualizer() {
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs");
  const [language, setLanguage] = useState<string>("javascript");
  const [order, setOrder] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const changeAlgorithm = (alg: "bfs" | "dfs") => {
    // Stop any running traversal when changing algorithms
    if (isRunning) {
      setIsRunning(false);
    }
    setAlgorithm(alg);
  };
  
  const runAlgorithm = () => {
    // If already running, don't start another traversal
    if (isRunning) return;
    
    const visited = new Set<string>();
    const traversalOrder: string[] = [];

    if (algorithm === "bfs") {
      const queue: string[] = ["1"];
      while (queue.length > 0) {
        const node = queue.shift();
        if (node && !visited.has(node)) {
          visited.add(node);
          traversalOrder.push(node);
          const neighbors = graphData[node] || [];
          // For BFS, we need to sort the neighbors to ensure consistent visual traversal
          queue.push(...neighbors);
        }
      }
    } else {
      const dfs = (node: string) => {
        if (visited.has(node)) return;
        visited.add(node);
        traversalOrder.push(node);
        const neighbors = graphData[node] || [];
        neighbors.forEach(dfs);
      };
      dfs("1");
    }

    // Set order first, then set isRunning to trigger the animation
    setOrder(traversalOrder);
    // Use a short timeout to ensure React updates the order first
    setTimeout(() => {
      setIsRunning(true);
    }, 50);
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
            setAlgorithm={changeAlgorithm}
            setLanguage={setLanguage}
            runAlgorithm={runAlgorithm}
            isRunning={isRunning}
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
          <GraphView 
            order={order} 
            isRunning={isRunning} 
            setIsRunning={setIsRunning} 
          />
        </div>
      </div>
    </div>
  );
}