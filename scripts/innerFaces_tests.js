// Input: 
//  a triangle
// Correct output: 
//  a single face (a permutation of [0,1,2] which are the vertex IDs)
function simplex1() {
  console.log('Testing getInteriorFaces() on simplex1...');
  var vertices = [
    [0, 0],
    [2, 0],
    [1, 1]
  ];
  var edges = [
    [0, 2],
    [2, 1],
    [1, 0]
  ];
  input = { "vertices": vertices, "edges": edges };

  json = getInteriorFaces(input);
  obj = JSON.parse(json);
  var faces = obj["faces"];
  var faces_str = '';
  for (face of faces){
    faces_str += '[' + face + ']';
  }
  console.log("Faces: " + faces_str);
}

// Input: 
//  a triangle (same as simplex1 but CCW representation)
// Correct output: 
//  a single face (a permutation of [0,1,2] which are the vertex IDs)
function simplex2() {
  console.log('Testing getInteriorFaces() on simplex2...');
  var vertices = [
    [0, 0],
    [2, 0],
    [1, 1]
  ];
  var edges = [
    [0, 1],
    [1, 2],
    [2, 0]
  ];
  input = { "vertices": vertices, "edges": edges };

  json = getInteriorFaces(input);
  obj = JSON.parse(json);
  var faces = obj["faces"];
  var faces_str = '';
  for (face of faces){
    faces_str += '[' + face + ']';
  }
  console.log("Faces: " + faces_str);
}

// Input: 
//  a concave polygon with four sides
// Correct output: 
//  a single face (a permutation of [0,1,2,3] which are the vertex IDs)
function concave() {
  console.log('Testing getInteriorFaces() on a concave polygon...');
  var vertices = [
    [0, 0],
    [2, 2],
    [-2, 0],
    [2, -2]
  ];
  var edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
  ];
  input = { "vertices": vertices, "edges": edges };

  json = getInteriorFaces(input);
  obj = JSON.parse(json);
  var faces = obj["faces"];
  var faces_str = '';
  for (face of faces){
    faces_str += '[' + face + ']';
  }
  console.log("Faces: " + faces_str);
}

// Input: 
//  a planar graph with five faces
// Correct output: 
//  five faces
function multi() {
  console.log('Testing getInteriorFaces() on a multiface graph...');
  var vertices = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-0.5, -1],
    [2, -1],
    [2, 0]
  ];
  var edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [0, 3],
    [0, 5],
    [0, 6],
    [2, 8],
    [3, 5]
  ];
  input = { "vertices": vertices, "edges": edges };

  json = getInteriorFaces(input);
  obj = JSON.parse(json);
  var faces = obj["faces"];
  var faces_str = '';
  for (face of faces){
    faces_str += '[' + face + ']';
  }
  console.log("Faces: " + faces_str);
}


simplex1();
simplex2();
concave();
multi();
