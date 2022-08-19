import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import { publicPath } from '../scripts/utils'
import GUI from 'lil-gui'

export class TCanvas extends TCanvasBase {
  private mesh?: THREE.Mesh
  private line?: THREE.Line

  constructor(parentNode: ParentNode) {
    super(parentNode)
    this.setScene()
    this.createModel()
    this.animate(this.update)
  }

  private setScene = () => {
    this.scene.background = new THREE.Color('#fff')
    this.camera.position.z = 2

    this.setOrbitControls()
  }

  private createModel = async () => {
    // texture
    const loader = new THREE.TextureLoader()
    const texture1 = await loader.loadAsync(publicPath('/resources/spoon1.jpg'))
    const texture2 = await loader.loadAsync(publicPath('/resources/spoon2.jpg'))

    const geometry = new THREE.PlaneGeometry()
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_progress: { value: 0 },
        u_texture1: { value: texture1 },
        u_texture2: { value: texture2 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(geometry, material)

    // line
    const points = []
    points.push(new THREE.Vector3(-1, 0, 0))
    points.push(new THREE.Vector3(0, 1, 0))
    points.push(new THREE.Vector3(1, 0, 0))
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    this.line = new THREE.Line(lineGeometry, lineMaterial)

    // text
    const text3d = new THREE.ExtrudeGeometry('text', {
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    })

    // scene
    this.scene.add(this.mesh)
    this.scene.add(this.line)
    this.scene.add(text3d)

    const gui = new GUI()
    gui.add(material.uniforms.u_progress, 'value', 0, 1, 0.01)
  }

  private update = () => {
    console.log()
  }
}
