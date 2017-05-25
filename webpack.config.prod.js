import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  //debug: true, // Shows debug information
  devtool: 'source-map', // takes longer to generate because it is available to download when you want to inspect the code.
  //noInfo: false, //Webpack no muestra archivos a los que esta bundling
  entry: {
    vendor: path.resolve(__dirname, 'src/api/vendor'),
    main: path.resolve(__dirname, 'src/index') //poner middleware para hot reloading
  },
  target: 'web', //target to web we can change to another kind
  output: {
    path: path.resolve(__dirname, 'dist'), //Create something in memory y se lo pasa al navegador
    publicPath: '/', // Simula los archivos
    //filename: 'views/[name].[chunkhash].js' // Simula los archivos
    filename: '[name].[chunkhash].js' // Simula los archivos
  },
  plugins: [
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),*/
    new CopyWebpackPlugin([
            // Copy glob results, relative to context
            {
                //context: path.join(__dirname, 'src/views'),
                context: path.join(__dirname, 'src/'),
                from: '**/*',
                to: path.join(__dirname, 'dist/'),
                //to: path.join(__dirname, 'dist/views'),
            },
    ]),
   new HtmlWebpackPlugin({
      filename: 'views/cart.ejs',
      inject: 'head',
      template: 'src/views/cart.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'views/credit-card.ejs',
      inject: 'head',
      template: 'src/views/credit-card.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
     new HtmlWebpackPlugin({
      filename: 'views/sign-in.ejs',
      inject: 'head',
      template: 'src/views/sign-in.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'views/sign-up.ejs',
      inject: 'head',
      template: 'src/views/sign-up.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'views/faqs.ejs',
      inject: 'head',
      template: 'src/views/faqs.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/payform.ejs',
      inject: 'head',
      template: 'src/views/payform.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
      new HtmlWebpackPlugin({
      filename: 'views/game-detail.ejs',
      inject: 'head',
      template: 'src/views/game-detail.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'views/console-gallery.ejs',
      inject: 'head',
      template: 'src/views/console-gallery.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/account.ejs',
      inject: 'head',
      template: 'src/views/account.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/admin-form.ejs',
      inject: 'head',
      template: 'src/views/admin-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/admin.ejs',
      inject: 'head',
      template: 'src/views/admin.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/console-form.ejs',
      inject: 'head',
      template: 'src/views/console-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/consoles.ejs',
      inject: 'head',
      template: 'src/views/consoles.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/contact.ejs',
      inject: 'head',
      template: 'src/views/contact.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/game-form.ejs',
      inject: 'head',
      template: 'src/views/game-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/games.ejs',
      inject: 'head',
      template: 'src/views/games.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/invoice-form.ejs',
      inject: 'head',
      template: 'src/views/invoice-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/password-form.ejs',
      inject: 'head',
      template: 'src/views/password-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/user-form.ejs',
      inject: 'head',
      template: 'src/views/user-form.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
   new HtmlWebpackPlugin({
      filename: 'views/users.ejs',
      inject: 'head',
      template: 'src/views/users.ejs', // Load a custom template (ejs by default see the FAQ for details)
      trackJSToken: '78b6b1a30ec140d4974ecd6d93579ca3' //TrackJSTOKEN ON PRODUCTION ONLY
   }),
    new HtmlWebpackPlugin({
      filename: 'views/index.ejs',
      template: 'src/views/index.ejs',  // ejs-loader default loader
      compile: false,
      inject: 'head',
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
    //new webpack.optimize.DedupePlugin(), // Elimina Duplicados
    new webpack.optimize.UglifyJsPlugin(), // Minimiza el tamaño
    new ExtractTextPlugin('[name].[contenthash].css') //allChunks: true  // webpack v2 )], //catching error, hot reloading, linting
  ],
  module: { // file types wanna to handle
    loaders: [
      {
        test: /\.(html|ejs)$/,
        loader: 'html-loader',
        //loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader?', //+ JSON.stringify({attrs: ["img:src", "link:href"]}),
        options: {
          minimize: false,
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
         test: /\.(gif|png|jpe?g|svg)$/i,
         loaders: [
                'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack-loader'
                ],
       },*/
     /*{
        test: /\.ejs$/,
        //loader: 'ejs-loader' // default
        //loader: 'ejs-simple-loader' // si no se pone loader en la version 1 de webpack la pone sola
        //loader: 'ejs-compiled-loader'
        loader: 'ejs-render-loader?raw=true'
        //loader: 'ejs-html-loader'

      },*/
      { 
        test: require.resolve("jquery"), 
        loader: "expose-loader?$!expose-loader?jQuery" 
      },
      {
        test: /\.js$/, 
        loaders: ['babel-loader'], 
        exclude: /node_modules/},
     // {test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap")}, //!autoprefixer-loader
     // {test: /\.scss$/, loader: ExtractTextPlugin.extract("css?sourceMap?!sass?sourceMap")},
     {
        test: /\.(css|scss|sass)$/,  // style-loader! inject it to style tag style-loader
        loader: ExtractTextPlugin.extract("css-loader?sourceMap?!postcss-loader!sass-loader?sourceMap")
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, 
        loader: 'imports-loader?jQuery=jquery' 
      }
    ]
  }
}
