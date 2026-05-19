import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ShaderMaterial,
  Color,
  DoubleSide,
  AdditiveBlending,
} from "three";
import type { Mesh, Group } from "three";

// --- Globe Vertex Shader ---
const globeVertex = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDist;
  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    vDist = length(position.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// --- Globe Fragment Shader ---
const globeFragment = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uGridScale;
  uniform float uRingRadius;
  uniform float uRingThickness;
  uniform float uRingSpeed;
  uniform float uRingIntensity;
  uniform float uPulseIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDist;

  float gridLine(float coord, float width) {
    float fw = fwidth(coord);
    float p = abs(fract(coord - 0.5) - 0.5);
    return 1.0 - smoothstep(width * fw, (width + 1.0) * fw, p);
  }

  void main() {
    float lineMask = max(gridLine(vUv.x * uGridScale, 0.5), gridLine(vUv.y * uGridScale, 0.5));
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    float lineIntensity = lineMask * (0.8 + pulse * uPulseIntensity);
    lineIntensity = lineIntensity * 0.15;

    float ringAngle = fract((atan(vPosition.z, vPosition.x) / 6.2831853) + uTime * uRingSpeed);
    float ringFade = exp(-abs(vDist - uRingRadius) * 10.0 / uRingThickness);
    float ring = smoothstep(0.05, 0.0, ringAngle) * ringFade;
    float ringIntensity = ring * uRingIntensity;

    vec3 finalColor = mix(uColor, vec3(1.0), lineIntensity) + vec3(0.0, 0.4, 1.0) * ringIntensity;
    float alpha = max(lineIntensity * 5.0, ring);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// --- Data Point Shaders ---
const dataVertex = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vRipple;
  void main() {
    vUv = uv;
    float d = length(position.xy);
    vRipple = sin(d * 10.0 - uTime * 3.0) * exp(-d * 3.0);
    vec3 pos = position + normal * vRipple * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const dataFragment = `
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float dist = length(vUv - 0.5);
    float alpha = 1.0 - smoothstep(0.1, 0.5, dist);
    gl_FragColor = vec4(uColor, alpha * 0.9);
  }
`;

// --- Ring Shaders ---
const ringVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragment = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uRotationSpeed;
  uniform float uTubeThickness;
  varying vec2 vUv;
  void main() {
    float pulse = sin(uTime * 2.0 + vUv.x * 20.0) * 0.5 + 0.5;
    float alpha = uOpacity * (0.3 + pulse * 0.7);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// --- Inner Globe Component ---
function InnerGlobe() {
  const meshRef = useRef<Mesh>(null);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color("#2563eb") },
          uGridScale: { value: 10.0 },
          uRingRadius: { value: 0.98 },
          uRingThickness: { value: 0.05 },
          uRingSpeed: { value: -0.05 },
          uRingIntensity: { value: 0.5 },
          uPulseIntensity: { value: 0.3 },
        },
        vertexShader: globeVertex,
        fragmentShader: globeFragment,
        transparent: true,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} material={mat}>
      <icosahedronGeometry args={[1.95, 32]} />
    </mesh>
  );
}

// --- Outer Globe Component ---
function OuterGlobe() {
  const meshRef = useRef<Mesh>(null);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color("#949494") },
          uGridScale: { value: 50.0 },
          uRingRadius: { value: 1.03 },
          uRingThickness: { value: 0.5 },
          uRingSpeed: { value: 0.1 },
          uRingIntensity: { value: 2.0 },
          uPulseIntensity: { value: 0.5 },
        },
        vertexShader: globeVertex,
        fragmentShader: globeFragment,
        transparent: true,
        side: DoubleSide,
        blending: AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} material={mat}>
      <icosahedronGeometry args={[2, 32]} />
    </mesh>
  );
}

// --- Rotating Ring ---
function RotatingRing() {
  const groupRef = useRef<Group>(null);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color("#ffffff") },
          uOpacity: { value: 0.8 },
          uRotationSpeed: { value: 0.5 },
          uTubeThickness: { value: 0.5 },
        },
        vertexShader: ringVertex,
        fragmentShader: ringFragment,
        transparent: true,
        blending: AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 1.5, 0, 0]} material={mat}>
        <torusGeometry args={[3.5, 0.005, 16, 100]} />
      </mesh>
    </group>
  );
}

// --- Data Points ---
function DataPoints() {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color("#2563eb") },
        },
        vertexShader: dataVertex,
        fragmentShader: dataFragment,
        transparent: true,
        blending: AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 10; i++) {
      pts.push([
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
      ]);
    }
    return pts;
  }, []);

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          material={mat}
          position={pos}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        >
          <planeGeometry args={[0.1, 0.1]} />
        </mesh>
      ))}
    </>
  );
}

// --- Main Globe Group ---
function GlobeScene() {
  return (
    <group>
      <OuterGlobe />
      <InnerGlobe />
      <RotatingRing />
      <DataPoints />
    </group>
  );
}

// --- Exported Component ---
export default function BlueprintGlobe() {
  return (
    <div className="w-full h-full" style={{ background: "#1a1a1a" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <GlobeScene />
      </Canvas>
    </div>
  );
}
