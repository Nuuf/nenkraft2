export as namespace nk2;
// Namespaces
export namespace Math {
    export interface Point {
        x: number;
        y: number;
    }
    export const PII: number;
    export const TAU: number;
    export const PI5: number;
    export const DEGREES_TO_RADIANS: number;
    export const RADIANS_TO_DEGREES: number;
    export const RADIAN: number;
    export function DegreesToRadians(_degrees: number): number;
    export function RadiansToDegrees(_radians: number): number;
    export function PrecisionRound(_value: number, _precision: number): number;
    export function Spread(_start: number, _amount: number, _margin: number, _i:number): number;
    export function AttractRepel(
        _repeller: Vector2D, _attractor: Vector2D,
        _velocity: number, _radius: number, _strength: number
    ): void;
    export function Oscillate(_time: number, _from: number, _to: number, _amplitude: number): number;
    export function LikeASquareGrid(
        _objects: Array<object | Vector2D | Point>,
        _w: number, _marginX: number, _marginY: number, _offsetX: number, _offsetY: number
    ): void
    export function TriRectArray(_x: number, _y: number, _w: number, _y: number, _array?: number[]): number[];
    export function GreatestCommonDivisor(_x: number, _y: number): number;
    export function SimplifyAspectRatio(_x: number, _y: number, _array?: number[]): number[];
    export function IntegerNotation(_value: number, _roof: number, _splitter: string): string;
    export namespace Misc {
        export function Line2DLine2DIntersection(
            _startA: Vector2D, endA: Vector2D,
            _startB: Vector2D, endB: Vector2D
        ): boolean;
        export function ClosestPoint2DOnLine2D(_start: Vector2D, _end: Vector2D, _point: Vector2D): Vector2D;
    }
}
export function Assert(_data: any, _compare: string, _value: any, _noSelfAssert: boolean): void;
export namespace Utility {
    export function RandomInteger(_min: number, _max: number): number;
    export function RandomIntegerAvoid(_min: number, _max: number, _amin: number, _amax: number): number;
    export function RandomFloat(_min: number, _max: number): number;
    export function RandomFloatAvoid(_min: number, _max: number, _amin: number, _amax: number): number;
    export function IsInteger(_value: any): boolean;
    export function IsFloat(_value: any): boolean;
    export function IsArray(_value: any): boolean;
    export function Sign(_value: number, _1if0?: boolean): number;
    export function IsBitSet(_bit: number, _n: number): boolean;
    export function SetBit(_bit: number, _n: number): number;
    export function ClearBit(_bit: number, _n: number): number;
    export function ToggleBit(_bit: number, _n: number): number;
    export function Clamp(_value: number, _min: number, _max: number): number;
    export function InverseClamp(_value: number, _min: number, _max: number): number;
    export function FlipACoin(_a: any, _b: any): any;
    export function NearestPow2Floor(_n: number): number;
    export function NearestPow2Ceil(_n: number): number;
    export function NearestPow2Round(_n: number): number;
    export function GenerateSequence(_from: number, _to: number, _interval: number, _precision: number): number[];
    export function RandomInArray(_array: any[]): any;
    export function MinMaxOrValue(_options: object, _other?: string): object | any;
    export function UUID(_length?: number, _parts?: number, _charSetIndex?: number, _separator?: string): string;
    export function ApplyProperties(_object: object, _props: object); void;
    export function Nested(
        _object: object, _string: string, _getObjectHolding: boolean,
        _set: boolean, _value: any, _splitter?: string
    ): any; 
    export function ArrayGetRandom(_array: any[], _amount: number): any;
    export function ArrayShuffle(_array: any[]): void;
    export function Base16ToBase10(_value: string | number): number;
    export function Base2ToBase10(_value: string | number): number;
    export function IsObjectEmpty(_object: object): boolean;
    export function DeepClone(_object: object): object;
    export function CreateIteratorArgs(_args: string[], _pre: string, _post: string): any[];
    export function ReplaceArgumentWithObjectValue(_object: object, _args: string[], _pre: string): void;
    export function AssignIfUndefined(_o1: object, _o1: object): void;
    export function PRINT_VERSION(_server: boolean): void;
}
export namespace Cipher {
    export function CCH1(_string: string, _cci?: number): string;
    export function CCH1Decipher(_string: string, _cci?: number): string;
}
export namespace BrowserUtility {
    export function GenerateSimpleBase64PNG(
        _renderFunction: Function, _backgroundColor?: string,
        _forceWidth?: number, _forceHeight?: number
    ): string;
    export function ImageFromDataURL(_url: string, _onLoad: Function, _w?: number, _h?: number): Image;
    export function ParsedXMLToJSON(_xml: object, _deleteWhitespace?: boolean): object;
    export function XMLToJSON(_xml: string, _deleteWhitespace?: boolean): object;
    export function DownloadAsJSON(_obj: object | any, _fileName: string): void;
}
export namespace Style {
    export namespace GCO {
        export const DEFAULT: string;
        export const SOURCE_OVER: string;
        export const SOURCE_IN: string;
        export const SOURCE_OUT: string;
        export const SOURCE_ATOP: string;
        export const DESTINATION_OVER: string;
        export const DESTINATION_IN: string;
        export const DESTINATION_OUT: string;
        export const DESTINATION_ATOP: string;
        export const LIGHTER: string;
        export const COPY: string;
        export const XOR: string;
        export const MULTIPLY: string;
        export const OVERLAY: string;
        export const DARKEN: string;
        export const LIGHTEN: string;
        export const COLOR_DODGE: string;
        export const COLOR_BURN: string;
        export const HARD_LIGHT: string;
        export const SOFT_LIGHT: string;
        export const DIFFERENCE: string;
        export const EXCLUSION: string;
        export const HUE: string;
        export const SATURATION: string;
        export const COLOR: string;
        export const LUMINOSITY: string;
    }
    export namespace LineConf {
        export const CAP_ROUND: string;
        export const CAP_BUTT: string;
        export const CAP_SQUARE: string;
        export const JOIN_BEVEL: string;
        export const JOIN_ROUND: string;
        export const JOIN_MITER: string;
    }
    export namespace TextConf {
        export const ALIGN_START: string;
        export const ALIGN_END: string;
        export const ALIGN_CENTER: string;
        export const ALIGN_LEFT: string;
        export const ALIGN_RIGHT: string;
        export const BASELINE_ALPHABETIC: string;
        export const BASELINE_TOP: string;
        export const BASELINE_HANGING: string;
        export const BASELINE_MIDDLE: string;
        export const BASELINE_IDEOGRAPHIC: string;
        export const BASELINE_BOTTOM: string;
    }
    declare class Fill {
        constructor(_props?: object);
        color: string;
        applied: boolean;
        Apply(_rc: CanvasRenderingContext2D): void;
    }
    declare class Stroke {
        constructor(_props?: object);
        color: string;
        lineCap: string;
        lineJoin: string;
        lineWidth: number;
        lineDashOffset: number;
        lineDash: number[];
        miterLimit: number;
        applied: boolean;
        Apply(_rc: CanvasRenderingContext2D): void;
    }
    declare class Shadow {
        constructor(_props?: object);
        color: string;
        blur: number;
        offsetX: number;
        offsetY: number;
        applied: boolean;
        Apply(_rc: CanvasRenderingContext2D);
    }
    declare class Text {
        constructor(_props?: object);
        fillColor: string;
        strokeColor: string;
        fontSize: number;
        font: string | null;
        fontFamily: string;
        align: string;
        baseline: string;
        lineWidth: number;
        applied: boolean;
        Apply(_rc: CanvasRenderingContext2D);
        ConcatFont(): void;
    }
    declare class Pixel  {
        constructor(_props?: object);
        color: string;
        size: number;
    }
    export function All(_style?: object): object;
    export function FFSa(_style?: object): object;
    export function SSa(_style?: object): object;
    export function FSa(_style?: object): object;
    export function SaT(_style?: object): object;
    export function P(_style?: object): object;
}
export namespace Time {
    declare class Timer {
        constructor(_stopTime?: number);
        stopTime: number;
        time: number;
        isRunning: boolean;
        canResume: boolean;
        count: number;
        onStop: Dispatcher;
        onFinish: Dispatcher;
        onStart: Dispatcher;
        onReset: Dispatcher;
        onPause: Dispatcher;
        onResume: Dispatcher;
        Reset(): this;
        Start(_stopTime?: number): this;
        Stop(): this;
        Pause(): this;
        Resume(): this;
        Process(): void;
    }
    declare class Ticker {
        constructor(_onProcess: Function, _rate?: number, _halt?: boolean);
        onProcess: Function;
        intervalId: number | null;
        afId: number | null;
        delta: number;
        then: number;
        now: number;
        desiredRate: number;
        static get LOG(): boolean;
        static set LOG(_value: boolean);
        Process(): void;
        ProcessAF(): void;
        ComputeDelta(): number;
        GetTPS(): number;
        SetDesiredRate(_rate?: number): void;
        Start(_force?: boolean): void;
        StartAF(_force?: boolean): void;
        Stop(): void;
    }
    declare class ServerTicker {
        constructor(_onProcess: Function, _rate?: number, _halt?: boolean);
        onProcess: Function;
        intervalId: number | null;
        delta: number;
        then: number;
        now: number;
        desiredRate: number;
        static get LOG(): boolean;
        static set LOG(_value: boolean);
        Process(): void;
        ComputeDelta(): number;
        GetTPS(): number;
        SetDesiredRate(_rate?: number): void;
        Start(_force?: boolean): void;
        Stop(): void;
    }
}
export const CharacterSets: string[];
export namespace Ease {
    export function Linear(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function QuadIn(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function QuadOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function QuadInOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function SineIn(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function SineOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function SineInOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function CircIn(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function CircOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
    export function CircInOut(_time: number, _startValue: number, _amplitude: number, _duration: number): number;
}
export namespace Collision {

}
export namespace Geom {
    
}
export namespace Packing {

}
export namespace Path {

}
export namespace Draw {

}
export namespace Shader {
    export namespace SNIPPETS {
        export const VERTEX_TEXTURE_DEFAULT: string;
        export const VERTEX_TEXTURE_TRANSFORM: string;
        export const PI: string;
        export const RADIAN: string;
        export const RSEEDS: string;
        export const VRSEEDS: string;
        export const mod289: string;
        export const permute: string;
        export const rotate2d: string;
        export const scale2d: string;
        export const plot: string;
        export const ridge: string;
        export const pixelate: string;
        export const random: string;
        export const noise: string;
        export const gnoise: string;
        export const snoise: string;
        export const fbm: string;
        export const abs_fbm: string;
        export const rot_fbm: string;
        export const rmf: string;
        export const aabb: string;
        export const cruciform: string;
        export const circle: string;
    }
    export function Uglify(_data: string): string;
    export function ParseImports(_shader: string): object;
    export function Parse(_data: string): object;
    export function DynamicTEXTURE_2D(_num: number): object;
    export const TEXTURE_2D: object;
    export const TEXTURE_2D_BATCH: object;
    export const PIXEL_BATCH: object;
    export const RECTANGLE: object;
    export const CIRCLE: object;
    export const LINE2D: object;
    export const UN: object;
    export const RENDERTEXTURE_BLACK_WHITE: object;
    export const RENDERTEXTURE_GRAYSCALE: object;
    export const RENDERTEXTURE_SEPIA: object;
    export const RENDERTEXTURE_INVERT: object;
    export const RENDERTEXTURE_DEFAULT: object;
    export const WT: object;
}
export namespace Load {

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
        static set LAST_USED_CONTROLLER(_value: GLProgramController);
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
export namespace CP {

}
export namespace Motion {

}
export namespace Particle {

}
export namespace Texture {

}
export namespace Animator {

}
export namespace Input {

}
export namespace Event {

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
declare class FlagList {
    constructor();
    value: number;
    Add(_value: number): this;
    Remove(_value: number): this;
    Holds(_value: number): boolean;
    Toggle(_value: number): this;
}
declare class FlagEnum {
    constructor();
    NONE: number;
    next: number;
    Add(_id: string): this;
}
declare class Cache {
    constructor(_type: any);
    type: any;
    items: [];
    Store(_item: object): boolean;
    StoreSafe(_item: object): boolean;
    GetById(_id: string | any): object | null;
    Contains(_item: object | null, _id?: string | any): boolean;
}
declare class Glob {
    constructor();
    functions: object;
    values: object;
    constants: object;
    components: object;
    objects: object;
    lists: object;
    static get FUNCTION(): string;
    static get VALUE(): string;
    static get CONSTANT(): string;
    static get COMPONENT(): string;
    static get OBJECT(): string;
    static get LIST(): string;
    static get AllowGetNullUndefined(): boolean;
    static set AllowGetNullUndefined(_value: boolean);
    static Assign(_g: object): void;
    static Create(_id: string): void;
    Define(_type: string, _id: string, _value: any): void;
    Mark(_type: string, _id: string): void;
    Get(_type: string, _id: string): any;
    Set(_type: string, _id: string, _value: any): void;
}
declare class Maker {
    constructor();
    orders: [];
    classUsed: any | null;
    amount: number;
    locked: boolean;
    Many(_amount: number): this;
    Bind(_object: object, _reset?: boolean): this;
    Make(_class: object): this;
    Call(_function: Function | string, _args: any[] | string, _prop: string): this;
    Cast(_key: string, _value: any): this;
    Done(): any;
    Mass(): any[];
    Ship(_mass?: boolean): any[] | any;
}
declare class ArrayHandler {
    constructor(_object: object);
    object: object;
    static Get(_id: string): [];
    static GetAll(): object;
    static Add(_id: string, _array: []): this;
    In(_id: string): this;
    InAll(): this;
    Out(_id: string): this;
    OutAll(): this;
}
declare class Color {
    constructor(_r?: number, _g?: number, _b?: number, _a?: number);
    channel: Float32Array;
    value: string;
    currentConversion: string;
    Copy(): Color;
    ComputeValueRGBA(): this;
    ComputeValueHSLA(): this;
    ComputeValueHex(): this;
    Mix(_color: Color, _percentage: number): Color;
    ConvertToHSLA(_round?: boolean): void;
    SetRGB(_r: number, _g: number, _b: number, _noCompute?: boolean): this;
    SetRGBA(_r: number, _g: number, _b: number, _a: number): this;
    SetHex(_hex: string): this;
    IncreaseChannel(_channel: number, _value: number): this;
    SetChannel(_channel: number, _value: number): this;
    SetSame(_value: number): this;
    Normalize(): this;
    get r(): number;
    set r(_value: number);
    get g(): number;
    set g(_value: number);
    get b(): number;
    set b(_value: number);
    get a(): number;
    set a(_value: number);
}
declare class CanvasManager {
    constructor(_canvas: CanvasDOMElement, _w: number, _h: number, _node: string);
    canvas: CanvasDOMElement;
    w: number;
    h: number;
    aspectRatio: number[];
    onChange: Dispacher;
    mode: string;
    stage: Stage2D | null;
    culler: Culler2D | null;
    cullerAabbOrig: AABB2D | null;
    rootContainer: Container2D | null;
    currentWidth: number;
    currentHeight: number;
    static get FILL_SCREEN(): string;
    static get KEEP_ASPECT_RATIO(): string;
    static get KEEP_ASPECT_RATIO_MIN(): string;
    static get KEEP_ASPECT_RATIO_MAX(): string;
    static get KEEP_ASPECT_RATIO_FIT(): string;
    OnWindowResize(): void;
    Trigger(): this;
    Reconfigure(_w: number, _h: number, _mode: string): this;
    BindStage(_stage: Stage2D): this;
    BindRootContainer(_container: Container2D): this;
    BindCuller(_culler: Culler2D): this;
    SetCurrent(_w: number, _h: number): void;
    FillScreen(): void;
    KeepAspectRatio(): void;
    KeepAspectRatioMIN(): void;
    KeepAspectRatioMAX(): void;
    KeepAspectRatioFIT(): void;
    Destroy(): void;
}
declare class Vector2D {
    constructor(_x: number, _y: number);
    x: number;
    y: number;
    static get pool(): Pool;
    static get USE_POOL(): boolean;
    static set USE_POOL(_value: boolean);
    static SortMinMag(_a: Vector2D, _b: Vector2D): number;
    Copy(): Vector2D;
    FromPool(_x: number, _y: number): Vector2D;
    AbsoluteCopy(): Vector2D;
    SetV(_p: object | vector2D | Point): this;
    Set(_x: number, _y: number): this;
    SetSame(_value: number): this;
    Is0(): boolean;
    AddVC(_p: object | vector2D | Point): this;
    AddV(_p: object | vector2D | Point): this;
    Add(_x: number, _y: number): this;
    SubtractVC(_p: object | vector2D | Point): this;
    SubtractV(_p: object | vector2D | Point): this;
    Subtract(_x: number, _y: number): this;
    MultiplyVC(_p: object | vector2D | Point): this;
    MultiplyV(_p: object | vector2D | Point): this;
    Multiply(_x: number, _y: number): this;
    DivideVC(_p: object | vector2D | Point): this;
    DivideV(_p: object | vector2D | Point): this;
    Divide(_x: number, _y: number): this;
    Normalize(): this;
    Positive(): this;
    Negative(): this;
    Invert(): this;
    Rotate(_angle: number): this;
    RotateAroundV(_p: object | vector2D | Point, _angle: number): this;
    RotateAround(_x: number, _y: number, _angle: number): this;
    RotateAbsolute(_angle: number): this;
    RotateAbsoluteAroundV(_p: object | vector2D | Point, angle: number): this;
    RotateAbsoluteAround(_x: number, _y: number, _angle: number): this;
    PushFromV(_p: object | vector2D | Point, _magnitude: number): this;
    PushFrom(_x: number, _y: number, _magnitude: number): this;
    GetWeightedAverageV(_p: object | vector2D | Point, _percentage: number): Vector2D;
    GetWeightedAverage(_x: number, _y: number, _percentage: number): Vector2D;
    GetAngle(): number;
    GetAngleBetweenV(_p: object | vector2D | Point): number;
    GetAngleBetween(_x: number, _y: number): number;
    GetDotV(_p: object | vector2D | Point): number;
    GetDot(_x: number, _y: number): number;
    GetCrossV(_p: object | vector2D | Point): number;
    GetCross(_x: number, _y: number): number;
    GetMagnitudeSquared(): number;
    GetMagnitude(): number;
    GetDistanceSquaredV(_p: object | vector2D | Point): number;
    GetDistanceSquared(_x: number, _y: number): number;
    GetDistanceV(_p: object | vector2D | Point): number;
    GetDistance(_x: number, _y: number): number;
    GetPerpendicularCCWV(_p: object | vector2D | Point): Vector2D;
    GetPerpendicularCCW(_x: number, _y: number): Vector2D;
    GetPerpendicularCWV(_p: object | vector2D | Point): Vector2D;
    GetPerpendicularCW(_x: number, _y: number): Vector2D;
    GetNormalAV(_p: object | vector2D | Point): Vector2D;
    GetNormalA(_x: number, _y: number): Vector2D;
    GetNormalBV(_p: object | vector2D | Point): Vector2D;
    GetNormalB(_x: number, _y: number): Vector2D;
    GetMidPointV(_p: object | vector2D | Point): Vector2D;
    GetMidPoint(_x: number, _y: number): Vector2D;
    IsEqualToV(_p: object | vector2D | Point): boolean;
    IsEqualTo(_x: number, _y: number): boolean;
    GetProjectionOntoV(_p: object | vector2D | Point): Vector2D;
    GetProjectionOnto(_x: number, _y: number): Vector2D;
    GetReflectionV(_p: object | vector2D | Point): Vector2D;
    GetReflection(_x: number, _y: number): Vector2D;
    Store(): this;
    AddTo(_vectors: Vector2D[]): this;
    Floor(): this;
    Ceil(): this;
    Round(): this;
    GetMinMaxDot(_vectors: Vector2D[]): Vector2D;
}
declare class Matrix2D {

}
declare class Transform2D {

}
declare class Bounds2D {

}
declare class QuadtreeNode {

}
declare class CoreEntity2D {

}
declare class Container2D {

}
declare class VisualContainer2D {

}
declare class BatchableContainer2D {

}
declare class TextureEntity2D {

}
declare class Stage2D {

}
declare class Stadium {

}
declare class Graphic2D {

}
declare class Sprite {
    
}
declare class Tilesprite {

}
declare class Tile {

}
declare class Tilemap {

}
declare class Char {

}
declare class BitmapText {

}
declare class Text {

}
declare class Camera2D {

}
declare class GLEntity2D {

}
declare class Culler2D {

}