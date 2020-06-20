require("dotenv").config();

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "thisdot",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "this dot interview project",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#0366d6", height: "3px", continuous: true },
  /*
   ** Css files imported
   */
  css: ["~/assets/global/main.scss", "~/assets/global/grid/flexible-grid.scss"],
  /*
   ** Plugins Imported
   */
  plugins: [
    { src: "~/plugins/globalMixins" },
    { src: "~/plugins/axios-config" },
  ],
  /*
   ** Modules Imported
   */
  modules: [["@nuxtjs/axios"], ["@nuxtjs/apollo"], ["@nuxtjs/style-resources"]],
  /*
   ** Style variables Imported
   */
  styleResources: {
    scss: ["assets/global/mixins.scss", "assets/global/variables.scss"],
  },

  /*
   ** Environment variables Imported
   */
  env: {
    BASE_URL: process.env.BASE_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  // Give axios module options
  axios: {
    /* set baseURL environment variable to configure access to the API
     */
    baseURL: process.env.BASE_URL,
  },
  // Give apollo module options
  apollo: {
    defaultOptions: {
      $query: {
        loadingKey: "loading",
        fetchPolicy: "cache-and-network",
      },
    },
    clientConfigs: {
      default: "@/apollo/client-config.js",
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
