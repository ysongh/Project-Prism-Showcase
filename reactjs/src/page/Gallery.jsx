import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, MeshReflectorMaterial, Html, Image, Text, Environment } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';

import { useContracts } from "../utils/useContracts";

const GOLDENRATIO = 1.61803398875;

const pexel = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) }
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
      temp.push(currentProject);
    }
    temp.push({
      "position": images[5].position,
      "rotation": images[5].rotation,
      "url": "https://gateway.lighthouse.storage/ipfs/bafkreicagvifzhi7ke2msrhjah5uhbarqtp73gsv2kfggxpihgs6gdjscq",
      "projectName": "Battery Bounty",
      "description": "Join the movement to properly dispose of batteries and protect our environment"
    })
    temp.push({
      "position": images[6].position,
      "rotation": images[6].rotation,
      "url": "https://gateway.lighthouse.storage/ipfs/bafkreicagvifzhi7ke2msrhjah5uhbarqtp73gsv2kfggxpihgs6gdjscq",
      "projectName": "Battery Bounty",
      "description": "Join the movement to properly dispose of batteries and protect our environment"
    })
    temp.push({
      "position": images[7].position,
      "rotation": images[7].rotation,
      "url": "https://gateway.lighthouse.storage/ipfs/bafkreicagvifzhi7ke2msrhjah5uhbarqtp73gsv2kfggxpihgs6gdjscq",
      "projectName": "Battery Bounty",
      "description": "Join the movement to properly dispose of batteries and protect our environment"
    })
    temp.push({
      "position": images[8].position,
      "rotation": images[8].rotation,
      "url": "https://gateway.lighthouse.storage/ipfs/bafkreicagvifzhi7ke2msrhjah5uhbarqtp73gsv2kfggxpihgs6gdjscq",
      "projectName": "Battery Bounty",
      "description": "Join the movement to properly dispose of batteries and protect our environment"
    })
    setProjects(temp);
  }
  
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }} style={{ height: "90vh"}}>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
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

function Frame({ url, projectName, description, c = new THREE.Color(), ...props }) {
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

  console.log(projectName, "dddd")
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
       
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.04}>
        {projectName}
      </Text>
      {isActive && <Text maxWidth={0.25} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO - 0.2, 0]} fontSize={0.025}>
        {description}
      </Text>}
      <Html transform nchorX="left" anchorY="top" position={[0.65, GOLDENRATIO - 1, 0]}>
        {isActive && <button
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
