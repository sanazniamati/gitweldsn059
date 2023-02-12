import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
const DrawAnnotations = () => {
  const [tool, setTool] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const handleMouseDown = (event) => {
    if (tool === "rectangle") {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };
  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };
  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <>
      <input
        type="radio"
        id="line"
        checked={tool === "line"}
        onChange={() => setTool("line")}
      />
      <label htmlFor="line">Line</label>
      <input
        type="radio"
        id="rectangle"
        checked={tool === "rectangle"}
        onChange={() => setTool("rectangle")}
      />
      <label htmlFor="rectangle">Rectangle</label>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {annotationsToDraw.map((value, i) => {
            return (
              <Rect
                key={i}
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill="transparent"
                stroke="black"
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

function App() {
  return (
    <div>
      <DrawAnnotations />
    </div>
  );
}

export default App;
