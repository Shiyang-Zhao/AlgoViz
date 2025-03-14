import React from "react";

const AlgorithmControls = ({
  algorithm,
  language,
  setAlgorithm,
  setLanguage,
  runAlgorithm,
}: {
  algorithm: "bfs" | "dfs";
  language: string;
  setAlgorithm: (alg: "bfs" | "dfs") => void;
  setLanguage: (lang: string) => void;
  runAlgorithm: () => void;
}) => {
  return (
    <div className="flex gap-4 items-center">
      {/* Algorithm Selection */}
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as "bfs" | "dfs")}
      >
        <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
      </select>

      {/* Language Selection */}
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        value={language}
        onChange={(e) => setLanguage(e.target.value)} // No type assertion needed
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
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
        onClick={runAlgorithm}
      >
        Run
      </button>
    </div>
  );
};

export default AlgorithmControls;
