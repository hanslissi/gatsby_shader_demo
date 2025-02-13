//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2024-11-07
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//
// I, Johannes Riedmüller, allowed myself to use the shader
// program and modify it, to fit my specific needs. I read
// the LICENSE file and therefore know that I can use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software without limitations. A copy of the
// LICENSE file is at: TODO

precision highp float;

uniform vec2 u_resolution;// Resolution of the canvas (width, height)
uniform vec2 u_scale;// Resolution of the canvas (width, height)
uniform float u_time;// Time for animation or movement
uniform float u_spread; // Spread of the noise ()
uniform float u_evolution; // evolution of the noise
uniform float u_intensity; // intensity of the noise
uniform vec2 u_deltaPosition; // delta position of the noise

vec4 mod289(vec4 x)
{
  return x-floor(x*(1./289.))*289.;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.)+10.)*x);
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159-.85373472095314*r;
}

vec2 fade(vec2 t){
  return t*t*t*(t*(t*6.-15.)+10.);
}

// Classic Perlin noise
float cnoise(vec2 P, float evolution)
{
  vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
  vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
  Pi=mod289(Pi);// To avoid truncation effects in permutation
  vec4 ix=Pi.xzxz;
  vec4 iy=Pi.yyww;
  vec4 fx=Pf.xzxz;
  vec4 fy=Pf.yyww;
  
  vec4 i=permute(permute(ix + evolution)+iy + evolution);
  
  vec4 angle = fract(i * (1.0 / 41.0) + evolution) * 2.0 * 3.14159265359;
  vec4 gx = cos(angle); // x-component of gradient vector
  vec4 gy = sin(angle); // y-component of gradient vector

  vec2 g00=vec2(gx.x,gy.x);
  vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z);
  vec2 g11=vec2(gx.w,gy.w);
  
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  
  float n00=norm.x*dot(g00,vec2(fx.x,fy.x));
  float n10=norm.y*dot(g10,vec2(fx.y,fy.y));
  float n01=norm.z*dot(g01,vec2(fx.z,fy.z));
  float n11=norm.w*dot(g11,vec2(fx.w,fy.w));
  
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
  return 2.3*n_xy;
}

#ifndef FNC_SRANDOM
#define FNC_SRANDOM

float srandom(in vec2 st) {
  return -1. + 2. * fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

#endif

void main(){
  vec2 uv=(gl_FragCoord.xy/u_resolution.xy); 

  uv += u_deltaPosition / 4.;

  uv /= u_scale;
  vec2 P=uv*1.5;// Scale the noise
  
  float perlinNoise=cnoise(P, u_evolution/10000.)*u_intensity;
  float randomNoise = srandom(gl_FragCoord.xy);
  //float perlinNoise=pnoise(P+u_time);
  //float perlinNoise=snoise(P);
  float noiseOutput = mix(perlinNoise, u_spread, 0.6); 
  noiseOutput = fract(noiseOutput);
  noiseOutput = mix(noiseOutput, randomNoise, 0.15); 

  vec4 myColor=vec4(noiseOutput,noiseOutput,noiseOutput,1.);
  // float noiseOutput = mix(perlinNoise, 0.5, 0.5); 

  gl_FragColor=myColor;
}
