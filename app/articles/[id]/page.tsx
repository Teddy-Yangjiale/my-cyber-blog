'use client';

import { use, useEffect, useState } from 'react'; // React 钩子
import Link from 'next/link';

// 这是一个简单的“假数据”，模拟数据库里的文章
const database: any = {
  '1': { title: 'Neural Network Visualization', content: 'In this article, we explore how to use WebGL shaders to visualize neural pathways...' },
  '2': { title: 'The Future of Interface Design', content: 'Glassmorphism is dead. Long live the Neo-Brutalism and 3D integration...' },
  '3': { title: 'React Three Fiber Deep Dive', content: 'Understanding the reconciler and how to optimize your 3D scenes for 60fps...' },
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  // 获取 URL 里的 id (比如 '1', '2')
  // Next.js 15+ 中 params 是一个 Promise，需要解包
  const [unwrappedParams, setParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setParams);
  }, [params]);

  if (!unwrappedParams) return <div className="bg-black h-screen text-white">Loading...</div>;

  const id = unwrappedParams.id;
  const article = database[id] || { title: 'Not Found', content: 'Data corrupted.' };

  return (
    <div className="min-h-screen w-full bg-black text-white p-10 md:p-20 font-mono selection:bg-green-500 selection:text-black">
      
      {/* 顶部导航：返回按钮 */}
      <nav className="mb-20">
        <Link href="/" className="group flex items-center text-gray-500 hover:text-green-400 transition-colors w-fit">
          <span className="mr-2 group-hover:-translate-x-2 transition-transform">←</span>
          BACK TO BASE
        </Link>
      </nav>

      {/* 文章头部 */}
      <header className="mb-16 border-b border-gray-800 pb-10">
        <div className="text-green-500 text-sm mb-4 tracking-widest uppercase">
           System Log // 00{id}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
          {article.title}
        </h1>
        <div className="flex gap-4 text-gray-500 text-sm">
          <span>Author: ADMIN</span>
          <span>•</span>
          <span>Read Time: 5 MIN</span>
        </div>
      </header>

      {/* 文章正文 */}
      <article className="prose prose-invert prose-lg max-w-3xl text-gray-300 leading-relaxed">
        <p className="text-xl text-white mb-10 border-l-4 border-green-500 pl-6">
          {article.content}
        </p>
        <p>
          (这里是正文占位符) Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <div className="my-10 p-6 border border-green-500/30 bg-green-500/5 rounded-lg">
          <code className="text-green-400">
            console.log("Hello Cyberpunk World");
          </code>
        </div>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </p>
      </article>

    </div>
  );
}