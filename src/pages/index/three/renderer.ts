// 初始化渲染器
import * as THREE from "three";
import {WebGLRenderer} from "three/src/renderers/WebGLRenderer";

export const webGLRendererInit = (): WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.autoClear = false;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  return renderer
}
