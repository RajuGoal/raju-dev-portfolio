import * as THREE from "three";

/**
 * Classic spiral-galaxy particle field: particles are placed along spiral
 * arms with a color gradient from the core (amber) to the edges (slate blue).
 */
export function createGalaxyScene(
  scene,
  {
    count = 6000,
    radius = 5,
    branches = 4,
    spin = 1.2,
    randomness = 0.4,
    insideColor = 0xffa94d,
    outsideColor = 0x2d4a73,
  } = {},
) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorInside = new THREE.Color(insideColor);
  const colorOutside = new THREE.Color(outsideColor);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = Math.random() * radius;
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = r * spin;

    const randX = (Math.random() - 0.5) * randomness * r;
    const randY = (Math.random() - 0.5) * randomness * r * 0.4;
    const randZ = (Math.random() - 0.5) * randomness * r;

    positions[i3] = Math.cos(branchAngle + spinAngle) * r + randX;
    positions[i3 + 1] = randY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randZ;

    const mixed = colorInside.clone().lerp(colorOutside, r / radius);
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.x = 0.5;
  scene.add(points);

  return {
    update(elapsed) {
      points.rotation.y = elapsed * 0.06;
    },
    dispose() {
      scene.remove(points);
      geometry.dispose();
      material.dispose();
    },
  };
}
