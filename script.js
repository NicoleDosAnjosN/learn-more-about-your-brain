import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


const video = document.getElementById("bgVideo");
video.playbackRate = 1;

video.addEventListener("ended", () => {
  video.playbackRate = -1;
  video.play();
});

video.addEventListener("timeupdate", () => {
  if (video.currentTime <= 0 && video.playbackRate < 0) {
    video.playbackRate = 1;
    video.play();
  }
});


const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 20, 5);
scene.add(directionalLight);


const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(4, -6, 80);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("brainContainer").appendChild(renderer.domElement);


let brainModel;
const brainPivot = new THREE.Group();
scene.add(brainPivot);


const loader = new GLTFLoader();
loader.load(
  "brain.glb",
  function (gltf) {
    brainModel = gltf.scene;
    brainModel.scale.set(0.2, 0.2, 0.2);

   
    brainModel.position.set (-20, -1, 0)
    brainModel.rotation.y = Math.PI;

    brainPivot.add(brainModel);

    animate(); 
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  if (brainModel) {
    brainPivot.rotation.y += 0.004; 
  }

  renderer.render(scene, camera);
}

//  tirar depois
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);
