// Representation of a face as an array of edges.
function edgeList(face) {
  var edges = [[face[face.length - 1], face[0]]];
  for (var i = 0; i + 1 < face.length; i++) {
    edges.push([face[i], face[i + 1]]);
  }

  return edges;
}

// Similar to edgeList(face), with direction of edges reversed.
function edgeListReverse(face) {
  var edges = [[face[0], face[face.length - 1]]];
  for (var i = face.length - 1; i > 0; i--) {
    edges.push([face[i], face[i - 1]]);
  }

  return edges;
}

// Get neighboring faces of a face.
// Time complexity: O(E)
function getNeighbors(facesJSON, faceID) {
  var obj = JSON.parse(facesJSON);
  var faces = obj["faces"];

  // Make a map from each each to its face.
  // Time complexity: O(E)
  var edgeToFaceID = {};
  for (var i = 0; i < faces.length; i++) {
    for (edge of edgeList(faces[i])) {
      edgeToFaceID[edge] = i;
    }
  }

  // Get the neighbors of faceID.
  // Use a map first to ignore duplicates,
  // then convert to an array.
  var neighbors = {};
  var outerBoundary = edgeListReverse(faces[faceID]);
  for (edge of outerBoundary) {
    if (edgeToFaceID.hasOwnProperty(edge)) {
      neighbors[edgeToFaceID[edge]] = edgeToFaceID[edge];
    }
  }
  var neighborsArray = [];
  for (neighbor in neighbors) {
    neighborsArray.push(neighbors[neighbor]);
  }
  return neighborsArray;
}

function testGetNeighbors() {
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
  console.log(json);

  var neighbors = getNeighbors(json, 1);
  console.log(neighbors);
}

testGetNeighbors();
