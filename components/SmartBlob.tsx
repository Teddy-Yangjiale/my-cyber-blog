'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function SmartBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // useScroll 是核心！它能获取滚动的实时数据
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // scroll.offset 是一个 0 到 1 的数字
    // 0 = 网页顶部, 1 = 网页底部
    const r = scroll.offset;

    // --- 动画 1: 位置移动 ---
    // 刚开始在中间(0)，滚下来后移动到右边(2)
    // lerp 是线性插值，让变化非常丝滑
    meshRef.current.position.x = THREE.MathUtils.lerp(0, 2.5, r);
    meshRef.current.position.y = THREE.MathUtils.lerp(0, -1, r);

    // --- 动画 2: 颜色变化 ---
    // 从紫色 (#8352FD) 渐变到 青色 (#2DD4BF)
    // 我们定义两个颜色
    const colorA = new THREE.Color('#8352FD');
    const colorB = new THREE.Color('#2DD4BF');
    // 根据滚动进度混合颜色
    materialRef.current.color.lerpColors(colorA, colorB, r * 1.5); // *1.5是为了变色快一点

    // --- 动画 3: 疯狂变形 ---
    // 越往下滚，扭曲越厉害 (0.4 -> 1.0)
    materialRef.current.distort = THREE.MathUtils.lerp(0.4, 1.0, r);
    // 旋转速度也变快
    meshRef.current.rotation.z += delta * (1 + r * 5);
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.2}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#8352FD"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}