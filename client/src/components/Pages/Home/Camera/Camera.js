import React, { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// ELEMENTS
import Hud from "../Hud/Hud";

const Camera = ({
  fov,
  target,
  rotation,
  active,
  onAnimationComplete,
  onAnnotationClick,
}) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const [cameraAnimating, setCameraAnimating] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  // Get window dimentions for the mouse detection
  const windowHalfY = window.innerHeight / 2;
  const windowHalfX = window.innerWidth / 2;

  const mouse = new THREE.Vector2();
  const targetQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(...rotation)
  );

  /* 
----------------------------------------
            CAMERA ANIMATION
----------------------------------------
*/
  useEffect(() => {
    if (!active) {
      // Reset animation status and completion whenever active prop changes
      setCameraAnimating(false);
      setAnimationCompleted(false);
      return;
    }

    const targetPosition = new THREE.Vector3(...target);

    // Animate camera position and rotation
    const initialCameraPosition = camera.position.clone();
    const initialCameraQuaternion = camera.quaternion.clone();
    const duration = 1; // Animation duration in seconds
    const startTime = Date.now();

    const animateCamera = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 900;

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
        setCameraAnimating(true); // Set the animation status to true during the animation
        requestAnimationFrame(animateCamera);
      } else {
        setCameraAnimating(false); // Animation is complete, set the status to false
        setTimeout(() => {
          setAnimationCompleted(true); // Set animation completion status to true
          onAnimationComplete(); // Call the onAnimationComplete to trigger annotation render
        }, 300);
      }
    };

    // Start the camera animation
    animateCamera();
  }, [
    active,
    camera,
    rotation,
    target,
    cameraAnimating,
    animationCompleted,
    targetQuaternion,
    onAnimationComplete,
  ]);

  /* 
----------------------------------------
       DETECT MOUSE MOVEMENT
----------------------------------------
*/
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!cameraAnimating || !animationCompleted) return;

      mouse.x = (event.clientX - windowHalfX) / windowHalfX;
      mouse.y = (event.clientY - windowHalfY) / windowHalfY;

      const rotationSpeed = 0.005; // Adjust this value to control rotation sensitivity
      const targetQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rotation[0], rotation[1], 0, "YXZ")
      );

      const deltaQuaternionX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        -mouse.y * rotationSpeed
      );
      const deltaQuaternionY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -mouse.x * rotationSpeed
      );

      const newQuaternion = targetQuaternion
        .clone()
        .multiply(deltaQuaternionX)
        .multiply(deltaQuaternionY);
      camera.quaternion.copy(newQuaternion);

      // Update the last recorded mouse position
      setLastMousePosition({ x: mouse.x, y: mouse.y });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  /* 
----------------------------------------
              HUD OFFSET
----------------------------------------
*/
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Get the camera's position and rotation
      const cameraPosition = camera.position.clone();
      const cameraRotation = camera.rotation.clone();

      // Calculate the hudOffset based on the camera's rotation
      const hudOffset = new THREE.Vector3(0, 2, -10); // You can adjust the offset values here
      hudOffset.applyEuler(cameraRotation);

      // Calculate the position of the Hud based on the camera's position and rotation
      const hudPosition = cameraPosition.clone().add(hudOffset);

      // Set the position and rotation of the groupRef
      groupRef.current.position.copy(hudPosition);
      groupRef.current.rotation.copy(cameraRotation);
    }
  });

  // Function to update the camera's FOV
  useEffect(() => {
    if (camera && active && fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [active, camera, fov]);

  return (
    <group ref={groupRef}>
      {animationCompleted && (
        <Hud
          onClose={onAnimationComplete}
          onAnnotationClick={onAnnotationClick}
        />
      )}
    </group>
  );
};

export default Camera;
