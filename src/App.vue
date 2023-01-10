<template>
  <div id="app">
    <AppHeader level="1">Example Migration App</AppHeader>

    <!-- native and v-model -->
    <div>
      <h2>v-on.native modifier removed and v-model changes</h2>
      <AppInput v-model="msg" @click="handleAppInputClicked" />
      <hr />
    </div>

    <!-- key and transition class -->
    <div>
      <h2>Key Usage and Transition Class Change</h2>
      <label> <input type="checkbox" v-model="showMsg" /> Show Message </label>

      <transition>
        <div v-if="showMsg" key="yes">{{ caps(msg) }}</div>
        <div v-else key="no">Message Hidden</div>
      </transition>
      <hr />
    </div>

    <!-- v-bind merge -->
    <div>
      <h2>
        v-bind Merge Behavior <span v-bind="{ id: 'blue' }" id="red"></span>
      </h2>
      <hr />
    </div>

    <!-- directives -->
    <div v-click-outside="() => (showMenu = false)">
      <h2>Custom Directives changes</h2>
      <button @click="showMenu = !showMenu">
        {{ showMenu ? "Hide" : "Show" }} Menu
      </button>
      <ul v-show="showMenu">
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppInput from "./components/AppInput.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppInput,
  },
  data() {
    return {
      msg: "Hello World",
      showMsg: true,
      showMenu: false,
    };
  },
  directives: {
    clickOutside: {
      beforeMount(el, binding) {
        el.__ClickOutsideHandler__ = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener("click", el.__ClickOutsideHandler__);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.__ClickOutsideHandler__);
      },
    },
  },
  methods: {
    caps(value) {
      return value.toUpperCase();
    },
    handleAppInputClicked() {
      console.log("app input clicked");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 40px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
#red,
#blue {
  height: 10px;
  width: 10px;
  background: blue;
  display: inline-block;
}

#red {
  background: red;
}
</style>
