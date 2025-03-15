import React, { useEffect, useRef, useState } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import { graphData } from "./graphConfig";
import { DataSet } from "vis-data";

interface NodeData {
  id: string;
  label: string;
  shape?: "circle" | "box" | "ellipse" | "database" | "text" | "diamond";
  color?:
    | string
    | {
        border: string;
        background: string;
        highlight: { border: string; background: string };
        hover: { border: string; background: string };
      };
  font?: {
    size?: number;
    color?: string;
    face?: string;
    vadjust?: number;
    bold?: string | { color: string; size: number; face: string };
  };
  borderWidth?: number;
}

interface ExtendedNetwork extends Network {
  body: {
    data: {
      nodes: DataSet<NodeData, "id">;
    };
  };
}

const GraphView = ({ order, isRunning, setIsRunning }: { 
  order: string[]; 
  isRunning: boolean;
  setIsRunning: (state: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<ExtendedNetwork | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const animationRef = useRef<{ cancel: boolean; running: boolean }>({ cancel: false, running: false });
  const orderRef = useRef<string[]>([]);

  // Update the orderRef when order changes
  useEffect(() => {
    orderRef.current = order;
  }, [order]);

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

    return () => {
      // Cleanup function
      animationRef.current.cancel = true;
    };
  }, []);

  // Start traversal when isRunning becomes true
  useEffect(() => {
    if (!isRunning || !networkRef.current || order.length === 0) return;

    // If another animation is already running, cancel it first
    if (animationRef.current.running) {
      animationRef.current.cancel = true;
      // Give a small delay to ensure the previous animation cleans up
      setTimeout(() => {
        animationRef.current = { cancel: false, running: false };
        startTraversal();
      }, 100);
    } else {
      startTraversal();
    }

    function startTraversal() {
      const network = networkRef.current;
      if (!network) return;

      // Mark as running
      animationRef.current.running = true;
      animationRef.current.cancel = false;

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
        setCurrentStep(-1);  // Reset step indicator

        // Use the current order from the ref to prevent closure issues
        const currentOrder = [...orderRef.current];

        for (let i = 0; i < currentOrder.length; i++) {
          // Check if animation should be canceled
          if (animationRef.current.cancel) {
            break;
          }

          const nodeId = currentOrder[i];
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

          // Wait for animation
          await new Promise((resolve) => {
            const timeout = setTimeout(resolve, 1000);
            // Store the timeout to be able to clear it if canceled
            return () => clearTimeout(timeout);
          });

          // If canceled, break out of the loop
          if (animationRef.current.cancel) {
            break;
          }

          // Visited node color
          network.body.data.nodes.update({
            id: nodeId,
            color: { background: "#2ecc71" },
          });
        }

        // Clean up after traversal completes or is canceled
        network.unselectAll();
        animationRef.current.running = false;
        setCurrentStep(-1);
        setIsRunning(false);
      };

      highlightTraversal();
    }

    // Cleanup function for this effect
    return () => {
      // We don't cancel the animation here anymore
      // This prevents cancellation when the component re-renders
    };
  }, [isRunning, setIsRunning, order]);

  return (
    <div className="relative w-full h-full border rounded-lg shadow-lg">
      <div ref={containerRef} className="w-full h-full" />
      {currentStep >= 0 && currentStep < orderRef.current.length && (
        <div className="absolute bottom-2 left-2 bg-white px-3 py-2 rounded-lg shadow text-sm font-medium text-gray-700">
          Traversing Node:{" "}
          <span className="font-bold">{orderRef.current[currentStep]}</span> (
          {currentStep + 1}/{orderRef.current.length})
        </div>
      )}
    </div>
  );
};

export default GraphView;