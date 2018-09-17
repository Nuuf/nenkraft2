
------

#### Nenkraft is a small rendering tool. (MIT License)

### How-to
------

[Setup](#setup)
[Stage2D](#stage2d)
[Sprite](#sprite)
[Graphic2D](#graphic2d)
[Motion](#motion)
[Stage2D, Camera2D and CanvasManager](#stage2d-camera2d-and-canvasmanager)
[Collision](#collision)


## Setup

```javascript

const canvas = document.createElement( 'canvas' );

document.body.appendChild( canvas );
canvas.setAttribute( 'width', window.innerWidth );
canvas.setAttribute( 'height', window.innerHeight );
canvas.style.display = 'initial';
canvas.style.position = 'absolute';

const conf = {
  canvas: canvas,
  x: 0,
  y: 0,
  halt: true
};

```

## Stage2D

```javascript

const stage = new nk2.Stage2D( conf );

stage.onProcess.Add( () => {
    
} );

```

## Sprite

```javascript

const sprite = new nk2.Sprite( 0, 0, nk2.Sprite.DEFAULT_TEXTURE );

stage.AddChild( sprite );

```

## Graphic2D

```javascript

const path = new nk2.Path.Circle( 0, 0, 50 );
const graphic = new nk2.Graphic2D( 0, 0, path );

stage.AddChild( graphic );

```

## Motion

```javascript

const motionManager = new nk2.Motion.Manager( sprite );
const motion = motionManager.Create( 'myMotion', 'x', 100, 60, 'SineInOut' );

motion.Start();

motion.onEnd.Add( () => {

  // Done

} );

stage.onProcess.Add( () => {

  motionManager.Process();

} );


```

## Stage2D, Camera2D and CanvasManager

```javascript

const width = 1920;
const height = 1080;
const halfWidth = width * 0.5;
const halfHeight = height * 0.5;
const stage = new nk2.Stage2D( {
  canvas: canvas,
  x: 0,
  y: 0,
  halt: false
} );
const root = new nk2.Container2D( 0, 0 );
const camera = new nk2.Camera2D( new Vector2D( 0, 0 ), { position: new nk2.Vector2D( 0, 0 ) } );
const scene = new nk2.Container2D( halfWidth, halfHeight );
const canvasManager = new nk2.CanvasManager( 
  canvas, 
  width, 
  height, 
  nk2.CanvasManager.KEEP_ASPECT_RATIO_FIT
);

stage
  .AddChild( root )
  .AddChild( camera )
  .AddChild( scene );

canvasManager
  .BindStage( stage )
  .BindRootContainer( root )
  .Trigger();

stage.onProcess.Add( () => {

  camera.Process();

} );

stage.mouse.onDown.Add( ( event ) => {

  const newPos = event.data.position
    .Copy()
    .SubtractV( scene.positon )
    .SubtractV( camera.position );

  camera.target.position.SetV( newPos );

} );

```

## Collision

```javascript

const geom_a = new nk2.Geom.AABB2D( 0, 0, 20, 20 );
const geom_b = new nk2.Geom.AABB2D( 0, 0, 60, 40 );
const body_a = {
  shape: geom_a,
  relative: new nk2.Vector2D( 0, 0 ),
  anchor: new nk2.Vector2D( 0, 0 )
};
const body_b = {
  shape: geom_b,
  relative: new nk2.Vector2D( 0, 0 ),
  anchor: new nk2.Vector2D( 0, 0 )
};
const result = new nk2.Collision.AABB2DvsAABB2D.Result();

nk2.Collision.AABB2DvsAABB2D.CollideRel( body_a, body_b, result );

if ( result.occured ) {

  // Collision
  body_a.relative.AddV( result.mtv );

} else {
  // No collision
}

```