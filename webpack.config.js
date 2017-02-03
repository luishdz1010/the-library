const
  argv = require('yargs').argv,
  get = require('lodash/get'),
  path = require('path'),
  webpackMerge = require('webpack-merge'),
  UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  NgAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

// Build switches
const
  prod = !!get(argv, 'env.prod'),
  maps = !!get(argv, 'env.maps'),
  devServer = !!get(argv, 'env.devServer');

// Paths
const
  distPath = './dist',
  frontPath = './src';

// Base webpack config
let config = {
  devtool: maps ? (prod ? 'source-map' : 'eval') : undefined,

  entry: [
    path.resolve(frontPath, 'index.js')
  ],

  output: {
    path: distPath,
    filename: prod ? '[name].[chunkhash].js' : '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['babel-preset-es2015', {modules: false}],
            'babel-preset-es2016',
            'babel-preset-es2017'
          ]
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 2,
              sourceMap: maps
            }
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: maps
            }
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: maps
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1,
              sourceMap: maps
            }
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: maps
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|svg)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[hash:6].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    // Compatibility with webpack 1.x.x plugins
    new LoaderOptionsPlugin({
      minimize: prod,
      debug: !prod
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(frontPath, 'index.html')
    }),

    new NgAnnotatePlugin({add: true}),

    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(prod ? 'production' : 'development')
      }
    }),
  ]
};

// Production config
if (prod) {
  let extractCss = new ExtractTextPlugin({filename: '[name].[chunkhash].css'}),
    cssRules = [config.module.rules[1], config.module.rules[2]];

  cssRules.forEach((rules) => {
    rules.use = extractCss.extract({
      fallbackLoader: 'style-loader',
      // Take out 'style-loader' from the loader array
      loader: rules.use.slice(1),
      allChunks: true
    });
  });

  config = webpackMerge(config, {
    plugins: [
      extractCss,

      new UglifyJsPlugin({
        sourceMap: maps,
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ]
  });

}

// Dev server config
if (devServer) {
  // Adds the webpack-dev-server entry point for enhanced dev experience
  config = webpackMerge(config, {
    entry: [
      'webpack-dev-server/client',
    ],
    output: {
      publicPath: '/'
    }
  });
}

module.exports = config;
