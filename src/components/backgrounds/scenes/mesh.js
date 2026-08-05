import * as THREE from "three";

/**
 * A small constellation of floating wireframe primitives (icosahedron,
 * torus knot, octahedron...) that slowly rotate and bob — a literal
 * "Three.js objects" showcase, doubling as an animated mesh background.
 */
export function createMeshScene(
  scene,
  { lineColor = 0x2d4a73, accentColor = 0xffa94d } = {},
) {
  const group = new THREE.Group();

  const geometries = [
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.DodecahedronGeometry(0.7, 0),
    new THREE.TorusGeometry(0.7, 0.22, 12, 48),
  ];

  const positions = [
    [-3.2, 1.2, -1],
    [3, -0.6, -2],
    [-2, -1.6, -1.5],
    [2.6, 1.8, -0.5],
    [0, 0, -3],
  ];

  const meshes = geometries.map((geo, i) => {
    const isAccent = i === 1;
    const mat = new THREE.MeshBasicMaterial({
      color: isAccent ? accentColor : lineColor,
      wireframe: true,
      transparent: true,
      opacity: isAccent ? 0.85 : 0.5,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const [x, y, z] = positions[i];
    mesh.position.set(x, y, z);
    mesh.userData.speed = 0.15 + Math.random() * 0.2;
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    group.add(mesh);
    return mesh;
  });

  scene.add(group);

  return {
    update(elapsed) {
      meshes.forEach((mesh, i) => {
        mesh.rotation.x = elapsed * mesh.userData.speed * 0.6;
        mesh.rotation.y = elapsed * mesh.userData.speed;
        mesh.position.y =
          positions[i][1] +
          Math.sin(elapsed * 0.5 + mesh.userData.floatOffset) * 0.25;
      });
      group.rotation.y = elapsed * 0.03;
    },
    dispose() {
      scene.remove(group);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    },
  };
}
