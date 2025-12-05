'use client';
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布全屏
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 黑客帝国字符集 (片假名 + 数字)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // 每一列当前的 y 坐标 (初始都在顶部)
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // 核心技巧：用半透明黑色覆盖上一帧，形成"拖尾"效果
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // 经典的黑客绿
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // 随机取一个字符
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        
        // 绘制字符
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // 如果掉出屏幕，随机重置到顶部
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        // 下落
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // 窗口大小改变时重置
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none"
    />
  );
}