import * as THREE from 'three'

const canvas = document.getElementById('c')
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
const scene = new THREE.Scene()

const fov = 75
const aspect = 2
const near = 0.1
const far = 5
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

const boxWidth = 1
const boxHeight = 1
const boxDepth = 1
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

function makeInstance(geometry, color, x) {
	const material = new THREE.MeshPhongMaterial({ color })

	const cube = new THREE.Mesh(geometry, material)
	scene.add(cube)
	cube.position.x = x
	return cube
}

// make cube
const cubes = [
	makeInstance(geometry, 0x44aa88, 0),
	makeInstance(geometry, 0x8844aa, -2),
	makeInstance(geometry, 0xaa8844, 2),
]

// light
const color = 0xffffff
const intensity = 3
const light = new THREE.DirectionalLight(color, intensity)
scene.add(light)

const ambiance = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambiance)
function render(time) {
	time *= 0.001

	cubes.forEach((cube, idx) => {
		const speed = 1 + idx * 0.1
		const rotation = time * speed
		cube.rotation.x = rotation
		cube.rotation.y = rotation
	})

	renderer.render(scene, camera)
	requestAnimationFrame(render)
}
renderer.setSize(window.innerWidth, window.innerHeight)
requestAnimationFrame(render)
