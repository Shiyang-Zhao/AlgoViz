import React from "react";
import Editor from "@monaco-editor/react";
import { algorithms } from "../components/graphConfig";

const CodeEditor = ({
  algorithm,
  language,
}: {
  algorithm: string;
  language: string;
}) => {
  const monacoLangMap: Record<string, string> = {
    python: "python",
    cpp: "cpp",
    java: "java",
    c: "c",
    csharp: "csharp",
    javascript: "javascript",
    go: "go",
  };

  return (
    <Editor
      defaultLanguage={monacoLangMap[language] || "javascript"}
      value={algorithms[algorithm][language]}
      options={{ readOnly: true }}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
