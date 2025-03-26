import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import noiseInteractionSketch from "../sketches/NoiseInteractionSketch/NoiseInteractionSketch";
import DynamicP5Wrapper from "../components/DynamicP5Wrapper";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="container">
      <div className="contentContainer">
        <h1>Gatsby Shader Demo 🔮</h1>
        <p>
          This is a demo page showcasing shaders (.glsl, .frag, .vert files) in
          a Gatsby project while maintaining compatibility with the SSR
          pipeline. To find out more visit my dev.to article.
        </p>
        <div id="p5-container" className="sketchContainer">
          <DynamicP5Wrapper sketch={noiseInteractionSketch} />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Gatsby Shader Demo</title>;
