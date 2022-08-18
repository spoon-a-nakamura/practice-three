uniform float u_progress;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
varying vec2 v_uv;

void main() {
  vec4 tex1 = texture2D(u_texture1, v_uv);
  vec4 tex2 = texture2D(u_texture2, v_uv);

  float dist = distance(vec2(0.5), v_uv);
  float border = step(u_progress, dist);

  vec4 tex = mix(tex1, tex2, border);

  gl_FragColor = tex;
}