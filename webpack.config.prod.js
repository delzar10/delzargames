import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default {
  debug: true, // Shows debug information
  devtool: 'source-map', // takes longer to generate because it is available to download when you want to inspect the code.
  noInfo: false, //Webpack no muestra archivos a los que esta bundling
  entry: {
    vendor: path.resolve(__dirname, 'src/api/vendor'),
    main: path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
  },
  target: 'web', //target to web we can change to another kind
  output: {
    path: path.resolve(__dirname, 'dist'), //Create something in memory y se lo pasa al navegador
    publicPath: '/', // Simula los archivos
    filename: '[name].[chunkhash].js' // Simula los archivos
  },
  plugins: [ 
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      filename: 'footer-cards.html', template: 'src/footer-cards.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'header.html', template: 'src/header.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'footer.html', template: 'src/footer.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'card.html', template: 'src/card.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'faqs.html', template: 'src/faqs.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),

    new HtmlWebpackPlugin({
      filename: 'game-detail.html', template: 'src/game-detail.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'game-gallery.html', template: 'src/game-gallery.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'game-preview.html', template: 'src/game-preview.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'navbar.html', template: 'src/navbar.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'payform.html', template: 'src/payform.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'sign-in.html', template: 'src/sign-in.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      filename: 'sign-up.html', template: 'src/sign-up.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),*/
   new HtmlWebpackPlugin({
      filename: 'cart.ejs', 
      template: 'src/cart.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'credit-card.ejs', 
      template: 'src/credit-card.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
     new HtmlWebpackPlugin({
      filename: 'sign-in.ejs', 
      template: 'src/sign-in.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'sign-up.ejs', 
      template: 'src/sign-up.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'faqs.ejs', 
      template: 'src/faqs.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'payform.ejs', 
      template: 'src/payform.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
      new HtmlWebpackPlugin({
      filename: 'game-detail.ejs', 
      template: 'src/game-detail.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'console-gallery.ejs', 
      template: 'src/console-gallery.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: 'src/index.ejs',  // ejs-loader default loader
      compile: true,
      inject: true,
      cache: true,
      title: 'Webpack App',
      xhtml: false,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
      /*minify: {
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
      }*/
    }),
    new WebpackMd5Hash(), // Cache Busting solo descarga cuando haya cambios
    new webpack.optimize.DedupePlugin(), // Elimina Duplicados
    new webpack.optimize.UglifyJsPlugin(), // Minimiza el tamaño
    new ExtractTextPlugin('[name].[contenthash].css') //allChunks: true  // webpack v2 )], //catching error, hot reloading, linting
  ],
  module: { // file types wanna to handle
    loaders: [
      {
        test: /\.(html|ejs)$/,
        loader: 'html-loader',
        options: {
          minimize: true,
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
      },
     /*{
        test: /\.ejs$/,
        //loader: 'ejs-loader' // default
        //loader: 'ejs-simple-loader' // si no se pone loader en la version 1 de webpack la pone sola
        //loader: 'ejs-compiled-loader'
        loader: 'ejs-render-loader?raw=true'
        //loader: 'ejs-html-loader'
        
      },*/
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
     // {test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap")}, //!autoprefixer-loader
     // {test: /\.scss$/, loader: ExtractTextPlugin.extract("css?sourceMap?!sass?sourceMap")},
     {
        test: /\.(css|scss|sass)$/,  // style-loader! inject it to style tag style-loader
        loader: ExtractTextPlugin.extract("css-loader?sourceMap?!sass-loader?sourceMap")
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
      {test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
    ]
  }
}
