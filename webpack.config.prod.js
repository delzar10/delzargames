import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default {
  debug: true, // Shows debug information
  devtool: 'source-map', // takes longer to generate because it is available to download when you want to inspect the code.
  noInfo: false, //Webpack no muestra archivos a los que esta bundling
  entry: [
    vendor: path.resolve(__dirname, 'ssrc/vendor'),
    main: path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
  ],
  target: 'web', //target to web we can change to another kind
  output: {
    path: path.resolve(__dirname, 'dist'), //Create something in memory y se lo pasa al navegador
    publicPath: '/', // Simula los archivos
    filename: '[name].[chunckhash].js' // Simula los archivos
  },
  plugins: [ 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html', 
      inject: true,
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3', //TrackJSTOKEN ON PRODUCTION ONLY
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebpackMd5Hash(), // Cache Busting solo descarga cuando haya cambios
    new webpack.optimize.DedupePlugin(), // Elimina Duplicados
    new webpack.optimize.UglifyJsPlugin(), // Minimiza el tamaño
    new ExtractTextPlugin('[name].[contenthash].css') //allChunks: true  // webpack v2 )], //catching error, hot reloading, linting
  ],
  module: { // file types wanna to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")}, //!autoprefixer-loader
      {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
    ]
  }
}
