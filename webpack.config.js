module.exports = {
  //define entry point
  entry: './script.js',

  //define output point
  output: {
    path: `${__dirname}/public/src`,
    filename: 'bundle.js',
  },

  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         exclude: /(node_modules)/,
  //         loader: 'babel-loader',
  //         query: {
  //           presets: ['@babel/preset-env'],
  //         },
  //       },
  //       // {
  //       //   test: /\.scss$/,
  //       //   loader: 'style-loader!css-loader!sass-loader',
  //       // },
  //     ],
  //   },
};
