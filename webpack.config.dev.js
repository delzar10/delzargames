import path from 'path';

export default {
  debug: true, // Shows debug information
  devtool: 'inline-source-map', // takes longer to generate because it is available to download when you want to inspect the code.
  noInfo: false, //Webpack no muestra archivos a los que esta bundling
  entry: [
    path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
  ],
  target: 'web', //target to web we can change to another kind
  output: {
    path: path.resolve(__dirname, 'src'), //Create something in memory y se lo pasa al navegador
    publicPath: '/', // Simula los archivos
    filename: 'bundle.js' // Simula los archivos
  },
  plugins: [], //catching error, hot reloading, linting
  module: { // file types wanna to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
