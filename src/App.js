import React, { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
function App() {
  const [tool, setTool] = useState("");
  const [rectCoordinate, setRectCoordinate] = useState([]);
  const [newRectCoordinate, setNewRectCoordinate] = useState([]);

  const handleMouseDown = (event) => {
    if (tool === "rectangle") {
      if (newRectCoordinate.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewRectCoordinate([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };
  const handleMouseMove = (event) => {
    if (newRectCoordinate.length === 1) {
      const sx = newRectCoordinate[0].x;
      const sy = newRectCoordinate[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewRectCoordinate([
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
    if (newRectCoordinate.length === 1) {
      const sx = newRectCoordinate[0].x;
      const sy = newRectCoordinate[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: rectCoordinate.length + 1,
      };
      rectCoordinate.push(annotationToAdd);
      setNewRectCoordinate([]);
      setRectCoordinate(rectCoordinate);
    }
  };
  const drawRect = [...rectCoordinate, ...newRectCoordinate];
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
          {drawRect.map((value, i) => {
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
}

export default App;
