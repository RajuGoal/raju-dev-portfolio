import * as THREE from "three";

/**
 * A wireframe plane whose vertices ripple with layered sine waves,
 * like a digital terrain / blueprint contour map animating in real time.
 */
export function createGridScene(
  scene,
  { color = 0x2d4a73, accentColor = 0xffa94d } = {},
) {
  const size = 10;
  const segments = 48;
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2.3);

  const material = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const grid = new THREE.Mesh(geometry, material);
  grid.position.y = -1.2;
  scene.add(grid);

  const posAttr = geometry.attributes.position;
  const highlightCount = 12;
  const highlightIndices = Array.from(
    { length: highlightCount },
    () => Math.floor(Math.random() * (posAttr.count / 2)) * 2,
  );
  const highlightGeo = new THREE.BufferGeometry();
  const highlightPositions = new Float32Array(highlightCount * 3);
  const highlightMat = new THREE.PointsMaterial({
    color: accentColor,
    size: 0.08,
    transparent: true,
    opacity: 0.9,
  });
  const highlightPoints = new THREE.Points(highlightGeo, highlightMat);
  scene.add(highlightPoints);

  const basePositions = posAttr.array.slice();

  return {
    update(elapsed) {
      const arr = posAttr.array;
      for (let i = 0; i < arr.length; i += 3) {
        const x = basePositions[i];
        const z = basePositions[i + 2];
        arr[i + 1] =
          Math.sin(x * 0.6 + elapsed * 0.8) * 0.25 +
          Math.cos(z * 0.5 + elapsed * 0.6) * 0.25;
      }
      posAttr.needsUpdate = true;

      highlightIndices.forEach((idx, i) => {
        highlightPositions[i * 3] = arr[idx];
        highlightPositions[i * 3 + 1] = arr[idx + 1] + 0.05;
        highlightPositions[i * 3 + 2] = arr[idx + 2];
      });
      highlightGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(highlightPositions, 3),
      );

      highlightPoints.position.copy(grid.position);
      highlightPoints.rotation.copy(grid.rotation);

      grid.rotation.z = Math.sin(elapsed * 0.05) * 0.03;
    },
    dispose() {
      scene.remove(grid);
      scene.remove(highlightPoints);
      geometry.dispose();
      material.dispose();
      highlightGeo.dispose();
      highlightMat.dispose();
    },
  };
}
