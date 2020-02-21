// Make a counterclockwise (CCW) adjacency list:
//  Incident edges around a vertex are sorted CCW.
// Time complexity: 
//  O(|V|log|V|), since for a planar graph, |E| = O(|V|)).
function makeGraph(vertices, edges) {
  var graph = [];
  // Add vertices to the graph.
  for (var i = 0; i < vertices.length; i++) {
    graph[i] = [];
  }

  // Add edges to the adjacency lists.
  for (const edge of edges) {
    source = edge[0];
    dest = edge[1];
    graph[source].push(dest);
    graph[dest].push(source);
  }

  // Sort incident edges (of each vertex) CCW.
  // Time complexity: O(|E|log|E|).
  for (var u = 0; u < vertices.length; u++) {
    graph[u].sort(function (v0, v1) {
      x = vertices[u][0];
      y = vertices[u][1];
      x0 = vertices[v0][0];
      y0 = vertices[v0][1];
      x1 = vertices[v1][0];
      y1 = vertices[v1][1];
      alpha0 = Math.atan2(y0 - y, x0 - x); // angle of vector v0-u
      alpha1 = Math.atan2(y1 - y, x1 - x); // angle of vector v1-u
      return alpha0 - alpha1;
    });
  }

  return graph;
}

// CCW angle between 2d vectors u and v.
// Time complexity: O(1)
function angle(u, v) {
  u_norm = Math.sqrt(u[0] * u[0] + u[1] * u[1]);
  v_norm = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  dot = u[0] * v[0] + u[1] * v[1];
  cos = dot / (u_norm * v_norm);
  cross_z = u[0] * v[1] - u[1] * v[0]; // CCW: > 0; CW: < 0
  sin = cross_z / (u_norm * v_norm);
  if (cos >= 0)
    theta = Math.asin(sin);
  else if (sin > 0)
    theta = Math.acos(cos);
  else if (sin < 0)
    theta = -Math.acos(cos);
  else
    console.log("u and v cannot coincide!");
  return theta;
}

// Orientation of a face (CW or CCW) is
//  the sum of the changes in orientations of successive edges.
function isCCW(face, vertices) {
  // Compute relative position of consecutive vertices of the face
  //  as a sequence of vectors.
  var vectors = [];
  var p0 = vertices[face[face.length - 1]];
  var p1 = vertices[face[0]];
  var vector = [p1[0] - p0[0], p1[1] - p0[1]];
  vectors.push(vector);
  for (var i = 0; i + 1 < face.length; i++) {
    p0 = vertices[face[i]];
    p1 = vertices[face[i + 1]];
    vector = [p1[0] - p0[0], p1[1] - p0[1]];
    vectors.push(vector);
  }

  // Duplicate the first vector at the end,
  //  to make the for-loop simpler.
  vectors.push([vectors[0][0], vectors[0][1]]);

  // Add the consecutive orientation (angle) changes.
  var angle_sum = 0;
  for (var i = 0; i + 1 < vectors.length; i++) {
    var u = vectors[i];
    var v = vectors[i + 1];
    angle_sum += angle(u, v);
  }
  // face is a closed polygon, hence angle_sum == 2*PI or -2*PI.

  if (angle_sum > 0)
    return true; // Overall positive (CCW) angle change
  else
    return false; // Overall negative (CW) angle change
}

// Make a list of edges and their twins.
function addTwins(edges)
{
  var twins = [];
  for (edge of edges){
    twins.push(edge);
    twins.push([edge[1], edge[0]]);
  }
  return twins;
}

// Find all the interior faces.
// Time complexity: O(E)
function getInteriorFaces(input) {
  var vertices = input["vertices"];
  var edges = input["edges"];

  var graph = makeGraph(vertices, edges);

  // Make a map from each edge to its next CCW edge.
  // Time complexity: O(|E|).
  var nextCCW = {};
  for (var u = 0; u < vertices.length; u++) {
    var i = 0;
    for (; i + 1 < graph[u].length; i++) {
      edge = [graph[u][i], u];
      nextEdge = [u, graph[u][i + 1]];
      nextCCW[edge] = nextEdge;
    }
    nextCCW[[graph[u][i], u]] = [u, graph[u][0]];
  }

  // Following the next-CCW edges results in 
  //  CW inner faces and CCW outer faces.
  // Time complexity: O(|E|)
  var visited = {};
  var faces = [];
  for (edge of addTwins(edges)) {
    if (visited[edge]) continue;
    face = [edge[0]];
    visited[edge] = true;
    nextEdge = nextCCW[edge];
    while (nextEdge.toString() != edge.toString()) {
      face.push(nextEdge[0]);
      visited[nextEdge] = true;
      nextEdge = nextCCW[nextEdge];
    }
    if (isCCW(face, vertices))
      continue;
    faces.push(face);
  }

  return JSON.stringify({ "faces": faces, "vertices": vertices });
}

