'use strict';

process.env.TEST = true;

module.exports = (config) => {
  const coverage = config.singleRun ? ['coverage'] : [];

  config.set({
    frameworks: [
      'jasmine',
    ],

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-remap-coverage',
      'karma-spec-reporter',
      'karma-chrome-launcher'
    ],

    files: [
      './src/tests.entry.js',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true,
      },
    ],

    preprocessors: {
      './src/tests.entry.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      entry: './src/tests.entry.js',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.webpack.js', '.web.js', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ].concat(config.singleRun ? [{
          enforce: 'post',
          test: /^(.(?!\.(spec|entry)))*\.js/,
          loader: 'istanbul-instrumenter-loader',
        }] : []),
      },
      stats: { colors: true, reasons: true },
    },

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    reporters: ['spec']
      .concat(coverage)
      .concat(coverage.length > 0 ? ['remap-coverage'] : []),

    // only output json report to be remapped by remap-istanbul
    coverageReporter: {
      type: 'in-memory',
      check: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
        },
        each: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },

    remapCoverageReporter: {
      html: './coverage',
      json: './coverage/coverage.json',
    },

    port: 9999,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'], // Alternatively: 'PhantomJS'
    captureTimeout: 6000,
  });
};
