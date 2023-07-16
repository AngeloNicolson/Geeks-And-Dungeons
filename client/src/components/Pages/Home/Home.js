import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  SoftShadows,
} from "@react-three/postprocessing";
import * as THREE from "three";
import Annotation from "./Annotation";
import Wolf from "./Wolf";
import HangarModel from "./Hangar";
import GlowingEyes from "./GlowingEyes";
import Menu from "./Menu";
import Camera from "./Camera";

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const HomePage = () => {
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  // Function to handle clicking an annotation
  const handleAnnotationClick = (annotationName) => {
    setActiveAnnotation(annotationName);
  };

  // Function to handle clicking the close button
  const handleAnnotationClose = () => {
    setActiveAnnotation(null);
  };

  return (
    <>
      {/* Render the menu */}
      <Menu onAnnotationClick={handleAnnotationClick} />
      <div style={{ height: "100vh" }}>
        {/* HTML menu */}
        <Canvas shadows gl={{ alpha: false }} style={{ background: "black" }}>
          <EffectComposer>
            <DepthOfField
              focusDistance={0.04}
              focalLength={0.01}
              bokehScale={1}
              height={1080}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1} />
          </EffectComposer>

          {/* Lights */}
          <group>
            <pointLight
              color="orange"
              position={[0, 0, 20]}
              intensity={1}
              distance={20}
              decay={1}
              castShadow
            />
            <spotLight
              position={[-2, 20, 40]}
              angle={1}
              penumbra={1}
              intensity={0.1}
              distance={77}
              castShadow
            />
            <pointLight
              position={[-57, 50, -55]}
              intensity={0.5}
              distance={77}
              decay={1}
              color="orange"
            />
            <pointLight
              position={[-48, 2, -68]}
              intensity={0.5}
              distance={15}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[57, 50, -55]}
              intensity={0.5}
              distance={77}
              decay={1}
              color="orange"
            />
          </group>

          {/* Elevator Lights */}
          <group>
            <pointLight
              position={[48, 2, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[53, 7, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[58, 12, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />

            <pointLight
              position={[63, 17, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[68, 22, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[73, 27, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[78, 32, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            {/* <pointLight
            position={[48, 16, -57]}
            intensity={0.5}
            distance={15}
            decay={1}
            color="#7395C8"
          />
          <pointLight
            position={[48, 22, -57]}
            intensity={0.5}
            distance={15}
            decay={1}
            color="#7395C8"
          /> */}
          </group>

          {/* Controls and Camera */}
          {/* <OrbitControls maxPolarAngle={10} enablePan={true} PanSpeed={0.5} /> */}
          <PerspectiveCamera
            makeDefault
            fov={30}
            // position={[-2, 10, 30]}
            // rotation={[50, 5, 50]}
          />

          {/* Models */}
          <Wolf castShadow receiveShadow />
          <GlowingEyes />
          <HangarModel castShadow receiveShadow />

          {/* Soft Shadows */}
          {/* <SoftShadows samples={3} /> */}
          {/* Annotation */}
          <Camera
            target={[0, 13, 34]} // Set the target position for about-me annotation
            rotation={[0.1, 0, 0]} // Set the target rotation for about-me annotation
            active={activeAnnotation === "about-me"}
          />
          {activeAnnotation === "about-me" && (
            <Annotation position={[5, 15, 18]} onClose={handleAnnotationClose}>
              <p style={{ fontSize: "0.5rem", color: "white" }}>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
              <span style={{ fontSize: "1.5em" }}>🌖</span>
            </Annotation>
          )}
          {activeAnnotation === "about-the-project" && (
            <Annotation
              position={[1.75, 3, 2.5]}
              onClose={handleAnnotationClose}
            >
              <p style={{ fontSize: "0.5rem", color: "white" }}>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>{" "}
              <span style={{ fontSize: "1.5em" }}>🌗</span>
            </Annotation>
          )}
          {activeAnnotation === "my-interests" && (
            <Annotation position={[-2, 8, 5]} onClose={handleAnnotationClose}>
              <p style={{ fontSize: "0.5rem", color: "white" }}>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
              <span style={{ fontSize: "0.5rem" }}>🌕</span>
            </Annotation>
          )}
          {/* Use the Camera component */}

          <Camera
            target={[-40, 1, 60]} // Set the target position for about-the-project annotation
            rotation={[0.2, -0.5, 0.1]} // Set the target rotation for about-the-project annotation
            active={activeAnnotation === "about-the-project"}
          />

          <Camera
            target={[-3, 10, 22]} // Set the target position for my-interests annotation
            rotation={[-0.1, 0, 0]} // Set the target rotation for my-interests annotation
            active={activeAnnotation === "my-interests"}
          />
        </Canvas>
      </div>
    </>
  );
};

export default HomePage;
