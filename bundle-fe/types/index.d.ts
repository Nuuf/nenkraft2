export as namespace nk2;

// Namespaces
export namespace Math {

}
export namespace Utility {

}
export namespace Cipher {
    export function CCH1(_string: string, _cci?: number): string;
    export function CCH1Decipher(_string: string, _cci?: number): string;
}
export namespace Controller {
    declare class GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        gl: WebGLRenderingContext | WebGL2RenderingContext;
        data: object;
        program: WebGLProgram;
        attributes: object;
        uniforms: object;
        static get LAST_USED_CONTROLLER(): GLProgramController;
        static set LAST_USED_CONTROLLER(_value: GLProgramController): void;
        Init(_vs: string, _fs: string): void;
        CreateShader(_script: string, _type: number): WebGLShader;
        AssignAttribute(_attribute: string): void;
        AssignUniform(_uniform: string): void;
        abstract Execute(): void;
    }
    declare class GLCircleProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        essenceBuffer: WebGLBuffer;
        vertices: Float32Array;
        fillColor: Color;
        outlineColor: Color;
        outline: number;
        Initialise(): void;
        Execute(_projection: Matrix2D, _x: number, _y: number, _radius: number): void;
    }
}

// Classes
declare class Pool {
    constructor();
    objects: object[];
    floodFunction: Function;
    floodAmount: number;
    context: any;
    Store(_object: object): void;
    PreRetrieve(): void;
    Retrieve(): object;
    Flood(_function?: Function, _amount?: number, _context?: any): void;
    Flush(): void;
    Clean(): void;
}
declare class Color {
    
}