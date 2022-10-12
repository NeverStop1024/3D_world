import * as THREE from "three";
import {Raycaster} from "three";

export const raycasterInit = (): Raycaster => {
  const raycaster = new THREE.Raycaster();
  return  raycaster
}