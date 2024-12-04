const { defineConfig } = require('@vue/cli-service')
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Your Peer Review Assistant', // Set your custom title here
    },
  },
  outputDir: 'dist'  // Change this if you need to modify the build output folder
}
