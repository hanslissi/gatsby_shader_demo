import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import * as styles from "./index.module.css";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import noiseInteractionSketch from "../sketches/NoiseInteractionSketch/NoiseInteractionSketch";

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
          <ReactP5Wrapper sketch={noiseInteractionSketch} />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Gatsby Shader Demo</title>;
