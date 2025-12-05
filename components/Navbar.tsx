'use client';

export default function Navbar() {
  return (
    // fixed: 固定在顶部
    // backdrop-blur-md: 核心！背景模糊效果
    // bg-white/10: 白色背景，但只有10%不透明度
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10">
      
      {/* 左侧 Logo */}
      <div className="text-white font-bold text-2xl tracking-tighter cursor-pointer hover:text-purple-400 transition-colors">
        CYBER<span className="text-purple-500">.IO</span>
      </div>

      {/* 右侧菜单链接 */}
      <div className="flex gap-8">
        {/* 我们写一个简单的组件来复用样式 */}
        {['Home', 'Articles', 'Projects', 'About'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="text-gray-300 text-sm font-medium hover:text-white hover:scale-110 transition-all duration-300 uppercase tracking-widest"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}