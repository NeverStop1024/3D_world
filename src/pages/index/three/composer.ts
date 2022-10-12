import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {WebGLRenderer} from "three/src/Three";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {Camera} from "three";
import {Scene} from "three/src/scenes/Scene";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three";

/**
 * 效果合成
* */
interface EffectComposerInitOptions {
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
}
export const effectComposerInit = (options: EffectComposerInitOptions): EffectComposer => {
  const {renderer, scene, camera} = options
  const composer = new EffectComposer(renderer);
  composer.setSize(window.innerWidth, window.innerHeight);

  // 生成第一张原始图
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 制作灯光效果
  const effect = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,
      1,
      0
  );
  composer.addPass(effect);

  return composer
}
