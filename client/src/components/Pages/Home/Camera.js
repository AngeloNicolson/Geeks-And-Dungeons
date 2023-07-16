import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Camera = ({ target, rotation, active }) => {
  const cameraRef = useRef();
  const { camera } = useThree();
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  const mouse = new THREE.Vector2();

  useEffect(() => {
    if (!active) return;

    const targetPosition = new THREE.Vector3(...target);
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...rotation)
    );

    // Animate camera position and rotation
    const initialCameraPosition = camera.position.clone();
    const initialCameraQuaternion = camera.quaternion.clone();
    const duration = 3; // Animation duration in seconds
    const startTime = Date.now();

    const animateCamera = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      // Perform the position animation using linear interpolation
      const t = Math.min(elapsed / duration, 1);
      camera.position.lerpVectors(initialCameraPosition, targetPosition, t);

      // Perform the rotation animation using spherical linear interpolation (slerp)
      const currentQuaternion = new THREE.Quaternion();
      currentQuaternion.slerpQuaternions(
        initialCameraQuaternion,
        targetQuaternion,
        t
      );
      camera.quaternion.copy(currentQuaternion);

      if (t < 1) {
        // Continue animation until t reaches 1
        requestAnimationFrame(animateCamera);
      }
    };

    // Start the camera animation
    animateCamera();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX - windowHalfX) / windowHalfX;
      mouse.y = (event.clientY - windowHalfY) / windowHalfY;

      // Adjust camera rotation based on mouse movement
      const minRotationX = -0.5;
      const maxRotationX = 0.5;
      const minRotationY = -0.5;
      const maxRotationY = 0.5;
      camera.rotation.x = THREE.MathUtils.clamp(
        rotation[0] + mouse.y * 0.01,
        minRotationX,
        maxRotationX
      );
      camera.rotation.y = THREE.MathUtils.clamp(
        rotation[1] + mouse.x * 0.01,
        minRotationY,
        maxRotationY
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active, camera, rotation, target, windowHalfX, windowHalfY]);

  return null; // We don't render anything for this component
};

export default Camera;
