import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const HangarModel = () => {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/Hanger_V2.gltf");

  // Rotate the Hangar model 180 degrees around the Y-axis
  scene.rotation.y = Math.PI;

  // Configure materials to prevent light bleed
  scene.traverse((child) => {
    if (child.isMesh) {
      // Make sure the mesh is not double-sided
      child.material.side = THREE.FrontSide;

      // Set the material's shadowSide to DoubleSide to receive shadows from both sides
      child.material.shadowSide = THREE.DoubleSide;

      // Enable shadow casting and receiving for the mesh
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} receiveShadow castShadow />;
};

export default HangarModel;
