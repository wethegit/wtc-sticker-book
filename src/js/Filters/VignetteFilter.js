import Stage from '../application/Stage';

const shaderFrag = `
precision mediump float;
  
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;

void main() {

  vec2 coord, uv;
  coord = vTextureCoord.xy * filterArea.xy;
  uv = (coord - 0.5 * dimensions.xy) / max(dimensions.y, dimensions.x);
  
  vec4 c = texture2D(uSampler, vTextureCoord);

  float l = length(uv);

  c.rgb *= clamp(1. - l * l * l * 2., 0., 1.);

  gl_FragColor = c;
}
`;

class VignetteFilter extends PIXI.Filter {
  constructor() {
    super(null, shaderFrag);
    this.uniforms.u_resolution = { type: "v2", value: { x:0, y:0 } };
  }
  apply = function(filterManager, input, output)
  {
    this.uniforms.u_resolution.x = this.stageInstance.dimensions.x;
    this.uniforms.u_resolution.y = this.stageInstance.dimensions.y;
    this.uniforms.dimensions[0] = input.sourceFrame.width
    this.uniforms.dimensions[1] = input.sourceFrame.height

    // draw the filter...
    filterManager.applyFilter(this, input, output);
  }
}

export default VignetteFilter;