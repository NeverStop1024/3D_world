import * as THREE from "three";
import {Mesh} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {Scene} from "three/src/scenes/Scene";
import {CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";

/**
 * 创建地面
* */
export const createGround = ():Mesh => {
  // 导入平面贴图
  const gt = new THREE.TextureLoader().load( require('../images/grasslight-big.jpg') );
  // 创建平面几何体
  const planeGeometry = new THREE.PlaneGeometry( 16000, 16000 );
  // 创建材质
  const meshPhongMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );

  // 创建地面物体
  const ground = new THREE.Mesh( planeGeometry, meshPhongMaterial );
  // 平面翻转
  ground.rotation.x = - Math.PI / 2;
  // 材质贴图
  ground.material.map!.repeat.set( 64, 64 );
  // 贴图包裹方式
  ground.material.map!.wrapS = THREE.RepeatWrapping;
  ground.material.map!.wrapT = THREE.RepeatWrapping;
  // sRGBEncoding更有质感
  ground.material.map!.encoding = THREE.sRGBEncoding;
  // 允许接受阴影
  ground.receiveShadow = true;

  return ground
}

/**
 * 建筑模型
* */
interface CreateBuildingOptions {
  scene: Scene
}
export const createBuilding = (options: CreateBuildingOptions) => {
  const {scene} = options
  // 添加建筑模型
  const loader = new FBXLoader();
  loader.resourcePath='/'
  loader.load( require('../models/zhiyu1.fbx'), function ( object ) {
    object.rotation.y = - Math.PI ;
    const bgMesh: any = object.children[2]
    const labelPosition: any = {
      ZhuLou_a_T1:{
        x:240,
        y:450,
        z:-30
      },
      ZhuLou_a_T2:{
        x:20,
        y:200,
        z:70
      },
    }

    object.children.forEach(mesh => {
      if(Object.keys(labelPosition).includes(mesh.name)){
        // 进行打点标注
        const labelDiv = document.createElement( 'div' );
        labelDiv.className = 'buildingName';
        labelDiv.textContent = mesh.name;
        const buildingLabel = new CSS2DObject( labelDiv );
        console.log('mesh',mesh)
        buildingLabel.position.set( labelPosition[mesh.name]?.x ?? 1, labelPosition[mesh.name]?.y ?? 0, labelPosition[mesh.name]?.z ?? 0 );
        mesh.add( buildingLabel );
      }
    })
    // 渲染前置操作
    bgMesh.material.onBeforeCompile = (shader: any) => {
      shader.uniforms.uTopColor = {
        value: new THREE.Color("#ffeeff"),
      };
      shader.uniforms.uHeight = {
        value: 2,
      };

      // 顶点着色器
      shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>

      varying vec3 vPosition;`
      );

      shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          `
      #include <begin_vertex>
      vPosition = position;
      `
      );

      // 片元着色器
      shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          `
      #include <common>
      
      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;      `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `
      #include <dithering_fragment>
      // 混合颜色

        if(vPosition.y < 80.0){
          gl_FragColor = vec4(68/255,1,0,1);
        }
      `
      );
    }

    object.traverse( function ( child ) {
      // @ts-ignore
      if ( child.isMesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    } );
    
    scene.add( object );
  },() => {}, (err) => {
    console.log('err',err)
  } );
}