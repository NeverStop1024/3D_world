import * as THREE from "three";
import {Camera} from "three";

export const cameraInit = ():Camera => {
  // 实例化相机
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
  );

  // 设置相机位置
  camera.position.set(20, 30, 800);

  return camera
}
