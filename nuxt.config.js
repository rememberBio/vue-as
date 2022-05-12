import dotenv from 'dotenv'

let path =
    process.env.NODE_ENV === 'production' ?
    '.env' :
    '.env.' + process.env.NODE_ENV

dotenv.config({ path })

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr:false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Remember',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/Vuelidate.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', 
    '@nuxtjs/auth-next', 
    ['@nuxtjs/recaptcha', {
        hideBadge: true,
        siteKey: '6Le3b5gfAAAAAGwcMbMTR52xBd3UCVw_ICS9t_ez',
        version: 3,
    }],
    ['@nuxtjs/firebase',
        {
          config: {
            apiKey: "AIzaSyB1NNNnAUH-cRCD2g6tB9OcoC9Jut6Z0I4",
            authDomain: "remember-342807.firebaseapp.com",
            projectId: "remember-342807",
            storageBucket: "remember-342807.appspot.com",
            messagingSenderId: "562807779101",
            appId: "1:562807779101:web:6df9df8236bbf9e1273bf4"
          },
          services: {
            auth: {
                persistence: 'local', // default
                initialize: {
                    // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
                    onAuthStateChangedAction: 'onAuthStateChangedAction',
                    subscribeManually: false
                },
                ssr: false, // default
                emulatorHost: 'http://localhost',
            }
          }
        }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 8080, // default: 3000
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost' // default: localhost
  },
  publicRuntimeConfig: {
    axios: {
        baseURL: "http://localhost:8080"
    }
  },
  router: {
    middleware: ['authentication']
  },
}
