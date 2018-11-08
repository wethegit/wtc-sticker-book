import Stage from '../application/Stage';

const shaderFrag = `
precision mediump float;
  
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
  vec4 c = texture2D(uSampler, vTextureCoord);

  float colour = c.r + c.g + c.b;

  gl_FragColor = vec4(vec3(colour * .33), 1.);
}
`;

class BWFilter extends PIXI.Filter {
  constructor() {
    super(null, shaderFrag);
  }
}

export default BWFilter;