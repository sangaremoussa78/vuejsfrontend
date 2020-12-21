
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'online shop dashboard',
    bodyAttrs: {
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'online shop dashboard' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: '/css/font-face.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/vendor/font-awesome-4.7/css/font-awesome.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/vendor/font-awesome-5/css/fontawesome-all.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/vendor/mdi-font/css/material-design-iconic-font.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/vendor/bootstrap-4.1/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/vendor/css-hamburgers/hamburgers.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/theme.css' }
    ],
    script: [
      {
        src: '/vendor/jquery-3.2.1.min.js',
        type: 'text/javascript'
      },
      {
        src: '/vendor/bootstrap-4.1/popper.min.js',
        type: 'text/javascript'
      },
      {
        src: '/vendor/bootstrap-4.1/bootstrap.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://js.pusher.com/7.0/pusher.min.js',
        type: 'text/javascript'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/pusher.js',
    '~/plugins/toastr.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // 'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: ''  // your lumen project base url
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {

  },
  srcDir: __dirname,
  buildDir: '.nuxt/admin',
  env: {
    PUSHER_APP_KEY: "" // set pusher app key
  }
}
