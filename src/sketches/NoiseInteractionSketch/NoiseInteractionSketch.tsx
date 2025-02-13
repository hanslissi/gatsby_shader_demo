import { P5CanvasInstance, SketchProps } from '@p5-wrapper/react';
import vert from './baseVertexShader.vert';
import frag from './noiseShader.frag';

type NoiseInteractionSketchProps = SketchProps & {
  currentColorIdx: number;
};

const noiseInteractionSketch = (p5: P5CanvasInstance<NoiseInteractionSketchProps>) => {
  let myShader: any;
  let lerpedMousepos: any;

  p5.setup = () => {
    const container = document.getElementById('p5-container');
    if (container) {
      p5.createCanvas(container.offsetWidth, container.offsetHeight, p5.WEBGL).parent(container);
    } else {
      p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    }
    myShader = p5.createShader(vert, frag);

    lerpedMousepos = p5.createVector(0, 0);
  };

  p5.draw = () => {
    lerpedMousepos = lerpedMousepos.lerp(p5.createVector(p5.mouseX, p5.mouseY), 0.05);

    p5.shader(myShader);

    // Set the resolution uniform (width, height of the canvas)
    myShader.setUniform('u_resolution', [p5.width, p5.height]);

    // Pass the mouse position to the scale uniform
    myShader.setUniform('u_scale', [
      p5.map(lerpedMousepos.y, 0, p5.height, 2, 3),
      p5.map(lerpedMousepos.x, 0, p5.width, 1, 1.5),
    ]);

    // Pass the time from p5
    myShader.setUniform('u_time', p5.millis());

    // Pass the mouse position as the spread intensity
    myShader.setUniform(
      'u_spread',
      p5.map(lerpedMousepos.y, 0, p5.height, 0.5, 1.0)
    );

    // Pass the mouse position as the evolution
    myShader.setUniform('u_evolution', p5.map(lerpedMousepos.y, 0, p5.height, 0.3, 0.7));

    // Pass the mouse position as the intensity
    myShader.setUniform(
      'u_intensity',
      p5.map(lerpedMousepos.x, 0, p5.width, 4, 1)
    );

    // Pass the position of the mouse, but already scaled
    myShader.setUniform('u_deltaPosition', [
      p5.map(lerpedMousepos.x, 0, p5.width, 1, -1),
      p5.map(lerpedMousepos.y, 0, p5.height, -1, 1),
    ]);

    // Draw a shape using the shader
    p5.rect(0, 0, p5.width, p5.height);
  };

  p5.windowResized = () => {
    const container = document.getElementById('p5-container');
    if (container) {
      p5.resizeCanvas(container.offsetWidth, container.offsetHeight);
    } else {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
  };
};

export default noiseInteractionSketch;
