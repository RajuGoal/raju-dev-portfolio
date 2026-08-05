import * as THREE from "three";

export function createGlobeScene(
  scene,
  { accentColor = 0xffa94d, lineColor = 0x2d4a73 } = {},
) {
  const group = new THREE.Group();

  const sphereGeo = new THREE.IcosahedronGeometry(2.4, 3);
  const wireGeo = new THREE.WireframeGeometry(sphereGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.5,
  });
  const wireframe = new THREE.LineSegments(wireGeo, wireMat);
  group.add(wireframe);

  const nodeCount = 90;
  const positions = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount);
    const theta = Math.sqrt(nodeCount * Math.PI) * phi;
    const r = 2.42;
    positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: accentColor,
    size: 0.045,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  group.add(nodes);

  scene.add(group);

  return {
    update(elapsed) {
      group.rotation.y = elapsed * 0.08;
      group.rotation.x = Math.sin(elapsed * 0.05) * 0.1;
    },
    dispose() {
      scene.remove(group);
      sphereGeo.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
    },
  };
}
