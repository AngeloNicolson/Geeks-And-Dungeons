import React from "react";

const GitHubIcon = (props) => {
  return (
    <svg
      width={props.width || "12"}
      height={props.height || "12"}
      viewBox="0 0 24 24"
      fill={props.fill || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.208 11.387.6.111.793-.258.793-.578 0-.285-.011-1.04-.017-2.04-3.34.725-4.042-1.51-4.042-1.51-.546-1.384-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.303 3.495.994.109-.764.42-1.287.76-1.584-2.665-.298-5.466-1.333-5.466-5.93 0-1.311.468-2.381 1.235-3.22-.123-.297-.536-1.522.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.987-.4 3.006-.405 1.02.005 2.047.138 3.006.405 2.29-1.552 3.297-1.23 3.297-1.23.654 1.654.24 2.879.117 3.176.77.84 1.233 1.909 1.233 3.22 0 4.61-2.804 5.63-5.476 5.921.429.373.818 1.102.818 2.222 0 1.603-.015 2.893-.015 3.287 0 .319.192.692.798.577C20.568 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z"
        fill={props.fillColor || "#000"}
      />
    </svg>
  );
};

export default GitHubIcon;
