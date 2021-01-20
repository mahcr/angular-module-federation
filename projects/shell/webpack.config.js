const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../../tsconfig.json'),
    ['session-lib']
);

module.exports = {
  output: {
    uniqueName: "shell"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

        // For hosts (please adjust)
        remotes: {
          'admin': "admin@http://localhost:3000/remoteEntry.js"
        },

        shared: {
          "@angular/core": { singleton: true, strictVersion: true },
          "@angular/common": { singleton: true, strictVersion: true },
          "@angular/router": { singleton: true, strictVersion: true },
          "@angular/material/button": { singleton: true, strictVersion: true },
          "@angular/material/icon": { singleton: true, strictVersion: true },
          "@angular/material/toolbar": { singleton: true, strictVersion: true },
          "@angular/animations": { singleton: true, strictVersion: true },
          "@angular/cdk": { singleton: true, strictVersion: true },
          ...sharedMappings.getDescriptors()
        }

    }),
    sharedMappings.getPlugin(),
  ],
};
