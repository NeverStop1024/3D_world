import * as THREE from "three";
import {AxesHelper, Camera} from "three";
import {CameraHelper} from "three/src/helpers/CameraHelper";

/**
 * 相机辅助线初始化
* */
interface CameraHelperInitOptions {
  camera:Camera
}
export const cameraHelperInit = (options: CameraHelperInitOptions):CameraHelper => {
  const {camera} = options
  const helper = new THREE.CameraHelper( camera );
  return helper
}

/**
 * 添加坐标轴辅助线
* */
export const axesHelperInit = (): AxesHelper => {
  const axesHelper = new THREE.AxesHelper( 500 );
  return axesHelper
}
