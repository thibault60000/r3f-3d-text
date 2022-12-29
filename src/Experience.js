import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useState, useRef } from "react";
import { useControls } from "leva";

// https://github.com/emmelleppi/normal-maps
// https://github.com/emmelleppi/matcaps
export default function Experience() {
  const [torusGeometry, setTorusGeometry] = useState();
  const [material, setMaterial] = useState();

  const { donutsNumber } = useControls({
    donutsNumber: { value: 60, min: 1, max: 100 },
  });

  const donuts = useRef([]);
  const donutsGroup = useRef();

  const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 256);

  const tempArray = [...Array(donutsNumber)];

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.x += delta * 0.1;
      donut.rotation.y += delta * 0.1;
    }
  });
  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

      <Center>
        <Text3D
          font='./fonts/helvetiker_regular.typeface.json'
          material={material}
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Homepilot
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {tempArray.map((value, index) => {
          const position = [
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ];

          const scale = 0.2 + Math.random() * 0.2;

          const rotation = [
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0,
          ];

          return (
            <mesh
              ref={(donut) => {
                donuts.current[index] = donut;
              }}
              geometry={torusGeometry}
              material={material}
              key={index}
              position={position}
              scale={scale}
              rotation={rotation}
            ></mesh>
          );
        })}
      </group>
    </>
  );
}
