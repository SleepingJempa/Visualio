import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * 
 */
class ThreeCanvasManager {
    /**
     * 
     * @param {Element} canvas referring to the canvas
     * @param {Window} window the 
     * @param {Object} options
     */
    constructor(document, window, canvas, options) {
        this.document = document
        this.canvas = canvas
        this.window = window

        this.options = options
        
        this.init()
    }
    
    /**
     * Initializing all parts
     */
    init() {
        this.initScene()
        this.initCamera()
        this.initRenderer()
        this.initControls()
        this.initResourceControls()
        this.initClock()
    }
    
    /**
     * Scene Methods
     */
    initScene() {
        this.scene = new THREE.Scene()
    }

    /**
     * Resource controllers
     */
    initResourceControls() {
        this.loadingManager = new THREE.LoadingManager()
        this.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.textures = {}
    }

    /**
     * Camera Methods
     */
    initCamera() {
        if(this.options.camera.type == 'PerspectiveCamera') {
            let { fov, aspect } = this.options.camera
            this.camera = new THREE.PerspectiveCamera(fov, aspect)
        }
    }

    /**
     * Controls Method
     */
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.update()
    }

    /**
     * Renderer Methods
     */
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })

        this.renderer.setPixelRatio(this.window.devicePixelRatio)
        this.renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    }

    /**
     * Clock Methods
     */
    initClock() {
        this.clock = new THREE.Clock()
    }

    /**
     * Run method will be used in the main loop
     */
    run() {
        this.window.requestAnimationFrame(this.run.bind(this))
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
    

    /**
     * 
     * @param {String} path 
     * @param {String} name 
     */
    loadTexture(path, name = undefined) {
        name = name || path
        this.textures[name] = this.textureLoader.load(path)
        return this.textures[name]
    }

    /**
     * 
     * @param {String} name 
     * @return {THREE.Texture}
     */
    getTexture(name) {
        return this.textures[name]
    }

    /**
     * 
     * @param {String} feature 
     */
    enable(feature) {
        if (feature == 'resize')
            this.enableResize()
        if (feature == 'dblclick')
            this.enableDoubleClick()
    }

    /**
     * 
     * @param {String} feature 
     */
    disable(feature) {
        if (feature == 'resize')
            this.disableResize()
        if (feature == 'dblclick')
            this.disableDoubleClick()
    }

    /**
     * 
     */
    enableResize() {
        this.window.addEventListener('resize', () => {
            let width = this.window.innerWidth
            let height = this.window.innerHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        })
    }

    /**
     * 
     */
    enableDoubleClick() {
        this.window.addEventListener('dblclick', () => {
            const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement
            
            if (!fullscreenElement) {
                if (canvas.requestFullscreen) {
                    this.canvas.requestFullscreen()
                }
                else if (webkitRequestFullscreen) {
                    this.canvas.webkitRequestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    this.document.exitFullscreen()
                }
                else if(document.webkitRequestFullscreen) {
                    this.document.webkitRequestFullscreen()
                }
            }
        })
    }

    /**
     * 
     */
    disableResize() {

    }

    /**
     * 
     */
    disableDoubleClick() {

    }
}

export default ThreeCanvasManager