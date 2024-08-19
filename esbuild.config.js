const esbuild = require("esbuild");

const commonConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  legalComments: "none",
};

esbuild.buildSync({
  ...commonConfig,
  outfile: "dist/index.js",
  format: "cjs",
  platform: "node",
  target: ["node14"],
});

esbuild.buildSync({
  ...commonConfig,
  outfile: "dist/index.esm.js",
  format: "esm",
  platform: "neutral",
  target: ["es2015"],
});
