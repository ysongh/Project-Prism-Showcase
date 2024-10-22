import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, MeshReflectorMaterial, Html, Image, Text, Environment } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';

import { useContracts } from "../utils/useContracts";

const GOLDENRATIO = 1.61803398875;

const images = [
  // Front
  { position: [0, 0, 2], rotation: [0, 0, 0]},
  // Back
  { position: [-1, 0, -0.6], rotation: [0, 0, 0]},
  { position: [1, 0, -0.6], rotation: [0, 0, 0] },
  // Left
  { position: [-2.2, 0, 1.2], rotation: [0, Math.PI / 2.5, 0]},
  { position: [-2.7, 0, 3.2], rotation: [0, Math.PI / 2.5, 0]},
  { position: [-3, 0, 2.75], rotation: [0, Math.PI / 2.5, 0]},
  // { position: [-3, 0, 2.75], rotation: [0, Math.PI / 2.5, 0]},
  // Right
  { position: [2.4, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0]},
  { position: [3, 0, 2.2], rotation: [0, -Math.PI / 2.5, 0]},
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0]}
];

export default function Gallery({ ethAddress }) {
  const { getProjects } = useContracts();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = async () => {
    let newProjects = await getProjects();
    let temp = [];
    for(let i = 0; i < newProjects.length; i++){
      let currentProject = {};
      currentProject.position = images[i].position;
      currentProject.rotation = images[i].rotation;
      currentProject.url = newProjects[i].cid;
      currentProject.projectName = newProjects[i].name;
      currentProject.description = newProjects[i].description;
      currentProject.codeLink = newProjects[i].url;
      temp.push(currentProject);
    }
    setProjects(temp);
  }
  
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }} style={{ height: "90vh"}}>
      <color attach="background" args={['#0a192f']} />
      <fog attach="fog" args={['#0a192f', 0, 15]} />
      <Text position={[0, 3, 0]} fontSize={0.4}>
        Projects for {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : '0x'}
      </Text>
      <group position={[0, -0.5, 0]}>
        <Frames images={projects} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </Canvas>
  );
}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/gallery/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/gallery/' : '/gallery/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/gallery/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, projectName, description, codeLink, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/gallery/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })


  const openLinkToCode = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (codeLink) {
      window.open(codeLink, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[2, GOLDENRATIO - 0.4, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image 
          raycast={() => null} 
          ref={image} 
          position={[0, 0, 0.7]} 
          url={url}
          scale={1.75}
          fit="contain"
          dispose={null}
        />
      </mesh>
      <Text anchorX="left" anchorY="top" position={[-1, GOLDENRATIO, 0]} fontSize={0.1}>
        {projectName}
      </Text>
      {isActive && <Text maxWidth={2} anchorX="left" anchorY="top" position={[-1, GOLDENRATIO - 1.45, 0]} fontSize={0.05}>
        {description}
      </Text>}
      <Html transform nchorX="left" anchorY="top" position={[0.9, GOLDENRATIO + 0.04, 0]}>
        {isActive && <button
          onClick={openLinkToCode}
          style={{
            padding: '1px 2px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1px'
          }}
        >
          See Code
        </button>}
      </Html>
    </group>
  )
}
