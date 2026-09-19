'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pointer coordinates
    const pointer = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    // Node configuration
    const NODE_COUNT = Math.min(42, Math.floor((width * height) / 25000) + 15);
    const MAX_DISTANCE = 130;

    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      });
    }

    const setCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Render proximity connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Render & update individual nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (animate) {
          // Pointer repulsion interaction
          const pdx = node.x - pointer.x;
          const pdy = node.y - pointer.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pDist < pointer.radius && pDist > 0) {
            const force = (1 - pDist / pointer.radius) * 0.8;
            node.x += (pdx / pDist) * force;
            node.y += (pdy / pDist) * force;
          }

          node.x += node.vx;
          node.y += node.vy;

          // Bounce off viewport boundaries
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 92, 255, 0.45)';
        ctx.fill();
      }
    };

    // Reduced motion handling
    if (mediaQuery.matches) {
      // Draw a single static frame and do not start animation loop
      drawFrame(false);
    } else {
      const loop = () => {
        drawFrame(true);
        animationFrameId = requestAnimationFrame(loop);
      };
      animationFrameId = requestAnimationFrame(loop);
    }

    // Media query change listener
    const handleMotionChange = (e: MediaQueryListEvent) => {
      cancelAnimationFrame(animationFrameId);
      if (e.matches) {
        drawFrame(false);
      } else {
        const loop = () => {
          drawFrame(true);
          animationFrameId = requestAnimationFrame(loop);
        };
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const handlePointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handleResize = () => {
      setCanvasSize();
      if (mediaQuery.matches) {
        drawFrame(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 h-full w-full opacity-60"
    />
  );
}
