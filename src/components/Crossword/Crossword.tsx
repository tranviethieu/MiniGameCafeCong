import React from "react";
import styles from "./Crossword.module.scss";
import { Flex } from "antd";

const Crossword: React.FC = () => {
  const crosswordGrid = [
    ["", "", "3", "4", "5", "6", "7", "8", "", ""], // Hàng 1
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""], // Hàng 2
    ["1", "2", "3", "4", "5", "6", "7", "8", "", ""], // Hàng 3
    ["", "", "", "", "5", "6", "7", "8", "", ""], // Hàng 4
    ["1", "2", "3", "4", "5", "6", "7", "", "", ""], // Hàng 5
    ["", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // Hàng 6
    ["", "", "3", "4", "5", "6", "7", "8", "9", ""], // Hàng 7
    ["", "", "3", "4", "5", "6", "", "", "", ""], // Hàng 8
  ];

  return (
    <div className={styles["crossword-container"]}>
      {crosswordGrid.map((row, rowIndex) => (
        <Flex gap={10}>
          <h3>{rowIndex + 1}</h3>
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`${styles.cell} ${
                  cell ? styles.vertical : styles.empty
                }`}
              >
                {cell}
              </div>
            ))}
          </div>
        </Flex>
      ))}
    </div>
  );
};

export default Crossword;
