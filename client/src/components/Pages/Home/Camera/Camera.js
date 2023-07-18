import React, { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ELEMENTS
import Hud from "../Hud/Hud";

const Camera = ({
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
      // Only update camera rotation if the animation is complete
      if (!cameraAnimating || !animationCompleted) return;

      mouse.x = (event.clientX - windowHalfX) / windowHalfX;
      mouse.y = (event.clientY - windowHalfY) / windowHalfY;

      // Calculate the delta movement from the last recorded mouse position
      const deltaMove = {
        x: mouse.x - lastMousePosition.x,
        y: mouse.y - lastMousePosition.y,
      };

      // Adjust camera rotation based on mouse movement
      const minRotationX = -0.5;
      const maxRotationX = 0.5;
      const minRotationY = -0.5;
      const maxRotationY = 0.5;
      camera.rotation.x = THREE.MathUtils.clamp(
        rotation[0] + deltaMove.y * 0.01,
        minRotationX,
        maxRotationX
      );
      camera.rotation.y = THREE.MathUtils.clamp(
        rotation[1] + deltaMove.x * 0.01,
        minRotationY,
        maxRotationY
      );

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
