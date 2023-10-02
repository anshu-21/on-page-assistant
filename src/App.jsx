/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import "./App.css";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoverMessage, setHoverMessage] = useState("");

  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const handleButtonHover = (buttonNumber, backgroundColor) => {
    setHoveredButton(buttonNumber);

    setHoverMessage(
      `This button will change the background to ${backgroundColor}`
    );
  };

  const handleButtonHoverEnd = () => {
    setHoveredButton(null);
  };

  const buttons = [
    { backgroundColor: "#FF5733" },
    { backgroundColor: "#33FF57" },
    { backgroundColor: "#5733FF" },
    { backgroundColor: "#FFFF33" },
    { backgroundColor: "#33FFFF" },
    { backgroundColor: "#FF33FF" },
  ];

  const fbx = useLoader(FBXLoader, "/Talking.fbx");

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="button-container">
        {buttons.map((button, index) => (
          <button
            key={index}
            onMouseEnter={() =>
              handleButtonHover(index + 1, button.backgroundColor)
            }
            onMouseLeave={handleButtonHoverEnd}
            onClick={() => changeBackgroundColor(button.backgroundColor)}
          >
            Button {index + 1}
          </button>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <Canvas
          camera={{ position: [0, 0, 10] }}
          style={{ height: "100vh", width: "100vw" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 0, 10]} />

          <primitive object={fbx} scale={0.01} position={[-6, -4, 0]} />
          <Text
            fontSize={0.5}
            position={[-8, -3, -5]}
            anchorX="left"
            anchorY="bottom"
            material-color="black"
            material-roughness={0.1}
          >
            {hoverMessage ? hoverMessage : `Hi I am your on-page Assistant`}
          </Text>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
