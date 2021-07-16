function getBowtie() {
  const positions = [
    -2, -2, 0, // index 0
     0, -1, 0, // index 1
     2, -2, 0, // index 2
    -2,  2, 0, // index 3
     0,  1, 0, // index 4
     2,  2, 0, // index 5
  ];
  const triangles = [
    0, 4, 3, // first triangle
    0, 1, 4, // second triangle
    1, 5, 4, // third triangle
    1, 2, 5, // fourth triangle
  ];
  return {positions, triangles};
}

function generateVee(nlongitudes) {
  const seeds = [
    new THREE.Vector3(1, -3, 0),
    new THREE.Vector3(3,  0, 0),
    new THREE.Vector3(1,  5, 0),
  ];

  const positions = [];

  for (let ilongitude = 0; ilongitude < nlongitudes; ilongitude += 1) {
    const radians = ilongitude * 0.05;
    const matrix = new THREE.Matrix4().makeRotationY(radians);
    for (let seedIndex = 0; seedIndex < seeds.length; seedIndex += 1) {
      const rotatedSeed = seeds[seedIndex].clone().applyMatrix4(matrix);
      positions.push(rotatedSeed.x, rotatedSeed.y, rotatedSeed.z);
    }
  }

  const triangles = [];
  for (let ilongitude = 0; ilongitude < nlongitudes - 1; ++ilongitude) {
    const iNextLongitude = (ilongitude + 1) % nlongitudes;
    for (let ilatitude = 0; ilatitude < 3 - 1; ++ilatitude) {
      const iNextLatitude = (ilatitude + 1) % 3;
      triangles.push(
        ilongitude * 3 + ilatitude,
        iNextLongitude * 3 + ilatitude,
        ilongitude * 3 + iNextLatitude,
      );
      triangles.push(
        iNextLongitude * 3 + ilatitude,
        iNextLongitude * 3 + iNextLatitude,
        ilongitude * 3 + iNextLatitude,
      );
    }
  }

  return {positions, triangles};
}