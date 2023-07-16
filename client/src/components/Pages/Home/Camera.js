import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Camera = ({ target, rotation, active }) => {
  const cameraRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (!active) return;

    const targetPosition = new THREE.Vector3(...target);
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...rotation)
    );

    // Animate camera position only, not rotation
    const initialCameraPosition = camera.position.clone();
    const duration = 1.5; // Animation duration in seconds
    const startTime = Date.now();

    const animateCamera = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      // Perform the animation using linear interpolation
      const t = Math.min(elapsed / duration, 1);
      camera.position.lerpVectors(initialCameraPosition, targetPosition, t);

      if (t < 1) {
        // Continue animation until t reaches 1
        requestAnimationFrame(animateCamera);
      }
    };

    // Start the camera animation
    animateCamera();

    // Set the camera's quaternion to match the target rotation immediately
    camera.quaternion.set(
      targetQuaternion.x,
      targetQuaternion.y,
      targetQuaternion.z,
      targetQuaternion.w
    );

    return () => {
      // Reset the camera to the original position and rotation
      camera.position.copy(initialCameraPosition);
      camera.quaternion.setFromEuler(
        new THREE.Euler(...camera.rotation.toArray())
      );
    };
  }, [active, camera, rotation, target]);

  return null; // We don't render anything for this component
};

export default Camera;
