import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.visualio')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
const scene = new THREE.Scene()


// Object
const myGeometry = new THREE.BoxGeometry(1, 1, 1)
// const myGeometry = new THREE.Geometry()

// const v1 = new THREE.Vector3(0, 0, 0)
// const v2 = new THREE.Vector3(1, 0, 0)
// const v3 = new THREE.Vector3(0, 0, 1)
// myGeometry.vertices.push(v1)
// myGeometry.vertices.push(v2)
// myGeometry.vertices.push(v3)

// const face = new THREE.Face3(0, 1, 2)
// myGeometry.faces.push(face)


const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000',
    wireframe: true
})

// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
const cubeMesh = new THREE.Mesh(myGeometry, cubeMaterial)
scene.add(cubeMesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true
const clock = new THREE.Clock()

gsap.to(cubeMesh.position, {
    duration: 2,
    delay: 1,
    x: 2
})

gsap.to(cubeMesh.position, {
    duration: 2,
    delay: 4,
    x: 0
})

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement
    
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if(document.webkitRequestFullscreen) {
            document.webkitRequestFullscreen()
        }
    }
})

const tick = () => {
    controls.update()
    cubeMesh.rotation.y += 0.01
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()