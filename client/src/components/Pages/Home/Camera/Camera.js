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
      const elapsed = (currentTime - startTime) / 850;

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
        }, 500);
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

       I have had to dissable this as it causes the text to flicker on the annotations. 
       Dissapointed but will need to think of a solution like rotating the anotations with camera, 
       But this task is to large for now With DI terms
----------------------------------------
*/

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     if (!cameraAnimating || !animationCompleted) return;

  //     const minRotationX = -Math.PI; // Minimum rotation angle around X-axis (approximately -180 degrees)
  //     const maxRotationX = Math.PI; // Maximum rotation angle around X-axis (approximately 180 degrees)
  //     const minRotationY = -Math.PI; // Minimum rotation angle around Y-axis (approximately -180 degrees)
  //     const maxRotationY = Math.PI; // Maximum rotation angle around Y-axis (approximately 180 degrees)
  //     const minRotationZ = -Math.PI; // Minimum rotation angle around Z-axis (approximately -180 degrees)
  //     const maxRotationZ = Math.PI; // Maximum rotation angle around Z-axis (approximately 180 degrees)

  //     mouse.x = (event.clientX - windowHalfX) / windowHalfX;
  //     mouse.y = (event.clientY - windowHalfY) / windowHalfY;

  //     // Calculate the delta movement from the last recorded mouse position
  //     const deltaMove = {
  //       x: mouse.x - lastMousePosition.x,
  //       y: mouse.y - lastMousePosition.y,
  //     };

  //     // If Mouse movement is small, no need to update camera rotation
  //     if (Math.abs(deltaMove.x) < 0.01 && Math.abs(deltaMove.y) < 0.01) {
  //       return;
  //     }

  //     const rotationSpeed = 0.005; // Adjust this value to control rotation sensitivity

  //     // Calculate the new rotation angles based on mouse movement
  //     const newRotationX = THREE.MathUtils.clamp(
  //       rotation[0] + deltaMove.y * rotationSpeed,
  //       minRotationX,
  //       maxRotationX
  //     );
  //     const newRotationY = THREE.MathUtils.clamp(
  //       rotation[1] + deltaMove.x * rotationSpeed,
  //       minRotationY,
  //       maxRotationY
  //     );

  //     // Calculate the delta movement around the z-axis and update the rotation
  //     const deltaMoveZ =
  //       Math.sqrt(deltaMove.x * deltaMove.x + deltaMove.y * deltaMove.y) *
  //       rotationSpeed;
  //     const newRotationZ = THREE.MathUtils.clamp(
  //       rotation[2] + deltaMoveZ,
  //       minRotationZ,
  //       maxRotationZ
  //     );

  //     // Set the camera's rotation using Euler angles
  //     camera.rotation.set(newRotationX, newRotationY, newRotationZ);

  //     // Update the last recorded mouse position
  //     setLastMousePosition({ x: mouse.x, y: mouse.y });
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // });

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
