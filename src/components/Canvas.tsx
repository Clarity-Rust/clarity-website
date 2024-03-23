"use client";
import React, { useRef, useEffect, useState } from "react";

interface StaticText {
  text: string;
  offX: number;
  offY: number;
  fontSize: number;
  color: "black" | "red";
  countdown?: boolean;
}

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetDate = new Date("2024-03-27T15:00:00");
  const leftAlign = 0.32;
  const baseOffset = 0.3;

  const [countdown, setCountdown] = useState("................");
  const staticTexts: StaticText[] = [
    {
      text: "CLARITY RUST",
      offX: leftAlign + 0.07,
      offY: baseOffset,
      color: "black",
      fontSize: 14,
    },
    // {
    //   text: "s : ",
    //   offX: leftAlign + 0.03,
    //   offY: baseOffset + 0.12,
    //   color: "red",
    // },
    {
      text: "SPEED : MAX",
      offX: leftAlign + 0.03,
      offY: baseOffset + 0.17,
      color: "red",
      fontSize: 13,
    },
    {
      text: "COMING : 3/26",
      offX: leftAlign + 0.03,
      offY: baseOffset + 0.22,
      color: "red",
      fontSize: 13,
    },
    {
      text: countdown,
      offX: leftAlign + 0.032,
      offY: baseOffset + 0.305,
      color: "black",
      countdown: true,
      fontSize: 21,
    },
  ];

  const padDigit = (n: number) => (n < 10 ? `0${n}` : n);

  const calculateCountdown = () => {
    const now = new Date();
    const distance = targetDate.getTime() - now.getTime();
    if (distance < 0) {
      setCountdown("LAUNCHING");
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountdown(
      `${padDigit(days)}:${padDigit(hours)}:${padDigit(minutes)}:${padDigit(
        seconds
      )}`
    );
  };

  const calculateFontSize = (baseSize: number, canvasWidth: number) => {
    const thresholdWidth = 768;
    if (canvasWidth > thresholdWidth) {
      return Math.max(12, baseSize * (canvasWidth / thresholdWidth));
    }
    return baseSize;
  };

  useEffect(() => {
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef!.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = "/rust_computer_v2.png";
    image.onload = () => {
      drawCanvas();
    };

    const drawCanvas = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      canvas!.width = canvasWidth;
      canvas!.height = canvasHeight;
      context!.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      const spaceOut = (string: string) =>
        string.split("").join(String.fromCharCode(8202));

      staticTexts.forEach((item) => {
        const textX = canvasWidth * item.offX;
        const textY = canvasHeight * item.offY;
        const fontSize = item.fontSize
          ? calculateFontSize(item.fontSize, canvasWidth)
          : 19;
        context!.font = `${fontSize}px PressStart`;
        context!.fillStyle = item.color;
        context!.fillText(
          item.countdown ? spaceOut(countdown) : spaceOut(item.text),
          textX,
          textY
        );
      });
    };

    window.addEventListener("resize", drawCanvas);
    const countdownInterval = setInterval(drawCanvas, 1000);

    return () => {
      window.removeEventListener("resize", drawCanvas);
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasComponent;
