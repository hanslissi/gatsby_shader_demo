import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({actions}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(vert|frag|glsl)$/,
          use: 'raw-loader',
        },
      ],
    },
  });
}