"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function CarModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const centerRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const fitDistanceRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      containerRef.current?.appendChild(renderer.domElement);
      cameraRef.current = camera;

      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(
        "/bmw_m4_competition_m_package.glb",
        (gltf) => {
          const car = gltf.scene;
          scene.add(car);

          car.scale.set(2, 2, 2);
          car.position.set(0, -1, 0);
          const boundingBox = new THREE.Box3().setFromObject(car);
          const center = boundingBox.getCenter(new THREE.Vector3());
          const size = boundingBox.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fitDistance = maxDim * 1.5;

          centerRef.current.copy(center);
          fitDistanceRef.current = fitDistance;

          camera.position.set(center.x, center.y + 5, center.z + fitDistance);
          camera.lookAt(center);

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableZoom = true;

          controls.maxDistance = fitDistance * 2;
          controls.minDistance = fitDistance * 0.8;

          controls.maxPolarAngle = Math.PI / 2.1;
          controls.minPolarAngle = Math.PI / 4;

          controls.target.copy(center);
          controls.update();

          controlsRef.current = controls;

          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (error) => {
          console.error("Error loading the car model:", error);
        }
      );

      const onResize = () => {
        if (camera) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }
  }, []);

  const setView = (view: string) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const center = centerRef.current;
    const fitDistance = fitDistanceRef.current;

    if (camera && controls) {
      switch (view) {
        case "front":
          camera.position.set(center.x, center.y, center.z + fitDistance);
          break;
        case "rear":
          camera.position.set(center.x, center.y, center.z - fitDistance);
          break;
        case "side":
          camera.position.set(center.x + fitDistance, center.y, center.z);
          break;
        case "top":
          camera.position.set(center.x, center.y + fitDistance, center.z);
          break;
        case "reset":
          camera.position.set(center.x, center.y + 5, center.z + fitDistance);
          break;
      }
      camera.lookAt(center);
      controls.target.copy(center);
      controls.update();
    }
  };

  return (
    <div className="bg-black flex flex-col h-screen relative">
      <div className="w-[60vh] h-screen absolute right-0">
      </div>
      <div className="w-[60vh] h-screen absolute left-0">
      </div>
      <div
        ref={containerRef}
        className="flex-grow"
        style={{ height: "80vh" }}
      />
      <div className="justify-center items-center flex gap-4 relative">
        {["Front", "Rear", "Side", "Top", "Reset"].map((view) => (
          <div key={view} className="relative group">
            <button
              onClick={() => setView(view.toLowerCase())}
              className="px-4 py-2 bg-teal-600 text-black rounded-lg shadow-lg hover:bg-teal-500 transition-all duration-300 transform hover:scale-105"
            >
              {view} View
            </button>
            <span className="absolute bottom-10 w-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white text-sm bg-gray-700 px-2 py-1 rounded-lg shadow-lg transition-opacity duration-300">
              Go to {view.toLowerCase()} view
            </span>
          </div>
        ))}
      </div>
        
    </div>
  );
}