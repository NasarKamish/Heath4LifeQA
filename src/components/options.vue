<template>
  <v-card id="create">
    <v-speed-dial v-model="fab" absolute bottom right hover>
      <template v-slot:activator>
        <v-btn v-model="fab" fab dark color="#770000" id="save-btn">
          <v-icon class="fab-btn" v-if="fab" id="close-btn">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-eraser
          </v-icon>
        </v-btn>
      </template>
      <v-btn class="fab-btn" @click="clearOneSlide" fab dark small color="gray">
        <v-icon small>mdi-backspace </v-icon>
        <span class="fab-tooltip">Clear this page</span>
      </v-btn>
      <v-btn
        class="fab-btn"
        @click="clearAllSlides"
        fab
        dark
        small
        color="#CD5C5C"
      >
        <v-icon>mdi-delete </v-icon>
        <span class="fab-tooltip">Clear all pages</span>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>
<script>
import Slider from "../layouts/Slider.vue";
import Controller from "./navigation/Controller.vue";

export default {
  data: () => ({
    direction: "bottom-right",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
  }),
  methods: {
    clearOneSlide() {
      let slides = [
        "slide01",
        "slide02",
        "slide03",
        "slide04",
        "slide05",
        "slide06",
        "slide07",
        "slide08",
        "slide09",
        "slide10",
        "slide11",
        "slide12",
        "slide13",
        "slide14",
        "slide15",
        "slide16",
        "slide17",
      ];

      let slide = slides[this.$store.state.page - 1];

      this.$store.state[slide].questions.forEach((question) => {
        if (question.selected) {
          question.selected = null;
        } else if (question.text) {
          question.text = null;
        } else if (question.date) {
          question.date = null;
        }
      });

      Slider.methods.handleCollectAnswers;
    },
    clearAllSlides() {
      if (confirm("Are you sure you want to delete all your progress?"))
        Controller.methods.exitSurvey();
    },
  },

  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    },
  },

  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
  bottom: 14vh;
  right: 7vh;
}
#create .v-btn--floating {
  position: relative;
}

.fab-btn .fab-tooltip {
  visibility: hidden;
  width: 150px;
  /* background-color: #770000; */
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 0px;
  right: 115%;
  transition: all 0.3s linear;
}

.fab-btn .fab-tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent;
  transition: all 0.3s linear;
}

.fab-btn:hover .fab-tooltip::after {
  border-style: solid;
  border-color: transparent transparent transparent #770000;
}
.fab-btn:hover .fab-tooltip {
  background-color: #770000;
  visibility: visible;
}
</style>
