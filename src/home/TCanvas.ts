import * as THREE from 'three'
import { TCanvasBase } from './TCanvasBase'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import { publicPath } from '../scripts/utils'
import GUI from 'lil-gui'

export class TCanvas extends TCanvasBase {
	private mesh?: THREE.Mesh

	constructor(parentNode: ParentNode) {
		super(parentNode)
		this.setScene()
		this.createModel()
		this.animate(this.update)
	}

	private setScene = () => {
		this.scene.background = new THREE.Color('#000')
		this.camera.position.z = 2

		this.setOrbitControls()
	}

	private createModel = async () => {
		const loader = new THREE.TextureLoader()
		const texture1 = await loader.loadAsync(publicPath('/resources/spoon1.jpg'))
		const texture2 = await loader.loadAsync(publicPath('/resources/spoon2.jpg'))

		const geometry = new THREE.PlaneGeometry()
		const material = new THREE.ShaderMaterial({
			uniforms: {
				u_progress: { value: 0 },
				u_texture1: { value: texture1 },
				u_texture2: { value: texture2 }
			},
			vertexShader,
			fragmentShader,
			side: THREE.DoubleSide
		})

		this.mesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.mesh)

		const gui = new GUI()
		gui.add(material.uniforms.u_progress, 'value', 0, 1, 0.01)
	}

	private update = () => {}
}
