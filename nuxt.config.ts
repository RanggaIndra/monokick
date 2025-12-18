// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "app/",

  modules: ["nuxt-vuefire", "@pinia/nuxt", "shadcn-nuxt", "@nuxtjs/color-mode"],

  // runtimeConfig: {
  //   public: {
  //     FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  //     FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  //     FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  //     FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  //     FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //     FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  //   },
  // },

  colorMode: {
    classSuffix: "",
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: false,
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
});
