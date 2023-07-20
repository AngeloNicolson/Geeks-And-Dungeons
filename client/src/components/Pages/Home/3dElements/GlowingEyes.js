import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const GlowingEyes = () => {
  const eyesModelGLTF = useGLTF(
    process.env.PUBLIC_URL + "/models/Wolf_Eyes.gltf"
  );
  const eyesMesh = eyesModelGLTF.scene;

  // Create a new material with emissive properties for the glowing effect
  const glowingMaterial = new THREE.MeshPhysicalMaterial({
    color: "orange", // Set the color of the glass (adjust as needed)
    emissive: "red", // Set the emissive color for the glowing effect
    emissiveIntensity: 20, // Set the emissive intensity (adjust as needed)
    // side: THREE.DoubleSide, // Set the side to DoubleSide to render the inside and outside
    transparent: true, // Enable transparency for the glass effect
    transmission: 0.8, // Set the transmission for the glass effect (adjust as needed)
  });

  // Traverse the entire mesh and assign the glowing material to all child meshes
  eyesMesh.traverse((child) => {
    if (child.isMesh) {
      child.material = glowingMaterial;
    }
  });

  return (
    <>
      {/* Render the eyes model */}
      <primitive object={eyesMesh} position={[-2, 1, 10]} castShadows />
    </>
  );
};

export default GlowingEyes;
