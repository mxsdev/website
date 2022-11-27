import { glsl } from "../../util/gl/shader";

export const fontShadeFragSrc = glsl`
#version 300 es

precision highp float;

// uniform int ww;
// uniform int wh;

// uniform vec4 col1;
// uniform vec4 col2;

out vec4 FragColor;

void main()
{
    FragColor = vec4(1.0, 1.0, 1.0, 1.0);

    // float x = gl_FragCoord.x / float(ww);
    // float y = gl_FragCoord.y / float(wh);

    // float fac = (x + y) / 2.0;

    // FragColor = mix(
    //     col1,
    //     col2,
    //     fac
    // );
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
uniform mat4 projection;
uniform mat4 model;

void main()
{
    gl_Position = projection * model * vec4(aPos.x, aPos.y, 0.0, 1.0);
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