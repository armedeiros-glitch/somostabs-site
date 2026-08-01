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

function Gum({ position, gumRef, index }) {
  return (
    <group position={position} ref={gumRef}>
      <mesh material={gumMaterial} castShadow scale={[1, 0.34, 0.52]}>
        <sphereGeometry args={[0.5, 32, 18]} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.42, 0.025, 0.05]} />
        <meshBasicMaterial color="#202020" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, 0.195, 0.13]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.18, 0.08]} />
        <meshBasicMaterial color={index % 2 === 0 ? '#dfff38' : '#9fb812'} />
      </mesh>
    </group>
  );
}

function CaseModel({ caseRef, lidRef, gumRefs }) {
  const positions = [
    [-0.94, 0.52, -0.57],
    [0.94, 0.52, -0.57],
    [-0.94, 0.52, 0.57],
    [0.94, 0.52, 0.57]
  ];

  return (
    <group ref={caseRef} rotation={[-0.42, -0.2, -0.04]}>
      <group>
        <mesh material={matteBlack} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.5, 2.65]} />
        </mesh>
        <mesh position={[0, 0.29, 0]} material={neonGreen} receiveShadow>
          <boxGeometry args={[3.78, 0.13, 2.23]} />
        </mesh>
        <mesh position={[0, 0.43, 0]}>
          <boxGeometry args={[3.34, 0.06, 1.78]} />
          <meshStandardMaterial color="#1a1c12" roughness={0.88} />
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

        {positions.map((position, index) => (
          <Gum
            position={position}
            gumRef={gumRefs[index]}
            index={index}
            key={index}
          />
        ))}
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
        <mesh position={[0, 0.39, 1.28]}>
          <boxGeometry args={[0.78, 0.026, 0.11]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
      </group>
    </group>
  );
}

export default function SmartCaseScene({ scrollRoot }) {
  const mouseGroup = useRef();
  const caseRef = useRef();
  const lidRef = useRef();
  const gumOne = useRef();
  const gumTwo = useRef();
  const gumThree = useRef();
  const gumFour = useRef();
  const { camera } = useThree();
  const gumRefs = [gumOne, gumTwo, gumThree, gumFour];

  useLayoutEffect(() => {
    if (!scrollRoot.current || !caseRef.current || !lidRef.current) return undefined;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRoot.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.85
      }
    });

    timeline
      .to(camera.position, { x: 0.08, y: 1.25, z: 5.15, ease: 'none' }, 0)
      .to(caseRef.current.rotation, { x: -0.72, y: 0.08, z: 0, ease: 'none' }, 0)
      .to(lidRef.current.rotation, { x: -1.92, ease: 'power2.inOut' }, 0.1)
      .to(caseRef.current.position, { y: -0.18, ease: 'none' }, 0.2);

    const gumTargets = [
      { x: -1.7, y: 1.95, z: -0.45, rx: -0.1, ry: -0.4, rz: -0.18 },
      { x: 1.7, y: 2.2, z: -0.2, rx: 0.12, ry: 0.35, rz: 0.2 },
      { x: -1.35, y: 1.35, z: 0.8, rx: -0.08, ry: 0.3, rz: 0.12 },
      { x: 1.4, y: 1.5, z: 0.9, rx: 0.12, ry: -0.35, rz: -0.14 }
    ];

    gumRefs.forEach((ref, index) => {
      if (!ref.current) return;
      const target = gumTargets[index];
      timeline
        .to(
          ref.current.position,
          { x: target.x, y: target.y, z: target.z, ease: 'power1.out' },
          0.35 + index * 0.025
        )
        .to(
          ref.current.rotation,
          { x: target.rx, y: target.ry, z: target.rz, ease: 'none' },
          0.35 + index * 0.025
        )
        .to(
          ref.current.position,
          { y: target.y + 0.13, ease: 'sine.inOut', yoyo: true, repeat: 1 },
          0.63
        )
        .to(
          ref.current.position,
          { x: index % 2 === 0 ? -0.75 : 0.75, y: 0.72, z: index < 2 ? -0.35 : 0.35, ease: 'power1.inOut' },
          0.78
        );
    });

    timeline
      .to(camera.position, { x: 0, y: 1.8, z: 6.45, ease: 'none' }, 0.74)
      .to(caseRef.current.rotation, { x: -0.5, y: -0.08, z: 0, ease: 'none' }, 0.74)
      .to(caseRef.current.position, { y: -0.45, ease: 'none' }, 0.74);

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
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-3, 1.5, 2]} intensity={8} distance={10} color="#dfff38" />
      <pointLight position={[3, -1, -2]} intensity={3} distance={8} color="#597000" />

      <group ref={mouseGroup} position={[1.15, -0.05, 0]}>
        <CaseModel caseRef={caseRef} lidRef={lidRef} gumRefs={gumRefs} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#030303" roughness={1} transparent opacity={0.6} />
      </mesh>
    </>
  );
}
