import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const matteBlack = new THREE.MeshStandardMaterial({
  color: '#0b0b0b',
  roughness: 0.82,
  metalness: 0.12
});

const edgeBlack = new THREE.MeshStandardMaterial({
  color: '#181818',
  roughness: 0.58,
  metalness: 0.18
});

const neonGreen = new THREE.MeshStandardMaterial({
  color: '#dfff38',
  roughness: 0.48,
  metalness: 0.02,
  emissive: '#4b5c00',
  emissiveIntensity: 0.42
});

const gumMaterial = new THREE.MeshStandardMaterial({
  color: '#efffb0',
  roughness: 0.68,
  metalness: 0
});

function Gum({ position }) {
  return (
    <group position={position}>
      <mesh material={gumMaterial} castShadow scale={[1, 0.34, 0.52]}>
        <sphereGeometry args={[0.5, 32, 18]} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.42, 0.025, 0.05]} />
        <meshBasicMaterial color="#202020" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function CaseModel({ caseRef, lidRef }) {
  return (
    <group ref={caseRef} rotation={[-0.42, -0.2, -0.04]}>
      <group>
        <mesh material={matteBlack} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.5, 2.65]} />
        </mesh>
        <mesh position={[0, 0.29, 0]} material={neonGreen} receiveShadow>
          <boxGeometry args={[3.78, 0.13, 2.23]} />
        </mesh>
        <mesh position={[0, 0.39, -1.18]} material={edgeBlack}>
          <boxGeometry args={[4.04, 0.3, 0.18]} />
        </mesh>
        <mesh position={[0, 0.39, 1.18]} material={edgeBlack}>
          <boxGeometry args={[4.04, 0.3, 0.18]} />
        </mesh>
        <mesh position={[-1.9, 0.39, 0]} material={edgeBlack}>
          <boxGeometry args={[0.18, 0.3, 2.2]} />
        </mesh>
        <mesh position={[1.9, 0.39, 0]} material={edgeBlack}>
          <boxGeometry args={[0.18, 0.3, 2.2]} />
        </mesh>

        <Gum position={[-0.94, 0.52, -0.57]} />
        <Gum position={[0.94, 0.52, -0.57]} />
        <Gum position={[-0.94, 0.52, 0.57]} />
        <Gum position={[0.94, 0.52, 0.57]} />
      </group>

      <group ref={lidRef} position={[0, 0.33, -1.28]}>
        <mesh position={[0, 0.2, 1.28]} material={matteBlack} castShadow>
          <boxGeometry args={[4.2, 0.3, 2.65]} />
        </mesh>
        <mesh position={[0, 0.02, 1.28]} material={neonGreen}>
          <boxGeometry args={[3.78, 0.07, 2.23]} />
        </mesh>
        <mesh position={[0, 0.37, 1.28]}>
          <boxGeometry args={[1.35, 0.025, 0.32]} />
          <meshBasicMaterial color="#dfff38" />
        </mesh>
      </group>
    </group>
  );
}

export default function SmartCaseScene({ scrollRoot }) {
  const mouseGroup = useRef();
  const caseRef = useRef();
  const lidRef = useRef();
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!scrollRoot.current || !caseRef.current || !lidRef.current) return undefined;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRoot.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    timeline
      .to(camera.position, { x: 0.15, y: 1.35, z: 5.15, ease: 'none' }, 0)
      .to(caseRef.current.rotation, { x: -0.72, y: 0.08, z: 0, ease: 'none' }, 0)
      .to(lidRef.current.rotation, { x: -1.92, ease: 'power2.inOut' }, 0.1)
      .to(caseRef.current.position, { y: -0.18, ease: 'none' }, 0.2);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [camera, scrollRoot]);

  useFrame((state, delta) => {
    if (!mouseGroup.current) return;

    const targetX = state.pointer.y * 0.08;
    const targetY = state.pointer.x * 0.12;
    mouseGroup.current.rotation.x = THREE.MathUtils.damp(
      mouseGroup.current.rotation.x,
      targetX,
      4,
      delta
    );
    mouseGroup.current.rotation.y = THREE.MathUtils.damp(
      mouseGroup.current.rotation.y,
      targetY,
      4,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={3.2}
        color="#ffffff"
      />
      <pointLight position={[-3, 1.5, 2]} intensity={8} distance={10} color="#dfff38" />
      <pointLight position={[3, -1, -2]} intensity={3} distance={8} color="#597000" />

      <group ref={mouseGroup} position={[1.15, -0.05, 0]}>
        <CaseModel caseRef={caseRef} lidRef={lidRef} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#030303" roughness={1} transparent opacity={0.6} />
      </mesh>
    </>
  );
}
