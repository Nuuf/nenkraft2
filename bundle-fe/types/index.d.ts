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
export namespace Assert {
    export const IS: string;
    export const IS_NOT: string;
    export const IS_SAME_TYPE: string;
    export const IS_NOT_SAME_TYPE: string;
    export const IS_INSTANCE_OF: string;
    export const IS_NOT_INSTANCE_OF: string;
    export const IS_LESS_THAN: string;
    export const IS_GREATER_THAN: string;
    export const IS_LESS_THAN_OR_EQUAL: string;
    export const IS_GREATER_THAN_OR_EQUAL: string;
    export function Assign(_g: object): void;
}
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
    export function ApplyProperties(_object: object, _props: object): void;
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
        onStop: Event.Dispatcher;
        onFinish: Event.Dispatcher;
        onStart: Event.Dispatcher;
        onReset: Event.Dispatcher;
        onPause: Event.Dispatcher;
        onResume: Event.Dispatcher;
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
    declare class Body2D {
        constructor(_shape: Shape);
        shape: Shape;
        mass: number;
        relative: Vector2D | null;
        velocity: Vector2D;
        offset: Vector2D;
        SetMass(_n: number): this;
        SetOffset(_x: number, _y: number): this;
        SetVelocity(_x: number, _y: number): this;
        SetVelocityV(_v: object | Vector2D | Math.Point): this;
        GetPosition(): Vector2D;
        SetPosition(_x: number, _y: number): this;
        SetPositionV(_v: object | Vector2D | Math.Point): this;
        SetRelative(_v: Vector2D): this;
    }
    export namespace AABB2DvsAABB2D {
        declare class Result {
            constructor();
            mtv: Vector2D;
            occured: boolean;
            Reset(): void;
        }
        export function Collide(_a: Body2D, _b: Body2D, _result: Result): boolean;
        export function SeparatingResponse(_a: Body2D, _b: Body2D, _result: Result): void;
    }
    export namespace AABB2DvsLine2D {
        declare class Result {
            constructor();
            poc: object;
            top: boolean;
            right: boolean;
            bottom: boolean;
            left: boolean;
            Reset(): void;
        }
        export function Collide(_a: Body2D, _b: Body2D, _result: Result): boolean;
    }
    export namespace CirclevsCircle {
        declare class Result {
            constructor();
            mtv: Vector2D;
            poc: object;
            mtd: number;
            delta: Vector2D;
            occured: boolean;
            Reset(): void;
        }
        export function Collide(_a: Body2D, _b: Body2D, _result: Result): boolean;
        export function ElasticResponse(_a: Body2D, _b: Body2D, _result: Result): void;
    }
    export namespace CirclevsLine2D {
        declare class Result {
            constructor();
            mtv: Vector2D;
            cp: Vector2D;
            sOrE: number;
            occured: boolean;
            Reset(): void;
        }
        export function Collide(_a: Body2D, _b: Body2D, _result: Result): boolean;
        export function ReflectingResponse(_a: Body2D, _b: Body2D, _result: Result): void;
    }
    export namespace Line2DvsLine2D {
        export function Line2DLine2DCollision(
            _startA: Vector2D, _endA: Vector2D,
            _startB: Vector2D, _endB: Vector2D,
            _p: Vector2D
        ): boolean;
    }
    export namespace Polygon2DvsPolygon2D {
        declare class Result {
            constructor();
            mtv: Vector2D;
            olAxis: Vector2D;
            mtd: number;
            occured: boolean;
            Reset(): void;
        }
        export function Collide(_a: Body2D, _b: Body2D, _result: Result): boolean;
        export function AxisSeparates(_a: Body2D, _b: Body2D, _axis: Vector2D, _result: Result);
        export function SeparatingResponse(_a: Body2D, _b: Body2D, _result: Result): void;
    }
}
export namespace Geom {
    export namespace PolygonConstruction {
        export namespace Butterfly2D {
            export namespace C {
                export let _1: number;
                export let _2: number;
                export let _3: number;
                export let _4: number;
                export let _5: number; 
            }
        }
        export namespace Supershape2D {
            export namespace C {
                export let _A: number;
                export let _B: number;
            }
        }
        export function Rectangular2D(
            _polygon: Polygon2D, _x: number, _y: number, 
            _w: number, _h: number
        ): Polygon2D;
        export function Isosceles2D(
            _polygon: Polygon2D, _x: number, _y: number, 
            _w: number, _h: number
        ): Polygon2D; 
        export function Cyclic2D(
            _polygon: Polygon2D, _x: number, _y: number, 
            _radius: number, _accuracy: number
        ): Polygon2D;
        export function Equilateral2D(
            _polygon: Polygon2D, _x: number, _y: number, 
            _side: number
        ): Polygon2D;
        export function Star2D(
            _polygon: Polygon2D, _x: number, _y: number, 
            _outerRadius: number, _innerRadius: number, _corners: number
        ): Polygon2D;
        export function Butterfly2D(
            _polygon: Polygon2D, _x: number, _y: number,
            _n: number, _radius: number
        ): Polygon2D;
        export function Rose2D(
            _polygon: Polygon2D, _x: number, _y: number,
            _radius: number, _k: number, _accuracy: number, _loops: number
        ): Polygon2D;
        export function Supershape2D(
            _polygon: Polygon2D, _x: number, _y: number,
            _radius: number, _accuracy: number, _m: number, 
            _n1?: number, _n2?: number, _n3: number
        ): Polygon2D;
    }
    declare class AABB2D {
        constructor(_tlx: number, _tly: number, _brx: number, _bry: number);
        tl: Vector2D;
        br: Vector2D;
        w: number;
        h: number;
        hw: number;
        hh: number;
        area: number;
        belongsTo: object | any;
        TYPE: number;
        static get TYPE(): number;
        Set(_tlx: number, _tly: number, _brx: number, _bry: number): this;
        SetC(_aabb2d: AABB2D): this;
        SetXYWH(_x: number, _y: number, _w: number, _h: number): this;
        SetPosition( _x: number, _y: number): this;
        GetPosition(): Vector2D;
        Scale(_x: number, _y: number, _notl?: boolean): this;
        ScaleV(_p: object | Vector2D | Math.Point, _notl?: boolean): this;
        ComputeWH(): this;
        IntersectsPoint2D(_p: object | Vector2D | Math.Point): boolean;
        ContainsPoint2D(_p: object | Vector2D | Math.Point): boolean;
        IntersectsAABB2D(_aabb: AABB2D): boolean;
        ContainsAABB2D(_aabb: AABB2D): boolean;
        GetQuadrant(_quadrant: string): AABB2D;
    }
    declare class Line2D {
        constructor(_sx: number, _sy: number, _ex: number, _ey: number);
        s: Vector2D;
        e: Vector2D;
        epsilon: number;
        belongsTo: object | any;
        TYPE: number;
        static get TYPE(): number;
        Set(_sx: number, _sy: number, _ex: number, _ey: number): this;
        SetC(_line2d: Line2D): this;
        SetPosition(_x: number, y: number): this;
        GetPosition(): Vector2D;
        Stretch(_magnitude: number): this;
        Rotate(_angle: number, _anchorX?: number, _anchorY?: number): this;
        Cut(_cuts: Vector2D[], _points?: []): Vector2D[];
        GetLength(): number;
        GetLengthSquared(): number;
        IntersectsPoint2D(_p: object | Vector2D | Math.Point): boolean;
        IntersectsLine2D(_line: Line2D): boolean;
        GetClosestPoint2DTo(_p: Vector2D): Vector2D;
        GetNormalA(): Vector2D;
        GetNormalB(): Vector2D;
    }
    declare class Ray2D extends Line2D {

    }
    declare class Polygon2D {
        constructor(_vertices?: Array<object | Vector2D | Math.Point>);
        vertices: Vector2D[];
        normals: Vector2D[];
        perimeterMidPoints: Vector2D[];
        centroid: Vector2D;
        aabb: AABB2D;
        dirtyBounds: boolean;
        dirtyCentroid: boolean;
        belongsTo: object | any;
        TYPE: number;
        static get TYPE(): number;
        Copy(): Polygon2D;
        SetC(_polygon: Polygon2D): this;
        ExtractSegments(_segments?: []): Line2D[];
        GenerateRandomPoints(_amount: number, _int?: boolean, _outside?: boolean): Vector2D[];
        AddVertex(_vertex: Vector2D): this;
        AddVertices(_vertices: Array<object | Vector2D | Math.Point>): this;
        Recreate(_vertices?: Vector2D[]): this;
        ComputeBounds(): this;
        Rotate(_angle: number, _anchorX?: number, _anchorY?: number): this;
        SetPosition(_x: number, _y: number): this;
        ComputeCentroid(): this;
        ComputeNormalsA(): this;
        ComputeNormalsB(): this;
        ComputePerimeterMidPoints(): this;
        IntersectsPoint2D(_p: object | Vector2D | Math.Point): boolean;
    }
    declare class Circle {
        constructor(_x: number, _y: number, _radius: number);
        center: Vector2D;
        diameter: number;
        w: number;
        h: number;
        radiusSquared: number;
        radiusUnsquared: number;
        area: number;
        belongsTo: object | any;
        TYPE: number;
        static get TYPE(): number;
        Set(_x: number, _y: number, _radius: number): this;
        SetC(_circle: Circle): this;
        SetPosition(_x: number, _y: number): this;
        GetPosition(): Vector2D;
        Scale(_scale: number): this;
        IntersectsCircle(_circle: Circle): boolean;
        ContainsCircle(_circle: Circle): boolean;
        IntersectsPoint2D(_p: Vector2D): boolean;
        GenerateRandomPoints(_amount: number, _int?: boolean, _outside?: boolean): Vector2D[];
        GeneratePerimeterPoints(_amount: number, _margin: number): Vector2D[];
        get x(): number;
        set x(_value: number);
        get y(): number;
        set y(_value: number);
        get radius(): number;
        set radius(_value: number);
    }
}
export namespace Packing {
    declare class RectanglePacker {
        constructor(_w: number, _h: number);
        root: Geom.AABB2D | null;
        propW: string;
        propH: string;
        w: number;
        h: number;
        __dynamic: boolean;
        padding: Vector2D;
        Pack(_objects: object[], _suppress: boolean): object[];
        PackDynamic(_objects: object[], _suppress: boolean): object[];
        Find(_node: Geom.AABB2D, _w: number, _h: number): Geom.AABB2D | null;
        Partition(_node: Geom.AABB2D, _w: number, _h: number): Geom.AABB2D;
        Extend(_w: number, _h: number): Geom.AABB2D | null;
        ExtendAxis(_w: number, _h: number, _vertical?: boolean): Geom.AABB2D | null;
        UseProp(_w: string, _h: string): this;
        SetSize(_w: number, _h: number): this;
        SetPadding(_x: number, _y: number): this;
    }
}
export namespace Path {
    declare class AABB2D extends Geom.AABB2D {
        constructor(_tlx: number, _tly: number, _brx: number, _bry: number, _style?: object);
        programController: Controller.GLProgramController | null;
        style: object;
        Render(_rc: CanvasRenderingContext2D): void;
        GLRender(_gl: WebGLRenderingContext | WebGL2RenderingContext, _transform2d: Transform2D): void;
        LinkProgramController(_pc: Controller.GLProgramController): this;
        UseProgramController(_pc: Controller.GLProgramController): this;
        LinkStyle(): this;
    }
    declare class Circle extends Geom.Circle {
        constructor(_x: number, _y: number, _radius: number, _style?: object);
        programController: Controller.GLProgramController | null;
        style: object;
        Render(_rc: CanvasRenderingContext2D): void;
        GLRender(_gl: WebGLRenderingContext | WebGL2RenderingContext, _transform2d: Transform2D): void;
        LinkProgramController(_pc: Controller.GLProgramController): this;
        UseProgramController(_pc: Controller.GLProgramController): this;
        LinkStyle(): this;
    }
    declare class Line2D extends Geom.Line2D {
        constructor(_sx: number, _sy: number, _ex: number, _ey: number, _style?: object);
        programController: Controller.GLProgramController | null;
        style: object;
        Render(_rc: CanvasRenderingContext2D): void;
        GLRender(_gl: WebGLRenderingContext | WebGL2RenderingContext, _transform2d: Transform2D): void;
        LinkProgramController(_pc: Controller.GLProgramController): this;
        UseProgramController(_pc: Controller.GLProgramController): this;
        LinkStyle(): this;
    }
    declare class Pixel extends Vector2D {
        constructor(_x: number, _y: number, _style?: object);
        style: object;
        color: Color;
        programController: Controller.GLProgramController | null;
        bufferData: number[];
        GLRender(_gl: WebGLRenderingContext | WebGL2RenderingContext, _transform2d: Transform2D): void;
        LinkProgramController(_pc: Controller.GLProgramController): this;
        UseProgramController(_pc: Controller.GLProgramController): this;
        LinkStyle(): this;
        GetBufferData(): number[];
        UpdateInBuffer(_buffer: Float32Array, _index: number): void
    }
    declare class Polygon2D extends Geom.Polygon2D {
        constructor(_vertices: Vector2D[], _style?: object);
        Render(_rc: CanvasRenderingContext2D): void;
    }
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
    declare class ImageLoader {
        constructor(_objects?: object[], _createTextures?: boolean, _onComplete?: Function);
        imageCache: Cache;
        basicTextureCache: Cache;
        onImageLoaded: Event.Dispatcher;
        onComplete: Event.Dispatcher;
        onError: Event.Dispatcher;
        toLoadCount: number;
        loadedCount: number;
        loading: boolean;
        createTexture: boolean;
        Load(_objects?: object[], _createTextures?: boolean): void;
        OnLoad(_event: any): void;
        OnError(_event: any): void;
        GetImageById(_id: any): Image | null;
        GetBasicTextureById(_id: any): Texture.BasicTexture2D | null;
    } 
    declare class XHRLoader {
        constructor(_objects?: object[], _onComplete?: Function);
        XHRCache: Cache;
        dataCache: Cache;
        onXHRLoaded: Event.Dispatcher;
        onComplete: Event.Dispatcher;
        onNetworkError: Event.Dispatcher;
        onLoadError: Event.Dispatcher;
        toLoadCount: number;
        loadedCount: number;
        loading: boolean;
        Load(_objects?: object[]): void;
        OnDataLoaded(_event: any): void;
        OnLoadXML(_event: any): void;
        OnLoadJSON(_event: any): void;
        OnNetworkError(_event: any): void;
        GetXHRById(_id: any): XMLHttpRequest | null;
        GetDataById(_id: any): object | null;
        CloneDataById(_id: any): object | null;
    }
    declare class SpritesheetLoader {
        constructor(_objects?: object[], _onComplete?: Function);
        spritesheetCache: Cache;
        xhrLoader: XHRLoader;
        imageLoader: ImageLoader;
        onComplete: Event.Dispatcher;
        onSpritesheetLoaded: Event.Dispatcher;
        toLoadCount: number;
        loadedCount: number;
        loading: boolean;
        Load(_objects?: object[]): void;
        OnSpritesheetLoaded(_id: any): void;
        OnPartXHRLoaded(_event: any): void;
        OnPartImageLoaded(_event: any): void;
        GetSpritesheetById(_id: any): Texture.Spritesheet | null;
    }
    declare class TilesetLoader {
        constructor(_objects?: object[], _onComplete?: Function);
        tilesetCache: Cache;
        mapDataLoader: XHRLoader;
        setDataLoader: XHRLoader;
        imageLoader: ImageLoader;
        onComplete: Event.Dispatcher;
        onTilesetLoaded: Event.Dispatcher;
        toLoadCount: number;
        loadedCount: number;
        loading: boolean;
        Load(_objects?: object[]): void;
        OnTilesetLoaded(_id: any): void;
        OnPartMapDataLoaded(_event: any): void;
        OnPartSetDataLoaded(_event: any): void;
        OnPartImageLoaded(_event: any): void;
        GetTilesetById(_id: any): Texture.Tileset | null;
    }
    declare class LoaderCombiner {
        constructor(_loaders: any[], _onComplete?: Function);
        loaders: any[];
        loaderCount: number;
        onComplete: Event.Dispatcher;
        Load(): void;
        OnLoaderComplete(): void;
    }
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
        Execute(_projection: Float32Array, _x: number, _y: number, _radius: number): void;
    }
    declare class GLDynamixTexture2DProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext, _units: number);
        units: number;
        originalTextures: Texture.BasicTexture2D[];
        texture: WebGLTexture[];
        essenceBuffer: WebGLBuffer[];
        lastUnitUsed: number;
        Initialise(): void;
        BindBasicTexture(_texture: Texture.BasicTexture2D, _unitId?: number, _param?: number): void;
        BindUnit(_gl: WebGLRenderingContext | WebGL2RenderingContext, _uniforms: object, _attributes: object, _unitId: number): void;
        Execute(_projection: Float32Array, _translation: Float32Array, _transformation: Float32Array, _tint: Float32Array, _unitId: number): void;
    }
    declare class GLLine2DProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        essenceBuffer: WebGLBuffer;
        vertices: Float32Array;
        color: Color;
        Initialise(): void;
        Execute(_projection: Float32Array, _s: Vector2D, _e: Vector2D): void;
    }
    declare class GLPixelBatchProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        dataBuffer: WebGLBuffer;
        previousNumberOfElement: number;
        Initialise(): void;
        Execute(_data: Float32Array, _numElement: number): void;
    }
    declare class GLRectangleProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        essenceBuffer: WebGLBuffer;
        vertices: Float32Array;
        fillColor: Color;
        outlineColor: Color;
        outline: number;
        Initialise(): void;
        Execute(_projection: Float32Array, _x: number, _y: number, _w: number, _h: number): void;
    }
    declare class GLRendertextureProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext, _un: object);
        essenceBuffer: WebGLBuffer;
        frameBuffer: WebGLFramebuffer;
        renderBuffer: WebGLRenderbuffer;
        texture: WebGLTexture;
        Initialise(): void;
        Config(
            _w: number, _h: number, _param?: number, 
            _ex?: number, _ey?: number, _ew?: number, _eh?: number
        ): void;
        ExecuteClean(): void;
        Execute(_projection: Float32Array, _translation: Float32Array, _transformation: Float32Array): void;
    }
    declare class GLTexture2DBatchProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        originalTexture: Texture.BasicTexture2D;
        texture: WebGLTexture;
        essenceBuffer: WebGLBuffer;
        dataBuffer: WebGLBuffer;
        previousNumberOfElements: number;
        Initialise(): void;
        BindBasicTexture(_texture: Texture.BasicTexture2D, _param?: number): void;
        Execute(_data: Float32Array, _numberOfElements: number): void;
    }
    declare class GLTexture2DProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext);
        originalTexture: Texture.BasicTexture2D;
        texture: WebGLTexture;
        essenceBuffer: WebGLBuffer;
        Initialise(): void;
        BindBasicTexture(_texture: Texture.BasicTexture2D, _param?: number): void;
        Execute(_projection: Float32Array, _translation: Float32Array, _transformation: Float32Array, _tint: Float32Array): void;
    }
    declare class GLUnProgramController extends GLProgramController {
        constructor(_gl: WebGLRenderingContext | WebGL2RenderingContext, _un: object);
        essenceBuffer: WebGLBuffer;
        vertices: Float32Array;
        Initialise(): void;
        Execute(_projection: Float32Array, _x: number, _y: number, _w: number, _h: number, _time: number): void;
    }
}
export namespace CP {
    declare class Command {
        constructor(
            _id: string, _handle: Function,
            _info?: boolean, _continueToPrime?: boolean,
            _filterNull?: boolean, _optionPrefix?: string
        );
        id: string[];
        handle: Function;
        info: string | null;
        data: object;
        options: Option[] | null;
        registry: Registry | null;
        optionPrefix: string;
        dataSeparator: string;
        fullInfo: string | null;
        continueToPrime: boolean;
        filterNull: boolean;
        jsonPrefix: string;
        static get OPTION_PREFIX(): string;
        static set OPTION_PREFIX(_value: string);
        Execute(_dataStrs: [], _data: object, _staticData?: object): void;
        AddOption(
            _id: string, _handle: Function,
            _info?: string, _priority?: number,
            _breakIfExecuted?: boolean, _optionPrefix?: string
        ): this;
        HandleData(_dataStrs: [], _data: object): void;
        HandleOptions(_dataStrs: [], _data: object, _staticData?: object): boolean;
        GetOptionById(_id: string): Option | null;
        GetAllOptionIds(): string[];
        GetAndRemoveMatchingOptionIds(_dataStrs: []): string[];
        GenerateInfoString(): string;
    }
    declare class Option {
        constructor(
            _id: string, _handle: Function,
            _info?: string, _priority?: number, _breakIfExecuted?: boolean
        );
        id: string[];
        handle: Function;
        info: string | null;
        priority: number;
        breakIfExecuted: boolean;
        data: object;
        command: Command | null;
        Execute(_dataStrs: [], _data: object, _staticData?: object): boolean;
    }
    declare class Registry {
        constructor();
        commands: Command[];
        splitter: string;
        AddCommand(_command: Command): Command;
        RemoveCommand(_command: Command): Command;
        GetCommandById(_id: string): Command | null;
        Parse(_str: string, _staticData?: object): string | null;
    }
}
export namespace Motion {
    declare class Manager {
        constructor(_target: object);
        motions: Motion[];
        target: object;
        Create(
            _id: string, _propertyString: string, 
            _value: number, _duration: number, _easing?: string
        ): Motion | null;
        Add(_motion: Motion): void;
        Start(_id: string): Motion | null;
        StartMultiple(_ids: string): void;
        Stop(_id: string): Motion | null;
        StopMultiple(_ids: string): void;
        Reset(_id: string): Motion | null;
        ResetMultiple(_ids: string): void;
        Process(): void;
        GetMotionById(_id: string): Motion | null;
    }
    declare class Motion {
        constructor(
            _id: string, _target: object, _propertyString: string,
            _value: number, _duration: number, _easing?: string
        );
        id: string;
        target: object;
        propertyString: string;
        value: number;
        duration: number;
        easing: Function;
        time: number;
        startValue: number;
        change: number;
        property: string | null;
        propertyObject: object | null;
        running: boolean;
        onStart: Event.Dispatcher;
        onEnd: Event.Dispatcher;
        onStop: Event.Dispatcher;
        onReconfigure: Event.Dispatcher;
        onReset: Event.Dispatcher;
        Start(): void;
        Stop(): void;
        Process(): void;
        Reconfigure(_propertyString: string, _value: number, _duration: number, _easing?: string): void;
        NewValue(_value: number): void;
        Reset(): void;
    }
}
export namespace Particle {
    export namespace P2D {
        declare class OscillatingObject {
            constructor(_from: number, _to: number, _amplitude: number);
            from: number;
            to: number;
            amplitude: number;
            active: boolean;
            Set(_from: number, _to: number, _amplitude: number): void;
            Inactivate(): void;
        }
        declare class Oscillation {
            constructor();
            velocityX: OscillatingObject | null;
            velocityY: OscillatingObject | null;
            torque: OscillatingObject | null;
            accelerationX: OscillatingObject | null;
            accelerationY: OscillatingObject | null;
            spin: OscillatingObject | null;
            growthX: OscillatingObject | null;
            growthY: OscillatingObject | null;
            gravityX: OscillatingObject | null;
            gravityY: OscillatingObject | null;
            active: boolean;
            CreateOscillatingObject(_key: string, _from: number, _to: number, _amplitude: number): void;
            SetOscillatingObject(_key: string, _from: number, _to: number, _amplitude: number): void;
            Nullify(_key: string): void;
        }
        declare class Particle {
            constructor(_options: object, _index?: number);
            velocity: Vector2D;
            torque: number;
            spin: number;
            growth: Vector2D;
            acceleration: Vector2D;
            initialScale: Vector2D;
            fade: boolean;
            deflate: boolean;
            gravity: Vector2D;
            lifespan: number;
            lifespanTotal: number;
            dead: boolean;
            entity: object | null;
            system: System | null;
            oscillation: Oscillation | null;
            oscillationOffset: number;
            static get USE_POOL(): boolean;
            static set USE_POOL(_value: boolean);
            static get pool(): Pool;
            Process(): void;
            Renew(_options: object, _index?: number): void;
            RenewVector(_object: object, _vector: Vector2D, _index?: number, _rx?: number, _ry?: number): void;
            SetLifespan(_value: number): void;
            ResetEntity(_unitId?: number): void;
            Destroy(_idDead?: boolean): boolean;
        }
        declare class System {
            constructor(_x: number, _y: number);
            particles: Particle[];
            deletionTimer: Time.Timer;
            Process(): void;
            HandleParticles(): void;
            HandleParticleDeletion(): void;
            AddParticle(_particle: Particle): Particle;
            RemoveParticle(_particle: Particle): Particle;
            Emit(_options: object): void;
        }
    }
}
export namespace Texture {
    declare class BasicTexture2D {
        constructor(
            _image: Image, _id?: string | any,
            _w?: number, _h?: number,
            _fullWidth?: number, _fullHeight?: number
        );
        image: Image;
        id: string | any | null;
        w: number;
        h: number;
        fw: number;
        fh: number;
        uniformId: number;
    }
    declare class Spritesheet {
        constructor(_basicTexture: BasicTexture2D, _data: object);
        id: string | any | null;
        basicTexture: BasicTexture2D;
        data: object;
        frameCache: Cache;
        GenerateFrames(): void;
        GetFrameById(_id: string): Animator.Frame;
    }
    declare class Tileset {
        constructor(_basicTexture: BasicTexture2D, _mapData: object, _setData: object);
        id: string | any | null;
        basicTexture: BasicTexture2D;
        mapData: object;
        setData: object;
        pc: Controller.GLProgramController | null;
    }
}
export namespace Animator {
    declare class Animation {
        constructor(_controller: Controller, _id?: string | any, _frameDuration?: number, _dynamicSize?: boolean);
        frames: Frame[];
        controller: Controller;
        sprite: Sprite;
        id: string | any;
        onEnd: Event.Dispatcher;
        onStart: Event.Dispatcher;
        currentFrame: number;
        currentFrameIndex: number;
        playing: boolean;
        frameDuration: number;
        timer: number;
        reverse: boolean;
        overrideFrameTimer: boolean;
        loop: boolean;
        dynamicSize: boolean;
        CreateFrame(
            _x: number, _y: number, _w: number, y: number, _duration: number,
            _offsetX?: number, _offsetY?: number, _originW?: number, _originH?: number
        ): void;
        AddFrame(_frame: Frame): void;
        GenerateFrames(
            _frameWidth: number, _frameHeight: number,
            _imageWidth: number, _imageHeight: number,
            _amount: number, _data?: object
        ): void;
        SetFrame(_index: number): void;
        GetFrameById(_id: string | any): Frame | null;
        SetFrameById(_id: string | any): void;
        Start(_index?: number): void;
        Stop(): void;
        Process(): void;
        NextFrame(): void;
        Clear(): void;
        Reset(): void;
        ResetAllFrames(): void;
    }
    declare class Controller {
        constructor(_sprite: Sprite);
        animations: Animation[];
        sprite: Sprite | null;
        currentAnimation: Animation | null;
        CreateAnimation(_id: string | any, _frameDuration?: number, _dynamicSize?: boolean): Animation;
        AddAnimation(_animation: Animation): void;
        GetAnimationById(_id: string | any): Animation | null;
        PlayAnimation(_id: string | any, _frameIndex?: number): void;
        StopCurrentAnimation(): void;
        Process(): void;
    }
    declare class Frame {
        constructor(
            _x: number, _y: number, _w: number, _y: number, _duration: number,
            _id?: string | any, _offsetX?: number, _offsetY?: number,
            _originW?: number, _originH?: number
        );
        duration: number;
        timer: number;
        x: number;
        y: number;
        w: number;
        h: number;
        offsetX: number;
        offsetY: number;
        originW: number;
        originH: number;
        id: string | any;
        Copy(): Frame;
        Process(): boolean;
        Apply(_sprite: Sprite, _dynamicSize?: boolean): this;
        FullApply(_sprite: Sprite): this;
        Reset(): this;
    }
}
export namespace Input {
    declare class Keyboard {
        constructor(_element: DOMElement);
        element: DOMElement;
        onDown: Event.Dispatcher;
        onUp: Event.Dispatcher;
        OnKeyDown(_event: any): void;
        OnKeyUP(_event: any): void;
        Destroy(): this;
    }
    declare class Mouse {
        constructor(_element: DOMElement, _offsetX: number, _offsetY: number);
        element: DOMElement;
        position: Vector2D;
        scale: Vector2D;
        offset: Vector2D;
        eventData: object;
        offsets: Vector2D[];
        onMove: Event.Dispatcher;
        onDown: Event.Dispatcher;
        onUp: Event.Dispatcher;
        onLeave: Event.Dispatcher;
        onWheel: Event.Dispatcher;
        get x(): number;
        get y(): number;
        OnMove(_event: any): boolean;
        OnDown(_event: any): void;
        OnUp(_event: any): void;
        OnLeave(_event: any): void;
        OnWheel(_event: any): void;
        CalculatePosition(_x: number, _y: number): void;
        AddOffset(_offset: Vector2D): this;
        Destroy(): this;
    }
    declare class Touch {
        constructor(_element: DOMElement, _offsetX: number, _offsetY: number);
        element: DOMElement;
        position: Vector2D;
        scale: Vector2D;
        offset: Vector2D;
        eventData: object;
        offsets: Vector2D[];
        onMove: Event.Dispatcher;
        onStart: Event.Dispatcher;
        onEnd: Event.Dispatcher;
        onCancel: Event.Dispatcher
        get x(): number;
        get y(): number;
        OnMove(_event: any): boolean;
        OnStart(_event: any): void;
        OnEnd(_event: any): void;
        OnCancel(_event: any): void;
        CalculatePosition(_x: number, _y: number): void;
        AddOffset(_offset: Vector2D): this;
        Destroy(): this;
    }
}
export namespace Event {
    declare class Dispatcher {
        constructor();
        listeners: Listener[];
        stopPropagation: boolean;
        target: object | any | null;
        data: object | any | null;
        GetListenerIndex(_handle: Function, _context?: any): number;
        Add(_handle: Function, _context?: any, _removeOnNextCall?: boolean): void;
        Once(_handle: Function, _context?: any): void;
        Remove(_handle: Function, _context?: any): void;
        Dump(_context?: any): void;
        Dispatch(_target?: any, _data?: any): void;
    }
    declare class Listener {
        constructor(_holderContext: any, _listenerContext: any, _handle: Function, _removeOnNextCall?: boolean);
        context: any;
        holderContext: any;
        handle: Function;
        removeOnNextCall: boolean;
        Execute(): void;
        Remove(): void;
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
    SetV(_p: object | Vector2D | Math.Point): this;
    Set(_x: number, _y: number): this;
    SetSame(_value: number): this;
    Is0(): boolean;
    AddVC(_p: object | Vector2D | Math.Point): this;
    AddV(_p: object | Vector2D | Math.Point): this;
    Add(_x: number, _y: number): this;
    SubtractVC(_p: object | Vector2D | Math.Point): this;
    SubtractV(_p: object | Vector2D | Math.Point): this;
    Subtract(_x: number, _y: number): this;
    MultiplyVC(_p: object | Vector2D | Math.Point): this;
    MultiplyV(_p: object | Vector2D | Math.Point): this;
    Multiply(_x: number, _y: number): this;
    DivideVC(_p: object | Vector2D | Math.Point): this;
    DivideV(_p: object | Vector2D | Math.Point): this;
    Divide(_x: number, _y: number): this;
    Normalize(): this;
    Positive(): this;
    Negative(): this;
    Invert(): this;
    Rotate(_angle: number): this;
    RotateAroundV(_p: object | Vector2D | Math.Point, _angle: number): this;
    RotateAround(_x: number, _y: number, _angle: number): this;
    RotateAbsolute(_angle: number): this;
    RotateAbsoluteAroundV(_p: object | Vector2D | Math.Point, angle: number): this;
    RotateAbsoluteAround(_x: number, _y: number, _angle: number): this;
    PushFromV(_p: object | Vector2D | Math.Point, _magnitude: number): this;
    PushFrom(_x: number, _y: number, _magnitude: number): this;
    GetWeightedAverageV(_p: object | Vector2D | Math.Point, _percentage: number): Vector2D;
    GetWeightedAverage(_x: number, _y: number, _percentage: number): Vector2D;
    GetAngle(): number;
    GetAngleBetweenV(_p: object | Vector2D | Math.Point): number;
    GetAngleBetween(_x: number, _y: number): number;
    GetDotV(_p: object | Vector2D | Math.Point): number;
    GetDot(_x: number, _y: number): number;
    GetCrossV(_p: object | Vector2D | Math.Point): number;
    GetCross(_x: number, _y: number): number;
    GetMagnitudeSquared(): number;
    GetMagnitude(): number;
    GetDistanceSquaredV(_p: object | Vector2D | Math.Point): number;
    GetDistanceSquared(_x: number, _y: number): number;
    GetDistanceV(_p: object | Vector2D | Math.Point): number;
    GetDistance(_x: number, _y: number): number;
    GetPerpendicularCCWV(_p: object | Vector2D | Math.Point): Vector2D;
    GetPerpendicularCCW(_x: number, _y: number): Vector2D;
    GetPerpendicularCWV(_p: object | Vector2D | Math.Point): Vector2D;
    GetPerpendicularCW(_x: number, _y: number): Vector2D;
    GetNormalAV(_p: object | Vector2D | Math.Point): Vector2D;
    GetNormalA(_x: number, _y: number): Vector2D;
    GetNormalBV(_p: object | Vector2D | Math.Point): Vector2D;
    GetNormalB(_x: number, _y: number): Vector2D;
    GetMidPointV(_p: object | Vector2D | Math.Point): Vector2D;
    GetMidPoint(_x: number, _y: number): Vector2D;
    IsEqualToV(_p: object | Vector2D | Math.Point): boolean;
    IsEqualTo(_x: number, _y: number): boolean;
    GetProjectionOntoV(_p: object | Vector2D | Math.Point): Vector2D;
    GetProjectionOnto(_x: number, _y: number): Vector2D;
    GetReflectionV(_p: object | Vector2D | Math.Point): Vector2D;
    GetReflection(_x: number, _y: number): Vector2D;
    Store(): this;
    AddTo(_Vectors: Vector2D[]): this;
    Floor(): this;
    Ceil(): this;
    Round(): this;
    GetMinMaxDot(_Vectors: Vector2D[]): Vector2D;
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
declare class Draw {

}