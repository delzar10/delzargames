import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
  plugins: [ new ExtractTextPlugin(
     "styles.css"
    //allChunks: true
   )], //catching error, hot reloading, linting
  module: { // file types wanna to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("css?sourceMap")}, //!autoprefixer-loader
      {test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("css?sourceMap?!sass?sourceMap")},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
    ]
  }
}
