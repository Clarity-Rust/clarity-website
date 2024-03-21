"use client";
import React, { useRef, useEffect, useState } from "react";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const targetDate = new Date("2024-04-05T13:00:00");
  const leftAlign = 0.32;
  const baseOffset = 0.3;

  interface StaticText {
    text: string;
    offX: number;
    offY: number;
    color: "black" | "red";
    countdown?: boolean;
  }

  const [countdown, setCountdown] = useState(".............");
  const staticTexts: StaticText[] = [
    {
      text: "CLARITY RUST",
      offX: leftAlign + 0.1,
      offY: baseOffset,
      color: "black",
    },
    {
      text: "WARHEAD STATUS: ARMED",
      offX: leftAlign + 0.02,
      offY: baseOffset + 0.1,
      color: "red",
    },
    {
      text: "WARHEAD COUNT: 1/4",
      offX: leftAlign + 0.02,
      offY: baseOffset + 0.15,
      color: "red",
    },
    {
      text: "CYCLE COMPLETION: STANDBY",
      offX: leftAlign + 0.02,
      offY: baseOffset + 0.2,
      color: "red",
    },
    {
      text: countdown,
      offX: leftAlign + 0.035,
      offY: baseOffset + 0.305,
      color: "black",
      countdown: true,
    },
  ];

  const padDigit = (n: number) => (n < 10 ? `0${n}` : n);

  const calculateCountdown = () => {
    const now = new Date();
    const distance = targetDate.getTime() - now.getTime();
    if (distance < 0) {
      setCountdown("EXPIRED");
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown(
      `${padDigit(days)}:${padDigit(hours)}:${padDigit(minutes)}:${padDigit(seconds)}`,
    );
  };

  useEffect(() => {
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "/rust_computer_v2.png";
    image.onload = () => {
      drawCanvas();
    };

    const drawCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const spaceOut = (string: string) =>
        string.split("").join(String.fromCharCode(8202));

      staticTexts.forEach((item) => {
        const textX = canvas.width * item.offX;
        const textY = canvas.height * item.offY;
        context.font = item.countdown ? "33px 'PressStart'" : "15px PressStart";
        context.fillStyle = item.color;
        context.fillText(
          item.countdown ? spaceOut(countdown) : spaceOut(item.text),
          textX,
          textY,
        );
      });
    };

    window.addEventListener("resize", drawCanvas);
    // Redraw canvas every second to update countdown
    const countdownInterval = setInterval(drawCanvas, 1000);

    return () => {
      window.removeEventListener("resize", drawCanvas);
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasComponent;
