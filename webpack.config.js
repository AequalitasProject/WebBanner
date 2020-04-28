const path = require('path');
// const MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

const configCommon = {
  devtool: isDevelopment && 'source-map',
  devServer: {
    port: 3000,
    open: true,
    contentBase: [path.join(__dirname, 'demo'), path.join(__dirname, 'dist')],
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/, //using regex to tell babel exactly what files to transcompile
        exclude: /node_modules/, // files to be ignored
        use: {
          loader: 'babel-loader', // specify the loader
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   sourceMap: isDevelopment,
            //   minimize: !isDevelopment,
            // },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     autoprefixer: {
          //       browsers: ['last 2 versions'],
          //     },
          //     sourceMap: isDevelopment,
          //     plugins: () => [autoprefixer],
          //   },
          // },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'dist/',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};

const configGeneralPage = Object.assign({}, configCommon, {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'banner.js',
  },
  plugins: [],
});

const configWidget = Object.assign({}, configCommon, {
  entry: './src/js/in_widget.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'widget.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'widget.css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join('src', 'templates', 'widget.handlebars'),
      filename: 'widget.html',
    }),
  ],
});

module.exports = [configGeneralPage, configWidget];
