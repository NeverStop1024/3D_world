import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {WebGLRenderer} from "three/src/Three";
import {Camera} from "three";

interface ControlsInitOptions {
  renderer: WebGLRenderer,
  camera: Camera,
}
export const controlsInit = (options: ControlsInitOptions): OrbitControls => {
  const {renderer, camera} = options

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents( window ); // optional

  // 优化作用，如果静态3d可以开这个，与requestAnimationFrame选其一
  // controls.addEventListener( 'change', render );

  // 阻尼效果
  controls.enableDamping = true;
  // 阻尼惯性大小
  controls.dampingFactor = 0.05;

  // 相机内移距离
  controls.minDistance = 100;
  // 相机外移距离
  controls.maxDistance = 800;

  //
  controls.maxPolarAngle = (Math.PI / 2.3);
  return controls
}