// Input: 
//  a planar graph with five faces, a face with two neighbors
// Correct output: 
//  neighbors of each face
function multiFace1() {
  console.log('Testing getNeighbors() on a multiface graph...');
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
  var input = { vertices: vertices, edges: edges };

  var json = getInteriorFaces(input);
  var faces = obj["faces"];
  var faces_str = '';
  for (face of faces){
    faces_str += '[' + face + ']';
  }
  console.log("Faces: " + faces_str);

  for(var faceID = 0; faceID < faces.length; faceID++){
    var neighbors = getNeighbors(json, faceID);
    var neighbors_str = 'Neighbors of ' + faceID + ': ' + neighbors;
    console.log(neighbors_str);
  
  }
}

multiFace1();
