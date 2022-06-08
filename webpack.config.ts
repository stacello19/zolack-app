import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
    name: 'typescript-template',
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'hidden-source-map' : 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@typings': path.resolve(__dirname, 'src/typings'),
            '@styles': path.resolve(__dirname, 'src/styles')
        }
    },
    entry: {
        app: './index'
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
              test: /\.css?$/,
              use: ['style-loader', 'css-loader'],
          },
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
          async: false,
          // eslint: {
          //   files: "./src/**/*",
          // },
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    devServer: {
        historyApiFallback: true, // react router
        port: 3050, // frontend port
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        proxy: {
            '/api/': {
            target: 'http://localhost:5050',
            pathRewrite: { '^/api': '' },
            },
        },
    },
}

if (isDevelopment && config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
  }
  if (!isDevelopment && config.plugins) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  }

export default config;