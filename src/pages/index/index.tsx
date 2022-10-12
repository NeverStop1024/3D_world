
import {sceneInit, setSceneBackground} from "@/pages/index/three/scene";
import {cameraInit} from "@/pages/index/three/camera";
import {ambientLightInit, directionalLightInit} from "./three/light";
import {createBuilding, createGround} from "@/pages/index/three/mesh";
import {webGLRendererInit} from "@/pages/index/three/renderer";
import {controlsInit} from "@/pages/index/three/controls";
import {axesHelperInit} from "@/pages/index/three/helper";
import {raycasterInit} from "@/pages/index/three/raycaster";
import * as THREE from "three";
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";

export default () => {
  // 初始化场景
  const scene = sceneInit();

  // 添加相机
  const camera = cameraInit()
  scene.add(camera);

  // 添加环境光
  const ambientLight = ambientLightInit()
  scene.add(ambientLight);

  // 添加平行光
  const directionalLight = directionalLightInit()
  // scene.add(directionalLight);

  // 为场景添加背景
  setSceneBackground({scene})

  // 添加地面
  const ground = createGround()
  scene.add( ground );

  // 添加建筑
  createBuilding({scene})

  // 初始化渲染器
  const renderer = webGLRendererInit()
  // 将webgl渲染的canvas内容添加到body
  document.body.appendChild(renderer.domElement);

  // CSS2DRenderer
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.left = '0px';


  document.body.appendChild( labelRenderer.domElement );

  // 添加效果合成
  // const composer = effectComposerInit({renderer, scene, camera})

  // 创建轨道控制器
  controlsInit({renderer:labelRenderer as any,camera})

  // 添加坐标轴辅助器
  const axesHelper = axesHelperInit();
  scene.add(axesHelper);

  // 投射器
  const raycaster = raycasterInit()
  const mouse = new THREE.Vector2();

  // 鼠标点击事件
  window.addEventListener( 'pointerdown', onPointerDown );

  function onPointerDown( event: PointerEvent ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //因为y轴上面是正的，所以要取负号
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
    const intersects = raycaster.intersectObjects( scene.children, true );
    if ( intersects.length > 0 ) {
      const object = intersects[ 0 ].object;
      console.log(`点击物体名称：${object.name}`)
    }
  }

  function render() {
    renderer.render(scene, camera);
    labelRenderer.render( scene, camera );
    //  渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  window.onresize = function () {
    // @ts-ignore
    camera.aspect = window.innerWidth / window.innerHeight;
    // @ts-ignore
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
  };

  render();
}