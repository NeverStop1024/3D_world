import * as THREE from "three";
import { AmbientLight } from "three";
import {DirectionalLight} from "three/src/lights/DirectionalLight";

/**
 * 初始化平行光
* */
export const directionalLightInit = ():DirectionalLight => {
  const light = new THREE.DirectionalLight( 0xFFFFFF, 2.25 );
  light.position.set( 200, 450, 500 );
  // 光照产生阴影
  light.castShadow = true;

  // 影子的大小
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 512;

  light.shadow.camera.near = 100;
  light.shadow.camera.far = 1000;

  light.shadow.camera.left = - 1000;
  light.shadow.camera.right = 1000;
  light.shadow.camera.top = 350;
  light.shadow.camera.bottom = - 350;

  return light
}

/**
 * 初始化环境光
* */
export const ambientLightInit = ():AmbientLight => {
  const ambientLight = new THREE.AmbientLight( 0x222222 )
  return ambientLight
}