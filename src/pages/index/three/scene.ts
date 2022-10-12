import * as THREE from "three";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {Scene} from "three/src/scenes/Scene";

/**
 * 初始化场景
* */
export const sceneInit = ():Scene => {
  const scene = new THREE.Scene();

  // 开启雾化
  // scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

  // 背景
  scene.background = new THREE.Color( 0x8B8682 );
  return scene
}

/**
 * 增加hdr环境贴图
* */
interface SetSceneBackgroundOptions {
  scene: Scene
}
export const setSceneBackground = (options: SetSceneBackgroundOptions):void => {
  const {scene} = options
  const rgbeLoader = new RGBELoader();

  rgbeLoader.loadAsync(require('../images/sceneBg.hdr'))
      .then((texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // 配置场景背景
        scene.background = texture;
        // 配置场景环境
        scene.environment = texture;
      });
}

