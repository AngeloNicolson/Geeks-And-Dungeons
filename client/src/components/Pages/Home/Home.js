import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

// EFFECTS
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

// PAGE ELEMENTS
import Annotation from "./3dElements/Annotation";
import Wolf from "./3dElements/Wolf";
import HangarModel from "./3dElements/Hangar";
import GlowingEyes from "./3dElements/GlowingEyes";
import Camera from "./Camera/Camera";

const HomePage = () => {
  const [activeAnnotation, setActiveAnnotation] = useState("about-the-project");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [cameraRotation, setCameraRotation] = useState([0.4, 3.2, 0]);
  const [cameraTarget, setCameraTarget] = useState([-2, 30, -27]);

  // Function to handle clicking an annotation
  const handleAnnotationClick = (annotationName) => {
    setActiveAnnotation(annotationName);
    setShowAnnotation(false);
  };

  // Function to handle clicking the close button
  const handleAnnotationClose = () => {
    setActiveAnnotation(null);
    setCameraRotation([0.4, 3.2, 0]);
    setCameraTarget([-2, 30, -27]);
  };

  const handleAnimationComplete = () => {
    setShowAnnotation(true);
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
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

          {/* Controls and Camera */}
          <PerspectiveCamera
            makeDefault
            fov={30}
            position={cameraTarget}
            rotation={cameraRotation}
            onAnnotationClick={handleAnnotationClick}
          />

          {/* Models */}
          <Wolf castShadow receiveShadow />
          <GlowingEyes />
          <HangarModel castShadow receiveShadow />

          {/* Annotations */}
          <Camera
            target={[0, 13, 34]} // Setting the target position for about-me annotation
            rotation={[0.1, 0, 0]} // Setting the target rotation for about-me annotation
            active={activeAnnotation === "about-me"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "about-me" && (
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
          <Camera
            target={[-40, 1, 60]} // Setting the target position for about-the-project annotation
            rotation={[0.2, -0.5, 0.1]} // Setting the target rotation for about-the-project annotation
            active={activeAnnotation === "about-the-project"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "about-the-project" && (
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
          <Camera
            target={[-3, 10, 22]} // Setting the target position for my-interests annotation
            rotation={[-0.1, 0, 0]} // Setting the target rotation for my-interests annotation
            active={activeAnnotation === "my-interests"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "my-interests" && (
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
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default HomePage;
