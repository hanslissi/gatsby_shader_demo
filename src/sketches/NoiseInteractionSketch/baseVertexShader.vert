attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main(){
    pos=aTexCoord;
    pos.y=1.-pos.y;
    
    vec4 positionVec4=vec4(aPosition,1.);
    positionVec4.xy=positionVec4.xy*2.-1.;
    
    gl_Position=positionVec4;
}