module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  devServer: {
    proxy: 'https://buggie-backend.herokuapp.com/',
}
}