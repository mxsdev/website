import { ThickArrowDownIcon } from "@radix-ui/react-icons";
import { mat4, ReadonlyMat4, ReadonlyVec4, vec4 } from "gl-matrix"

export class ShaderProgram {
    private program: WebGLProgram

    constructor(
        private gl: WebGLRenderingContext, 
        vertexShaderCode: string,
        fragShaderCode: string,
    ) {
        const vertex = gl.createShader(gl.VERTEX_SHADER);
        if(!vertex) throw new Error("Cannot create vertex shader!")

        gl.shaderSource(vertex, vertexShaderCode);
        gl.compileShader(vertex);
        this.checkCompilerErrors(vertex, "VERTEX");

        const fragment = gl.createShader(gl.FRAGMENT_SHADER)
        if(!fragment) throw new Error("Cannot create fragment shader!")

        gl.shaderSource(fragment, fragShaderCode)
        gl.compileShader(fragment)
        this.checkCompilerErrors(fragment, "FRAGMENT")

        const program = gl.createProgram()
        if(!program) throw new Error("Cannot create shader program!")

        this.program = program
        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)
        this.checkCompilerErrors(program, "PROGRAM")

        gl.deleteShader(vertex)
        gl.deleteShader(fragment)
    }

    get id() {
        return this.program
    }
    
    use() {
        this.gl.useProgram(this.program)
    }

    setBool(name: string, value: boolean) {
        this.gl.uniform1i(
            this.uniformLocation(name),
            value ? 1 : 0
        )
    }

    setInt(name: string, value: number) {
        this.gl.uniform1i(
            this.uniformLocation(name),
            value
        )
    }

    setFloat(name: string, value: number) {
        this.gl.uniform1f(
            this.uniformLocation(name),
            value
        )
    }

    setMat4(name: string, value: ReadonlyMat4) {
        this.gl.uniformMatrix4fv(
            this.uniformLocation(name),
            false,
            value as Float32Array
        )
    }

    setVec4(name: string, value: ReadonlyVec4) {
        this.gl.uniform4fv(
            this.uniformLocation(name),
            value
        )
    }

    private uniformLocation(name: string) {
        return this.gl.getUniformLocation(this.program, name)
    }

    private checkCompilerErrors(program: WebGLProgram, type: "PROGRAM"): void;
    private checkCompilerErrors(shader: WebGLShader, type: "VERTEX"|"FRAGMENT"): void
    private checkCompilerErrors(shader: WebGLShader|WebGLProgram, type: "VERTEX"|"FRAGMENT"|"PROGRAM") {
        if(type !== "PROGRAM") {
            const log = this.gl.getShaderInfoLog(shader);
            if(log && log.length > 0) {
                throw log;
            }
        } else {
            const log = this.gl.getProgramInfoLog(shader);
            if(log && log.length > 0) {
                throw log;
            }
        }
    }
}

export const glsl = String.raw;