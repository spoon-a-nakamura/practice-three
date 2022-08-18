import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export abstract class TCanvasBase {
	protected renderer!: THREE.WebGLRenderer
	protected scene!: THREE.Scene
	protected camera!: THREE.PerspectiveCamera
	protected clock!: THREE.Clock

	private controls?: OrbitControls

	constructor(private parentNode: ParentNode) {
		this.init()
		this.addEvents()
	}

	private init = () => {
		const { width, height, aspect } = this.size

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(width, height)
		renderer.shadowMap.enabled = true
		const container = this.parentNode.querySelector('.three-container')!
		container.appendChild(renderer.domElement)
		this.renderer = renderer

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)

		this.clock = new THREE.Clock()
	}

	protected setOrbitControls = () => {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.1
		return this.controls
	}

	protected get size() {
		const [width, height] = [window.innerWidth, window.innerHeight]
		return { width, height, aspect: width / height }
	}

	private addEvents = () => {
		window.addEventListener('resize', this.handleResize)
	}

	private handleResize = () => {
		const { width, height, aspect } = this.size

		this.camera.aspect = aspect
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(width, height)

		this.render()
	}

	protected animate = (callback: () => void) => {
		requestAnimationFrame(this.animate.bind(this, callback))

		this.controls?.update()
		callback && callback()

		this.render()
	}

	private render = () => {
		this.renderer.render(this.scene, this.camera)
	}
}
