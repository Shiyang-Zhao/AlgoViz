import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import { graphData } from "./graphConfig";
import { DataSet } from "vis-data";

interface NodeData {
  id: string;
  label: string;
  shape?: string;
  color?: any;
  font?: any;
  borderWidth?: number;
}

interface ExtendedNetwork extends Network {
  body: {
    data: {
      nodes: DataSet<NodeData, "id">;
    };
  };
}

const GraphView = ({ order }: { order: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<ExtendedNetwork | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  useEffect(() => {
    if (containerRef.current) {
      const nodes = Object.keys(graphData).map((id) => ({
        id,
        label: `Node ${id}`,
        shape: "circle",
        color: {
          background: "#ecf0f1",
          border: "#34495e",
          highlight: {
            background: "#e67e22",
            border: "#d35400",
          },
        },
        font: { color: "#34495e", size: 14 },
        borderWidth: 2,
      }));

      const edges = Object.entries(graphData).flatMap(([source, targets]) =>
        targets.map((target) => ({ from: source, to: target }))
      );

      const data = { nodes, edges };
      const options = {
        physics: { stabilization: { iterations: 300 } },
        edges: { arrows: "to", color: "#95a5a6", smooth: true },
        interaction: { hover: true },
      };

      networkRef.current = new Network(
        containerRef.current,
        data,
        options
      ) as ExtendedNetwork;
    }
  }, []);

  useEffect(() => {
    const network = networkRef.current;
    if (!network) return;

    const resetNodeColors = () => {
      network.body.data.nodes.forEach((node) => {
        network.body.data.nodes.update({
          id: node.id,
          color: { background: "#ecf0f1" },
          label: `Node ${node.id}`,
          font: { color: "#34495e", size: 14 },
        });
      });
    };

    const highlightTraversal = async () => {
      resetNodeColors();

      for (let i = 0; i < order.length; i++) {
        const nodeId = order[i];
        setCurrentStep(i);

        network.selectNodes([nodeId]);
        network.focus(nodeId, {
          scale: 1.2,
          animation: { duration: 700, easingFunction: "easeInOutQuad" },
        });

        // Active node color
        network.body.data.nodes.update({
          id: nodeId,
          color: { background: "#e74c3c" },
          label: `Node ${nodeId}\n(${i + 1})`,
          font: { color: "#ffffff", size: 14 },
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Visited node color
        network.body.data.nodes.update({
          id: nodeId,
          color: { background: "#2ecc71" },
        });
      }

      network.unselectAll();
      setCurrentStep(-1);
    };

    highlightTraversal();
  }, [order]);

  return (
    <div className="relative w-full h-full border rounded-lg shadow-lg">
      <div ref={containerRef} className="w-full h-full" />
      {currentStep >= 0 && (
        <div className="absolute bottom-2 left-2 bg-white px-3 py-2 rounded-lg shadow text-sm font-medium text-gray-700">
          Traversing Node:{" "}
          <span className="font-bold">{order[currentStep]}</span> (
          {currentStep + 1}/{order.length})
        </div>
      )}
    </div>
  );
};

export default GraphView;
