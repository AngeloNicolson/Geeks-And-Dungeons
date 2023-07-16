import React from "react";
import { Html } from "@react-three/drei";

function Annotation({ children, onClose, ...props }) {
  return (
    <Html
      {...props}
      transform
      occlude="blending"
      //   geometry={<roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />}
    >
      <div className="annotation">
        {" "}
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </Html>
  );
}

export default Annotation;
