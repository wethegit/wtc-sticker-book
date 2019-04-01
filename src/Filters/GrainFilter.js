import Stage from '../application/Stage';

const shaderFrag = `
precision mediump float;
  
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(125.9898, 412.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main() {
  float n = rand(vTextureCoord * 128.);
  vec4 c = texture2D(uSampler, vTextureCoord);

  c.rgb *= 1. + (n * .12 - .08);

  gl_FragColor = c;
}
`;

class GrainFilter extends PIXI.Filter {
  constructor() {
    super(null, shaderFrag);
  }
}

export default GrainFilter;