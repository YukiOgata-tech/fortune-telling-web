import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

// 画像パス（public/images/〇〇.jpg に必ず配置！）
const MOON_TEXTURE = "/images/2k_moon.jpg";
const EARTH_TEXTURE = "/images/2k_earth_daymap.jpg";
const JUPITER_TEXTURE = "/images/2k_jupiter.jpg";

// テクスチャ付き惑星（地球や木星などもOK）
function Planet({ position, radius, textureUrl, speed = 0.001 }) {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  // --- ここでカラースペース指定 ---
  texture.colorSpace = THREE.SRGBColorSpace;
  useFrame(() => {
    mesh.current.rotation.y += speed;
  });
  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={"#fff"}
        emissiveIntensity={0.009}
        roughness={0.18}
        metalness={0.2}
      />
    </mesh>
  );
}

// 月（テクスチャ付き・スクロールで手前に寄る）
function Moon({ z, scrollY, textureUrl }) {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  // --- ここでカラースペース指定 ---
  texture.colorSpace = THREE.SRGBColorSpace;
  useFrame(() => {
    if (ref.current) {
      ref.current.position.z = z + scrollY * 22;
      ref.current.position.y = -5 + scrollY * 5;
      ref.current.rotation.y += 0.0006;
    }
  });
  return (
    <mesh ref={ref} position={[0, -5, z]}>
      <sphereGeometry args={[7, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={"#fff"}
        emissiveIntensity={0.02}
        roughness={0.7}
        metalness={0.18}
      />
    </mesh>
  );
}

// カラフルな流星
function ShootingStar({ color = "#a9c7ff", start = [0, 0, 0], end = [10, 5, -40], speed = 0.002, delay = 0 }) {
  const mesh = useRef();
  const tRef = useRef(0);
  useFrame((state, delta) => {
    tRef.current += delta * speed;
    let t = (Math.sin(tRef.current + delay) + 1) / 2; // 0~1で往復
    if (mesh.current) {
      mesh.current.position.x = start[0] + (end[0] - start[0]) * t;
      mesh.current.position.y = start[1] + (end[1] - start[1]) * t;
      mesh.current.position.z = start[2] + (end[2] - start[2]) * t;
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.22, 9, 9]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        roughness={0.35}
        metalness={0.6}
      />
    </mesh>
  );
}

// きらきらした微惑星・星
function MicroStars({ count = 70, speed = 0.25 }) {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.material.opacity = 0.6 + 0.4 * Math.sin(t * 2 * speed + i);
      child.position.x += Math.sin(t * 0.2 * speed + i) * 0.002 * speed;
      child.position.y += Math.cos(t * 0.19 * speed + i) * 0.003 * speed;
    });
  });
  const stars = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 110,
      (Math.random() - 0.5) * 72,
      (Math.random() - 0.5) * 130,
    ],
    size: Math.random() * 0.24 + 0.08,
    color: `hsl(${Math.random() * 360}, 90%, 83%)`,
  }));
  return (
    <group ref={group}>
      {stars.map((star, i) => (
        <mesh key={i} position={star.position}>
          <sphereGeometry args={[star.size, 10, 10]} />
          <meshStandardMaterial
            color={star.color}
            emissive={star.color}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ぼんやりしたガス状の星雲（平面＋半透明カラーで奥行き感を演出）
function NebulaImage({ position = [0,0,-70], scale = [13,7,1], url, rotate = 0 }) {
  const mesh = useRef();
  const texture = useLoader(THREE.TextureLoader, url);
  // --- ここでカラースペース指定 ---
  texture.colorSpace = THREE.SRGBColorSpace;
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.z += 0.0004 + rotate;
  });
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.5}
        depthWrite={false}
        roughness={1}
        metalness={0.05}
      />
    </mesh>
  );
}

// スクロール量取得hook
function useScrollY() {
  const [scroll, setScroll] = React.useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scroll;
}

// メイン背景コンポーネント
function Background3DSpace() {
  const scrollY = useScrollY();

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 25], fov: 54 }}
        style={{ width: "100vw", height: "100vh", background: "#090c18" }}
        // --- ここでoutputColorSpaceを指定 ---
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight intensity={0.14} />
        <directionalLight
          position={[12, 18, 28]}
          intensity={1.2}
          castShadow
          color="#d6e0ff"
        />
        {/* 星雲ガス */}
        <NebulaImage url="/images/nebula1.jpg" position={[10,10,-65]} scale={[18,8,1]} />
        
        {/* 月（本物テクスチャ・スクロールで奥から近づく） */}
        <Moon z={-53} scrollY={scrollY} textureUrl={MOON_TEXTURE} />

        {/* 地球・木星（本物テクスチャ） */}
        <Planet position={[-19, 14, -40]} radius={2.1} textureUrl={EARTH_TEXTURE} speed={0.00032} />
        <Planet position={[18, -12, -34]} radius={3.6} textureUrl={JUPITER_TEXTURE} speed={0.00023} />

        {/* 色付き流星 */}
        <ShootingStar color="#fffaf3" start={[-30, 17, -38]} end={[14, 8, -27]} speed={0.08} />
        <ShootingStar color="#9be7ff" start={[18, -15, -30]} end={[-11, 7, -18]} speed={0.06} delay={0.6} />
        <ShootingStar color="#ffb5f6" start={[22, 13, -28]} end={[-17, -8, -20]} speed={0.05} delay={1.2} />

        {/* 微惑星・きらきら星 */}
        <MicroStars count={5} speed={0.000005} />

        {/* 無数の小さな星 */}
        <Stars radius={100} depth={80} count={3400} factor={4.7} fade speed={1} />
      </Canvas>
    </div>
  );
}

export default Background3DSpace;
