import React, { useState, useEffect } from "react";
import "../styles/styles.css";

interface CardProps {
  dataImage: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ dataImage, children }) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState<
    number | NodeJS.Timeout | null
  >(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.pageX - e.currentTarget.offsetLeft - width / 2);
    setMouseY(e.pageY - e.currentTarget.offsetTop - height / 2);
  };

  const handleMouseEnter = () => {
    if (mouseLeaveDelay !== null) {
      clearTimeout(mouseLeaveDelay);
      setMouseLeaveDelay(null);
    }
  };

  const handleMouseLeave = () => {
    const delay: NodeJS.Timeout = setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000);
    setMouseLeaveDelay(delay);
  };

  useEffect(() => {
    if (width && height) {
      setWidth(width);
      setHeight(height);
    }
  }, [width, height]);

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card"
        style={{
          backgroundImage: `url(${dataImage})`,
          transform: `rotateY(${(mouseX / width) * 30}deg) rotateX(${
            (mouseY / height) * -30
          }deg)`,
        }}
        ref={(el) => {
          if (el) {
            setWidth(el.offsetWidth);
            setHeight(el.offsetHeight);
          }
        }}
      >
        <div
          className="card-bg"
          style={{
            backgroundImage: `url(${dataImage})`,
            transform: `translateX(${(mouseX / width) * -40}px) translateY(${
              (mouseY / height) * -40
            }px)`,
          }}
        ></div>
        <div className="card-info">{children}</div>
      </div>
    </div>
  );
};

export default Card;
