<template>
  <div id="landing_container">
    <Navbar :onLanding="onLanding" />
    <Start v-if="onLanding" :start="start" />
    <Slider id="stepper_container" v-else :onLanding="onLanding" />
    <Options v-if="!onLanding" />
    <Footer v-if="onLanding" />
  </div>
</template>

<script>
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";
import Options from "../components/options";
import Start from "../components/Start";
import Slider from "./Slider";

export default {
  components: {
    Navbar,
    Footer,
    Options,
    Start,
    Slider,
  },
  computed: {
    onLanding: {
      get() {
        return this.$store.state.onLanding;
      },
      set(value) {
        this.$store.commit("UPDATE_LANDING", value);
      },
    },
  },
  methods: {
    start() {
      localStorage.setItem("completed", false);
      this.onLanding = false;
    },
  },
};
</script>

<style>
#landing_container {
  height: 100vh;
  width: 100vw;
  background: #ffffff;
}
</style>
