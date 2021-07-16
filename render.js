// Create a rendering canvas that fills the window.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a scene to hold all our shapes.
const scene = new THREE.Scene();

// Create a camera sitting at (0, 0, 15) and looking at (0, 0, 0).
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 1);
camera.add(light);

const shape = generateVee(230);
console.log(shape);

let geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shape.positions), 3));
geometry.setIndex(shape.triangles);
geometry = geometry.toNonIndexed();
geometry.computeVertexNormals();

// Populate the scene with shapes.
const material = new THREE.MeshPhongMaterial({
  color: 'orange',
  shininess: 45,
  // side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const pointsMaterial = new THREE.PointsMaterial({
  color: 'red',
  size: 0.5,
});
const points = new THREE.Points(geometry, pointsMaterial);
// scene.add(points);

// Render the scene.
renderer.render(scene, camera);

const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2;
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();