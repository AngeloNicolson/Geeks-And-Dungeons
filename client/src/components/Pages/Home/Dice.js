import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

const Dice = ({ isDropped }) => {
  const diceRef = useRef();
  const velocity = useRef(0);

  useFrame(({ clock }) => {
    if (isDropped && diceRef.current) {
      velocity.current += 9.8 * clock.getDelta(); // Increase the velocity based on gravity (9.8 m/s^2)
      diceRef.current.position.y -= velocity.current;

      // Check if the dice collides with the plane
      if (diceRef.current.position.y <= -0.5) {
        diceRef.current.position.y = -0.5; // Set the dice's position just above the plane
        velocity.current = 0; // Stop the dice from moving
      }
    }
  });

  return (
    <group>
      <mesh ref={diceRef} castShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={isDropped ? "red" : "blue"} />
      </mesh>
      {isDropped && (
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <planeBufferGeometry args={[1, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      )}
    </group>
  );
};

export default Dice;
