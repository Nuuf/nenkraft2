export as namespace nk2;
// Interfaces/Types
//
export interface Entity {

}
export interface Container {

}
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
    declare class ServerTicker {

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
    export interface Shape {

    }
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
    declare class AABB2D implements Shape {
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
    declare class Line2D implements Shape {
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
    declare class Polygon2D implements Shape {
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
    declare class Circle implements Shape {
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
    constructor();
    array: Float32Array;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    Identity(): void;
    Copy(): Matrix2D;
    Set(_a: number, _b: number, _c: number, _d: number, _e: number, _f: number): this;
    SetTransform(
        _x?: number, _y?: number, 
        _sx?: number, _sy?: number, 
        _r?: number, _skx?: number, _sky?: number, 
        _px?: number, _py?: number
    ): this;
    Translate(_x: number, _y: number): this;
    TranslateTo(_x: number, _y: number): this;
    ApplyTranslation(_x: number, _y: number): this;
    ApplyScale(_x: number, _y: number): this;
    Scale(_x: number, _y: number): this;
    Rotate(_angle: number): this;
    Decompose(_transform: Transform2D): this;
    ApplyToContext(_rc: CanvasRenderingContext2D): this;
    AsArray(_transpost?: boolean): Float32Array;
}
declare class Transform2D {
    constructor(_x: number, _y: number);
    position: Vector2D;
    scale: Vector2D;
    skew: Vector2D;
    pivot: Vector2D;
    localTransform: Matrix2D;
    globalTransform: Matrix2D;
    rotation: number;
    skewCX: number;
    skewSX: number;
    skewCY: number;
    skewSY: number;
    SetMatrix(_matrix: Matrix2D): this;
    UpdateLocal(): this;
    UpdateGlobal(_transform: Transform2D): this;
    UpdateSkew(): this;
    ApplyGlobal(_rc: CanvasRenderingContext2D): this;
}
declare class Bounds2D {
    constructor();
    local: Geom.AABB2D | null;
    localDirty: boolean;
    global: Geom.AABB2D | null;
    globalDirty: boolean;
    ComputeLocal(
        _x: number, _y: number, _w: number, _h: number,
        _anchor: object | Vector2D | Math.Point, _owner: object | any
    ): Geom.AABB2D;
    ComputeGlobal(
        _x: number, _y: number, _w: number, _h: number,
        _anchor: object | Vector2D | Math.Point, _owner: object | any,
        _matrix: Matrix2D
    ): Geom.AABB2D;
}
declare class QuadtreeNode {
    constructor(_aabb: Geom.AABB2D, _level: number, _objCap: number, _levelCap: number);
    nodes: object;
    objects: Geom.AABB2D[];
    convergence: Geom.AABB2D[];
    objectCap: number;
    levelCap: number;
    level: number;
    aabb: Geom.AABB2D | null;
    hasSplit: boolean;
    static get pool(): Pool;
    static get USE_POOL(): boolean;
    static set USE_POOL(_value: boolean);
    Set(_aabb: Geom.AABB2D, _level: number, _objCap: number, _levelCap: number): this;
    FromPool(_aabb: Geom.AABB2D, _level: number, _objCap: number, _levelCap: number): QuadtreeNode;
    Store(): void;
    Add(_object: Geom.AABB2D): void;
    Converge(_object: Geom.AABB2D): Geom.AABB2D[];
    Split(): void;
    Dump(): void;
    Marking(_object: Geom.AABB2D): string | null;
    ConcatNodes(_nodeList?: []): QuadtreeNode[];
}
declare class CoreEntity2D implements Entity {
    constructor(_x: number, _y: number);
    transform: Transform2D;
    data: object;
    w: number;
    h: number;
    bounds: Bounds2D;
    globalPosition: Vector2D | null;
    transformShouldUpdate: boolean;
    transformAutomaticUpdate: boolean;
    render: boolean;
    motionManager: Motion.Manager | null;
    arrayHandler: ArrayHandler | null;
    __inside__: boolean | null;
    get rotation(): number;
    set rotation(_value: number);
    get scale(): Vector2D;
    get position(): Vector2D;
    get pivot(): Vector2D;
    get x(): number;
    set x(_value: number);
    get y(): number;
    set y(_value: number);
    get width(): number;
    set width(_value: number);
    get height(): number;
    set height(_value: number);
    UpdateTransform(_parent: any): void;
    ProcessTransform(_parent: any): void;
    RequestTransformUpdate(): this;
    ComputeGlobalPosition(): Vector2D;
    ComputeLocalBounds(_anchor: Vector2D): Geom.AABB2D;
    ComputeGlobalBounds(_anchor: Vector2D, _matrix: Matrix2D): Geom.AABB2D;
    AHCreate(): this;
    AHIn(_id: string): this;
    AHOut(_id: string): this;
}
declare class Container2D extends CoreEntity2D implements Container {
    constructor(_x: number, _y: number);
    parent: Entity;
    children: Entity[];
    Render(): void;
    RenderChildren(): void;
    AddChild(_child: Entity): Entity;
    AddChildren(_children: Entity[]): this;
    Mount(_children: Entity[]): this;
    AddSbling(_sibling: Entity): Entity;
    RemoveChild(_child: Entity): Entity;
    RemoveChildren(_children: Entity[]): Entity[];
    Unmount(_children: Entity[]): Entity[];
    Swap(_withIndex: number): this;
    SendToFront(): this;
    SendToBack(): this;
    Dump(): this;
    Destroy(): this;
    AttachTo(_parent: Container): this;
    Detach(): Entity | null;
    GetChildClosestTo(_object: Entity | Vector2D | object, _filter?: Function): Entity | null;
    GetChildFurthestFrom(_object: Entity | Vector2D | object, _filter?: Function): Entity | null;
    ClusterBind(): this;
}
declare class Culler2D {
    constructor(_tlx: number, _tly: number, _brx: number, _bry: number);
    bounds: Geom.AABB2D;
    container: Container;
    entities: Entity[];
    rootMatrix: Matrix2D;
    onOut: Event.Dispatcher;
    onIn: Event.Dispatcher;
    BindContainer(_container: Container): this;
    SetRootMatrix(_matrix: Matrix2D): this;
    Process(): void;
}