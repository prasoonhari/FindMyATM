/**
 * Created by prasoon on 11/13/16.
 */
var webpack = require( 'webpack' );
var path = require( 'path' );
var fs = require( 'fs' );
var nodeModules = {};
fs.readdirSync( path.resolve( __dirname, '../node_modules' ) )
  .filter( x => ['.bin'].indexOf( x ) === -1 )
  .forEach( mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  } );

module.exports = {
  entry: path.resolve( __dirname, '../server/main' ),
  output: {
    path: path.resolve( __dirname, '../build' ),
    filename: './server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin( {
      'process.env.BROWSER': false,
    } ),
  ],
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: false,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'es2015',
            'stage-0',
            'node5',
          ],
          plugins: [
            'transform-runtime',
            'transform-react-jsx-source',
            'transform-decorators-legacy',
            'add-module-exports',
          ],
        },
      }]
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool  : '#inline-source-map',
}