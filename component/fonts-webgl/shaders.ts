import { glsl } from "../../util/gl/shader";
import { perlin_3d } from "./perlin";

export const fontShadeFragSrc = glsl`
#version 300 es

precision highp float;

uniform int ww;
uniform int wh;

uniform vec4 col1;
uniform vec4 col2;

uniform float time;

out vec4 FragColor;

void main()
{
    float x = gl_FragCoord.x / float(ww);
    float y = gl_FragCoord.y / float(wh);

    float fac = ((x + y) / 2.0) + time / 2.0;

    FragColor = mix(
        col1,
        col2,
        (sin(fac*2.5)+1.0)/2.0
    );
}
`.trim()

export const fontMaskFragSrc = glsl`
#version 300 es

precision highp float;

out vec4 FragColor;

void main()
{
    FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`.trim()

export const fontMaskVertSrc = glsl`
#version 300 es

in vec2 aPos;
uniform vec2 origin;

uniform mat4 projection;
uniform mat4 model;

uniform float time;

uniform int charID;

${perlin_3d}

mat4 buildTranslation(vec3 delta)
{
    mat4 m;
    m[0][0] = 1.0;
    m[1][1] = 1.0;
    m[2][2] = 1.0;
    m[3] = vec4(delta, 1.0);
    return m;
}

mat4 rotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

void main()
{
    mat4 shift = buildTranslation(
        vec3(
            3.0 * (cnoise(vec3(time/2.0, 0.0, charID * 2))), // + cnoise(vec3(time, 4.0, gl_VertexID + charID * 2))),
            3.0 * (cnoise(vec3(time/2.0, 1.0, charID * 2))), // + cnoise(vec3(time, 6.0, gl_VertexID + charID * 2))),
            0.0
        )
    );

    mat4 rotb = rotationMatrix(vec3(0.0, 0.0, 1.0), radians(cnoise(vec3(time, 1.0, charID * 2)) * 10.0));
    mat4 rot = buildTranslation(vec3(origin, 0.0)) * rotb * buildTranslation(vec3(-origin, 0.0));

    gl_Position = projection * shift * model * rot * vec4(aPos, 0.0, 1.0);
}
`.trim()

export const fontShadeVertSrc = glsl`
#version 300 es

in vec2 aPos;

void main()
{
    gl_Position = vec4(aPos.x, aPos.y, 0.0, 1.0);
}
`.trim()