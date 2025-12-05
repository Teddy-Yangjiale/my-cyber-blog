'use client';

import { motion } from 'framer-motion';

// 将屏幕垂直切分为 4 份
const columns = 4;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 1. 页面真实内容 */}
      {children}

      {/* 2. 转场动画遮罩层 */}
      {/* pointer-events-none 保证动画结束后鼠标能穿透遮罩点击下面的内容 */}
      <div className="fixed inset-0 z-[9999] pointer-events-none flex h-screen w-screen">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            // 初始状态: 既然是 template，每次挂载时从 "满" 开始收缩
            initial={{ scaleY: 1 }}
            // 进场动画: 收缩到 0 (露出页面)
            animate={{ scaleY: 0 }}
            // 离场动画: 重新变回 1 (盖住页面)
            exit={{ scaleY: 0 }}
            // 样式设置
            className="relative h-full w-full bg-black border-l border-gray-800 border-b-4 border-green-500 box-border"
            style={{ 
              // 变形原点设为顶部，这样是"向上收起"的感觉
              transformOrigin: 'top' 
            }}
            transition={{
              duration: 0.8, // 动画时长
              ease: [0.22, 1, 0.36, 1], // 贝塞尔曲线：先快后慢，有物理重量感
              delay: i * 0.1, // 核心：每个条晚 0.1 秒，形成错落感
            }}
          >
            {/* 3. 额外的光效装饰 (可选) */}
            {/* 在每个黑条底部加一个渐变的光晕，看起来像扫描仪 */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-500/20 to-transparent pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </>
  );
}