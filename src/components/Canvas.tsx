"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./canvas.module.css";

interface StaticText {
  text: string;
  offX: number;
  offY: number;
  fontSize?: number;
  color: "black" | "red";
  countdown?: boolean;
}

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetDate = new Date("2024-03-26T13:00:00");
  const leftAlign = 0.32;
  const baseOffset = 0.3;

  const [countdown, setCountdown] = useState("................");
  const staticTexts: StaticText[] = [
    {
      text: "CLARITY RUST",
      offX: leftAlign + 0.07,
      offY: baseOffset,
      color: "black",
      fontSize: 22,
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
    },
    {
      text: "COMING : 3/26",
      offX: leftAlign + 0.03,
      offY: baseOffset + 0.22,
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
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);

      const spaceOut = (string: string) =>
        string.split("").join(String.fromCharCode(8202));

      staticTexts.forEach((item) => {
        const textX = canvas!.width * item.offX;
        const textY = canvas!.height * item.offY;
        if (item.countdown) {
          context!.font = "33px PressStart";
        } else {
          if (item.fontSize) {
            context!.font = `${item.fontSize}px PressStart`;
          } else {
            context!.font = "19px PressStart";
          }
        }
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
