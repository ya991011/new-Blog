//vue.config.js

module.exports = {
  devServer: {
    proxy: {
      "/socket.io": {
        target: "http://127.0.0.1:3000/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
