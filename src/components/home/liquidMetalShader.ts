/**
 * GLSL for the hero's liquid-metal backdrop (see LiquidMetal.tsx).
 *
 * A full-screen fragment shader: a domain-warped height field is the surface
 * of a pool of pastel hydrochrome, its slope gives a normal, and that normal
 * picks the colour (pink, cyan, peach, lilac) and the sheen. No raymarching and no textures, so it is cheap enough to run
 * edge to edge. The pointer pushes a swell into the surface, and a soft veil
 * keeps the middle calm enough to read copy over.
 */

export const VERTEX = /* glsl */ `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uPointer; // xy in 0..1 (y up), z = strength

vec2 ptr;

// Height of the liquid at p: sine layers folded through a swirling warp.
float height(vec2 p) {
  float t = uTime;

  // The pointer drags the surface around it.
  vec2 d = p - ptr;
  float pull = exp(-dot(d, d) * 1.2) * uPointer.z;
  p -= d * pull * 0.35;

  vec2 q = p * 1.15;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    q += (0.62 / (1.0 + fi * 0.8)) *
         vec2(sin(q.y * 1.6 + fi * 1.9 + t * 0.22), cos(q.x * 1.4 - fi * 2.3 + t * 0.19));
  }
  float h = sin(q.x * 1.25 + t * 0.09) + 0.8 * sin(q.y * 1.05 - q.x * 0.45) + 0.4 * sin((q.x + q.y) * 2.1 - t * 0.2);
  return h * 0.5 + pull * 0.45;
}

// Pastel hydrochrome palette: the colours the surface slides between.
const vec3 PINK = vec3(1.0, 0.76, 0.92);
const vec3 CYAN = vec3(0.58, 0.88, 1.0);
const vec3 PEACH = vec3(1.0, 0.84, 0.76);
const vec3 LILAC = vec3(0.74, 0.70, 0.98);

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  vec2 p = uv * 2.3;
  ptr = (uPointer.xy - 0.5) * vec2(aspect, 1.0) * 2.3;

  // Slope by forward differences.
  float e = 0.03;
  float h = height(p);
  float hx = height(p + vec2(e, 0.0)) - h;
  float hy = height(p + vec2(0.0, e)) - h;
  vec3 n = normalize(vec3(-hx, -hy, e * 1.6));

  // Hue follows the slope and the height, so colour pools along the folds.
  float a = smoothstep(-0.55, 0.55, n.x + 0.25 * sin(h * 2.0 + uTime * 0.15));
  float b = smoothstep(-0.5, 0.5, n.y + 0.2 * h);
  vec3 col = mix(mix(PINK, CYAN, a), mix(PEACH, LILAC, a), b);
  col = mix(col, LILAC, 0.25 * smoothstep(0.2, 1.0, h));

  // Soft studio light: broad, creamy shading plus silky sheen on the creases.
  vec3 L = normalize(vec3(-0.45, 0.6, 0.65));
  float diff = dot(n, L) * 0.5 + 0.5;
  col *= 0.8 + 0.36 * diff;
  vec3 view = vec3(0.0, 0.0, -1.0);
  vec3 refl = reflect(view, n);
  col += vec3(1.0) * pow(max(dot(refl, L), 0.0), 9.0) * 0.55;
  col += vec3(1.0, 0.97, 1.0) * pow(max(dot(refl, normalize(vec3(0.5, -0.3, 0.8))), 0.0), 26.0) * 0.45;

  // Hairline bright edge on the steepest folds, the metal giveaway.
  float steep = 1.0 - clamp(n.z, 0.0, 1.0);
  col += vec3(1.0) * smoothstep(0.32, 0.6, steep) * 0.35;

  // A light veil over the middle so the copy stays legible.
  vec2 v = uv / vec2(0.5, 0.34);
  float veil = exp(-pow(dot(v, v), 1.2) * 1.0);
  vec3 wash = vec3(0.95, 0.935, 0.985);
  col = mix(col, wash, veil * 0.72);

  gl_FragColor = vec4(col, 1.0);
}
`;
