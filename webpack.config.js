const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EmojiFaviconPlugin = require('emoji-favicon-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: env === DEV_ENV
            }
          }
        ]
      }
    ]
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
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, '**', '*.tsx'), {
        nodir: true
      }),
      whitelistPatterns: [
        /^btn/,
        /^alert/,
        /^col-/,
        /^offset-/,
        /^navbar/,
        /container/,
        /row/,
        /form-control/,
        /a/
      ]
    }),
    new EmojiFaviconPlugin('📊'),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css'
    })
  ]
});

const productionConfig = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      }),
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
