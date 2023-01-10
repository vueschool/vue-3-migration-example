<template>
  <div id="app">
    <AppHeader level="1">Example Migration App</AppHeader>

    <!-- Section 1 -->
    <section>
      <h2>1. v-on.native modifier removed and v-model changes</h2>
      <AppInput v-model="msg" @click.native="handleAppInputClicked" />
      <hr />
    </section>

    <!-- Section 2 -->
    <section>
      <h2>2. Key Usage and Transition Class Change</h2>
      <label> <input type="checkbox" v-model="showMsg" /> Show Message </label>

      <transition>
        <div v-if="showMsg" key="yes">{{ msg | caps }}</div>
        <div v-else key="no">Message Hidden</div>
      </transition>
      <hr />
    </section>

    <!-- Section 3 -->
    <section>
      <h2>
        3. v-bind Merge Behavior <span id="red" v-bind="{ id: 'blue' }"></span>
      </h2>
      <hr />
    </section>

    <!-- Section 4 -->
    <section v-click-outside="() => (showMenu = false)">
      <h2>4. Custom Directives changes</h2>
      <button @click="showMenu = !showMenu">
        {{ showMenu ? "Hide" : "Show" }} Menu
      </button>
      <ul v-show="showMenu">
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
      <hr />
    </section>

    <!-- Section 5 -->
    <section>
      <h2>5. Reactivity caveats and watch deep</h2>
      <ul>
        <li v-for="(item, i) in food" :key="item">
          <span style="width: 100px; display: inline-block">{{ item }}</span>

          <span @click="$delete(food, i)">❌</span>
        </li>
      </ul>
    </section>
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
      food: ["Hamburger", "Hotdog", "Spaghetti", "Taco"],
    };
  },
  directives: {
    clickOutside: {
      bind(el, binding) {
        el.__ClickOutsideHandler__ = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener("click", el.__ClickOutsideHandler__);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.__ClickOutsideHandler__);
      },
    },
  },
  filters: {
    caps(value) {
      return value.toUpperCase();
    },
  },

  methods: {
    handleAppInputClicked() {
      console.log("app input clicked");
    },
  },
  watch: {
    food() {
      alert("Hey stop eating my food!");
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
  transition: opacity 0.5s ease;
}

.v-enter,
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
