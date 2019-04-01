import Stage from '../application/Stage';

const shaderFrag = `
precision mediump float;
  
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 u_resolution;
uniform vec2 dimensions;
uniform vec4 filterArea;

// math const
const float PI = 3.14159265359;
const float DEG_TO_RAD = PI / 180.0;

vec2 Kaleidoscope( vec2 uv, float n ) {
  float angle = PI / n;

  float r = length( uv );
  float a = atan( uv.y, uv.x ) / angle;

  a = mix( fract( a ), 1.0 - fract( a ), mod( floor( a ), 2.0 ) ) * angle;

  return vec2( cos( a ), sin( a ) ) * r;
}

void main() {
  vec2 coord, uv, sample;

   coord = vTextureCoord.xy * filterArea.xy;
   uv = (coord - 0.5 * dimensions.xy) / min(dimensions.y, dimensions.x);

   // if(uv.x < 0.) {
   //   gl_FragColor = vec4(0., 1., 0., 1.);
   // }
   // if(uv.x > .5) {
   //   gl_FragColor = vec4(0., 1., 0., 1.);
   // }
   // if(uv.x < -.5) {
   //   gl_FragColor = vec4(1., 0., 0., 1.);
   // }
   // if(uv.y < 0.) {
   //   gl_FragColor = vec4(0., 0., 1., 1.);
   // }

   // if(vTextureCoord.x < .5) {
   //   gl_FragColor = vec4(1., 0., 0., 1.);
   //   return;
   // }

  // coord = vTextureCoord.xy * filterArea.xy;
  //uv = (coord - 0.5 * filterArea.xy) / filterArea.y;
  uv = Kaleidoscope(uv, 6.) + .5;
  vec4 c = texture2D(uSampler, uv * normalize(filterArea.yx));

  // vec2 fr = fract(uv * 5.);
  // c = mix(c, vec4(0.), smoothstep(.25, .2, length(fr - .5)));

  gl_FragColor += c;
}
`;

class BWFilter extends PIXI.Filter {
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

export default BWFilter;