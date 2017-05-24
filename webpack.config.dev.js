import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  //debug: true, // Shows debug information
  devtool: 'inline-source-map', // takes longer to generate because it is available to download when you want to inspect the code.
  //noInfo: false, //Webpack no muestra archivos a los que esta bundling
  entry: {
    vendor: path.resolve(__dirname, 'src/api/vendor'),
    main: path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
    //path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
  },
  target: 'web', //target to web we can change to another kind
  output: {
    path: path.resolve(__dirname, 'src'), //Create something in memory y se lo pasa al navegador
    //publicPath: path.resolve(__dirname), // Simula los archivos
    publicPath:  '/', // Simula los archivos
    //filename: '[name].js' // Simula los archivos
    filename: '[name].js' // Simula los archivos
  },
  /*resolve: {
    alias: {
      jquery: "~jquery/"
    }
  }*/
  plugins: [ 
      new webpack.ProvidePlugin({
           $: 'jquery',
           jQuery: 'jquery',
           'window.$': 'jquery',
           'moment': 'moment'
       }), 
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),*/
   new ExtractTextPlugin("styles.css"//allChunks: true
   )],
   //catching error, hot reloading, linting
  module: { // file types wanna to handle
    loaders: [
      /*{
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },*/
      {
        test: /\.js$/, 
        loaders: ['babel-loader'], 
        exclude: /node_modules/
      },
      //{test: /\.css$/, loader: ExtractTextPlugin.extract("csss?sourceMap")}, //!autoprefixer-loader
      { 
        test: require.resolve("jquery"), 
        loader: "expose-loader?$!expose-loader?jQuery" },
      {
        test: /\.(css|scss|sass)$/,  // style-loader! inject it to style tag style-loader
        loader: ExtractTextPlugin.extract("css-loader?sourceMap?!sass-loader?sourceMap")
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      /*
      {
        test: require.resolve("jquery"),
        loader: "imports-loader?this=>window"
      },
      */
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
        loader: 'imports-loader?jQuery=jquery' 
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
     // {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?limit=10000&mimetype=application/font-woff" },
     // {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" },
    ]
  }
}
