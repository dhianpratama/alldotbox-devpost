// import styles from "./loading-dots.module.css";

// interface LoadingDotsProps {
//   color?: string;
// }

// const LoadingDots = ({ color = "#000" }: LoadingDotsProps) => {
//   return (
//     <span className={styles.loading}>
//       <span style={{ backgroundColor: color }} />
//       <span style={{ backgroundColor: color }} />
//       <span style={{ backgroundColor: color }} />
//     </span>
//   );
// };

// export default LoadingDots;

"use client"
import styles from "./loading-dots.module.css";
import React from "react";

interface LoadingDotsProps {
  theme?: "dark" | "light";
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ theme = "light" }) => {
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--dot-color", theme === "dark" ? "#fff" : "#000");
  }, [theme]);

  return (
    <span className={styles.loading}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;