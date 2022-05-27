import "./styles.css";
import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";
import styled from "styled-components";
import { useEffect, useState } from "react";

Cytoscape.use(COSEBilkent);

const layout = {
  name: "cose-bilkent",
  nodeDimensionsIncludeLabels: true,
  edgeElasticity: 0.1
};

const cytoscapeStylesheet = [
  {
    selector: "node",
    style: {
      "background-color": "#43447a",
      width: "label",
      height: "label",
      padding: "6px",
      shape: "round-rectangle"
    }
  },
  {
    selector: "node[label]",
    style: {
      label: "data(label)",
      "font-size": "12",
      color: "white",
      "text-halign": "center",
      "text-valign": "center"
    }
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      width: 1.5
    }
  },
  {
    selector: "edge[label]",
    style: {
      label: "data(label)",
      "font-size": "12",

      "text-background-color": "white",
      "text-background-opacity": 1,
      "text-background-padding": "2px",

      "text-border-color": "black",
      "text-border-style": "solid",
      "text-border-width": 0.5,
      "text-border-opacity": 1

      // "text-rotation": "autorotate"
    }
  }
];
const elements = [
  { data: { id: "Assigned", label: "Assigned" } },
  { data: { id: "Created", label: "Created" } },
  { data: { id: "Started", label: "Started" } },
  { data: { id: "On Hold", label: "On Hold" } },
  { data: { id: "Completed", label: "Completed" } },
  { data: { id: "Approved", label: "Approved" } },
  { data: { source: "Created", target: "Assigned", label: "assign" } },
  { data: { source: "Assigned", target: "Started", label: "start" } },
  { data: { source: "On Hold", target: "Started", label: "start" } },
  { data: { source: "Started", target: "On Hold", label: "hold" } },
  { data: { source: "Started", target: "Completed", label: "complete" } },
  { data: { source: "Completed", target: "Approved", label: "approve" } }
];

const patientA = [];

export default function App() {
  const [reset, setReset] = useState(true);
  const reRendering = () => {
    reset ? setReset(false) : setReset(true);
  };

  return (
    <div className="App">
      <Wrapper>
        <button onClick={() => (reset ? setReset(false) : setReset(true))}>
          정렬
        </button>
        <CytoscapeComponent
          key={reset}
          elements={elements}
          layout={layout}
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
            width: "100%"
          }}
          stylesheet={cytoscapeStylesheet}
        />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  position: relative;
  border: 1px solid black;
  button {
    position: absolute;
    right: 0;
    z-index: 10;
  }
  > div > div > canvas {
    position: absolute;
    left: 0;
  }
`;
