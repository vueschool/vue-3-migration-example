import { createApp, configureCompat } from "vue";
import App from "./App.vue";

configureCompat({
  MODE: 3,
});

createApp(App).mount("#app");
