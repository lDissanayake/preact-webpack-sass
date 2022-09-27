const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    entry: { main: "./src/index.js" },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // fallback to style-loader in development
            argv.mode !== "production"
              ? "style-loader" // Creates `style` nodes from JS strings
              : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: __dirname + "/public",
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 9000,
      proxy: {
        "/add": "http://localhost:3000",
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "./css/[name].css",
        chunkFilename: "./css/[id].css",
      }),
    ],
  };
};
