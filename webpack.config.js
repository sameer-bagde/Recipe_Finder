import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',    // Injects styles into the DOM
          'css-loader',      // Translates CSS into CommonJS
          'postcss-loader',  // Processes CSS with PostCSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',  // Handles image files
            options: {
              outputPath: 'assets/images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  devtool: 'source-map',
};
