'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, ScrollControls, Scroll } from '@react-three/drei';
import Navbar from '@/components/Navbar';
import SmartBlob from '@/components/SmartBlob'; // 确保你有这个组件
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen w-full bg-black">
      <Canvas className="h-full w-full">
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={5} color="#8352FD" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ScrollControls pages={2} damping={0.2}>
          
          {/* Layer 1: 3D 智能球 */}
          <SmartBlob />

          {/* Layer 2: 滚动内容 */}
          <Scroll html style={{ width: '100%' }}>
            
            <Navbar />

            {/* 第一屏：标题 */}
            <div className="h-screen w-full flex items-center justify-center pointer-events-none">
              <div className="text-center mix-blend-difference">
                <h1 className="text-8xl font-black text-white mb-2 tracking-tighter">
                  CYBER BLOG
                </h1>
                <p className="text-xl text-gray-400 tracking-widest uppercase">
                  Design / Code / Future
                </p>
                <div className="mt-20 animate-bounce text-white/50 text-sm">
                   ↓ SCROLL TO MUTATE
                </div>
              </div>
            </div>

            {/* 第二屏：文章列表 */}
            <div className="h-screen w-full flex items-center px-20">
              <div className="w-1/2">
                <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-bold mb-8">
                  System Mutation Complete.
                </h2>
                <div className="space-y-8">
                  {[1, 2, 3].map((i) => (
                    <Link key={i} href={`/articles/${i}`} className="block group cursor-pointer">
                      <h3 className="text-2xl text-white font-bold group-hover:text-teal-400 transition-colors">
                        0{i}. Neural Network Visualization &rarr;
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Deep dive into WebGL shaders and reactive state management...
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </Scroll>
        </ScrollControls>

      </Canvas>
    </main>
  );
}