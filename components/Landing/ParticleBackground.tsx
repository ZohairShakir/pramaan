"use client";

import React, { useEffect, useRef } from "react";

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
    };

    const dots: Dot[] = [];
    const gap = 28;
    const accentColor = "#A6634B"; 
    const primaryColor = "#142210";

    const qrPatterns = [
      [
        [1, 1, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 1],
        [1, 1, 1, 0, 0, 1],
        [0, 0, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 1, 1],
      ],
      [
        [1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1],
      ],
      [
        [1, 1, 0, 1, 1, 0],
        [0, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 1],
      ],
    ];

    let currentQR = 0;
    let lastChange = Date.now();

    class Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      size: number;

      constructor(x: number, y: number) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = 1.5;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 160) {
          const force = (160 - distance) / 160;
          this.x = this.baseX - dx * force * 0.08;
          this.y = this.baseY - dy * force * 0.08;
        } else {
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#142210";
        ctx.globalAlpha = 0.15;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function init() {
      dots.length = 0;
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          dots.push(new Dot(x, y));
        }
      }
    }

    function drawDynamicQR() {
      if (!ctx) return;
      const pattern = qrPatterns[currentQR];
      const block = 18;

      const qrX = mouse.x - 55;
      const qrY = mouse.y - 55;

      ctx.fillStyle = accentColor;
      ctx.globalAlpha = 0.18;

      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          if (pattern[i][j]) {
            ctx.fillRect(
              qrX + j * block,
              qrY + i * block,
              block - 4,
              block - 4
            );
          }
        }
      }

      ctx.globalAlpha = 1;

      if (Date.now() - lastChange > 2000) {
        currentQR = (currentQR + 1) % qrPatterns.length;
        lastChange = Date.now();
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.update();
        dot.draw();
      });

      drawDynamicQR();
      requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
};
