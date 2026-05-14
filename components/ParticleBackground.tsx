'use client';

import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
    };

    const dots: Dot[] = [];
    const gap = 28;
    const accentColor = "#B7775D"; // PRAMAAN terracotta accent

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
        this.size = 2;
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
        ctx.fillStyle = "#2E4A1F";
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

      if (Date.now() - lastChange > 1800) {
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

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
        init();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    updateSize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};
