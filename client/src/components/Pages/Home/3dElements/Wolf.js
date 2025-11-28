import React from "react";
import { useGLTF } from "@react-three/drei";

const WolfModel = () => {
  const { scene } = useGLTF(
    process.env.PUBLIC_URL + "/models/Wolf_Rework.gltf"
  );

  // Traverse the entire scene and set castShadow to true for all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  return (
    <primitive object={scene} position={[-2, 1, 10]} receiveShadow castShadow />
  );
};

export default WolfModel;
