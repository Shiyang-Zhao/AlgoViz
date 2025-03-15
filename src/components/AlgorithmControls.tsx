import React from "react";

const AlgorithmControls = ({
  algorithm,
  language,
  setAlgorithm,
  setLanguage,
  runAlgorithm,
  isRunning,
}: {
  algorithm: "bfs" | "dfs";
  language: string;
  setAlgorithm: (alg: "bfs" | "dfs") => void;
  setLanguage: (lang: string) => void;
  runAlgorithm: () => void;
  isRunning: boolean;
}) => {
  return (
    <div className="flex gap-4 items-center">
      {/* Algorithm Selection */}
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as "bfs" | "dfs")}
        disabled={isRunning}
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
      </select>

      {/* Language Selection */}
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        disabled={isRunning}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="csharp">C#</option>
        <option value="go">Go</option>
      </select>

      {/* Run Button */}
      <button
        className={`${
          isRunning 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-green-500 hover:bg-green-600"
        } text-white px-4 py-2 rounded transition`}
        onClick={runAlgorithm}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Run"}
      </button>
    </div>
  );
};

export default AlgorithmControls;