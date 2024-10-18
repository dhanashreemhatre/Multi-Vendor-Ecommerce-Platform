"use client"
import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";
import Navbar from '../../../Components/Ui/Navbar/page'
import './main.css'
import Screen1 from '../../../Components/Ui/Screen1/page'
import Footer from './../../../Components/Ui/Footer/page'
function MeshComponent() {
  const fileUrl = "/Duck/glTF/Duck.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={[1.7, 1.7, 1.7]}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

const ProductsPage = () => {
  return (
    <>
    <div className='container'>
      <Navbar/>
      <div className="container_items">
      <Canvas className='canvas' style={{height:"400px"}}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
      </div>
     <div className="screen1">
      <Screen1/>
     </div>

    </div>
    <Footer/>
    </>
  );
}
export default ProductsPage;