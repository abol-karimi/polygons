// Scale the coordinates up by a factor of 100.
// Then transform the coordinates
// from the frame at the center of window with rightward x-axis and upward y-axis
// to the frame of the window (at the top-left corner, with rightward x-axis and downward y-axis).
function transform(point) {
  factor = 100;
  point = [point[0] * factor, point[1] * factor];
  point[1] = -point[1]; // Mirror around the x-axis
  // Translate
  point[0] += canvas.width / 2;
  point[1] += canvas.height / 2;
  return point;
}

// Draw each face and paint with a unique color.
function drawFaces(faces, vertices) {
  // Get the canvas that we will draw the polygons on.
  var canvas = document.getElementById("canvas");

  // Create the drawing object
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Draw axes
  ctx.strokeStyle = '#777777'; // gray
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  ctx.lineTo(canvas.width, canvas.height/2);
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke(); 

  for (face of faces) {
    // Generate a random RGB color for painting the face.
    ctx.fillStyle = '#' + parseInt(Math.random() * 0xffffff).toString(16);
    // Paint the face.
    ctx.beginPath();
    start = transform(vertices[face[0]]);
    ctx.moveTo(start[0], start[1]);
    for (id of face) {
      current = transform(vertices[id]);
      ctx.lineTo(current[0], current[1]);
    }
    ctx.closePath();
    ctx.fill();
  }
}

function example() {
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
  drawFaces(obj["faces"], obj["vertices"]);
}

example();