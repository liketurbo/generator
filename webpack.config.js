const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EmojiFaviconPlugin = require('emoji-favicon-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const DEV_ENV = 'DEV_ENV';
const PROD_ENV = 'PROD_ENV';

const commonConfig = env => ({
  entry: {
    app: path.join(__dirname, 'src')
  },
  output: {
    filename: '[contenthash].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader' }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generator',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      minify:
        env === PROD_ENV
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          : false
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'bootstrap',
          entry:
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        }
      ]
    }),
    new EmojiFaviconPlugin('📊')
  ]
});

const productionConfig = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};

module.exports = (_, { mode }) => {
  if (mode === 'development') {
    return commonConfig(DEV_ENV);
  }
  return merge(commonConfig(PROD_ENV), productionConfig);
};
