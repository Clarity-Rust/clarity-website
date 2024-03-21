"use client";
import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState("00:00:00");
  const leftAlign = 0.33;
  const baseOffset = 0.3;
  interface staticText {
    text: string;
    offX: number;
    offY: number;
    color: "black" | "red";
    countdown?: boolean;
  }
  const staticTexts: staticText[] = [
    {
      text: "CLARITY RUST",
      offX: leftAlign + 0.1,
      offY: baseOffset,
      color: "black",
    },
    {
      text: "WARHEAD STATUS: ARMED",
      offX: leftAlign,
      offY: baseOffset + 0.1,
      color: "red",
    },
    {
      text: "WARHEAD COUNT: 1/4",
      offX: leftAlign,
      offY: baseOffset + 0.15,
      color: "red",
    },
    {
      text: "CYCLE COMPLETION: STANDBY",
      offX: leftAlign,
      offY: baseOffset + 0.2,
      color: "red",
    },
    {
      text: countdown,
      offX: leftAlign + 0.04,
      offY: baseOffset + 0.33,
      color: "black",
      countdown: true,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "/rust_computer.jpg";
    image.onload = () => {
      drawCanvas();
    };

    const drawCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      staticTexts.forEach((item) => {
        const textX = canvas.width * item.offX;
        const textY = canvas.height * item.offY;
        if (item.countdown) {
          context.font = "60px Arial";
          item.text = item.text.split("").join(String.fromCharCode(8202));
        } else {
          context.font = "25px Arial";
        }
        context.fillStyle = item.color;
        context.fillText(item.text, textX, textY);
      });
    };

    window.addEventListener("resize", drawCanvas);

    return () => window.removeEventListener("resize", drawCanvas);
  }, [countdown]);

  const updateCountdown = (newTime: string) => {
    setCountdown(newTime);
  };

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasComponent;
