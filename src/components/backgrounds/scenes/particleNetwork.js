import * as THREE from "three";

/**
 * A cloud of drifting particles in 3D space, dynamically connected by lines
 * whenever two particles are within `linkDistance` of each other.
 */
export function createParticleNetworkScene(
  scene,
  {
    count = 110,
    bounds = 4.2,
    linkDistance = 1.4,
    color = 0x94a8d1,
    accentColor = 0xffa94d,
  } = {},
) {
  const particles = Array.from({ length: count }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * bounds * 2,
      (Math.random() - 0.5) * bounds * 2,
      (Math.random() - 0.5) * bounds * 2,
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.006,
    ),
    isAccent: Math.random() < 0.08,
  }));

  const pointPositions = new Float32Array(count * 3);
  const pointColors = new Float32Array(count * 3);
  const baseColor = new THREE.Color(color);
  const amber = new THREE.Color(accentColor);
  particles.forEach((p, i) => {
    const c = p.isAccent ? amber : baseColor;
    pointColors[i * 3] = c.r;
    pointColors[i * 3 + 1] = c.g;
    pointColors[i * 3 + 2] = c.b;
  });
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(pointPositions, 3),
  );
  pointGeo.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));
  const pointMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pointGeo, pointMat);
  scene.add(points);

  const maxLines = count * 8;
  const linePositions = new Float32Array(maxLines * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setDrawRange(0, 0);
  const lineMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.25,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  return {
    update() {
      for (const p of particles) {
        p.position.add(p.velocity);
        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(p.position[axis]) > bounds) p.velocity[axis] *= -1;
        });
      }

      const posAttr = pointGeo.attributes.position;
      particles.forEach((p, i) => {
        posAttr.array[i * 3] = p.position.x;
        posAttr.array[i * 3 + 1] = p.position.y;
        posAttr.array[i * 3 + 2] = p.position.z;
      });
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      for (let i = 0; i < particles.length && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < particles.length && lineIdx < maxLines; j++) {
          const dist = particles[i].position.distanceTo(particles[j].position);
          if (dist < linkDistance) {
            const a = particles[i].position;
            const b = particles[j].position;
            const base = lineIdx * 6;
            linePositions[base] = a.x;
            linePositions[base + 1] = a.y;
            linePositions[base + 2] = a.z;
            linePositions[base + 3] = b.x;
            linePositions[base + 4] = b.y;
            linePositions[base + 5] = b.z;
            lineIdx++;
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx * 2);
    },
    dispose() {
      scene.remove(points);
      scene.remove(lines);
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    },
  };
}
