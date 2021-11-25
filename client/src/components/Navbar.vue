<template>
  <div id="nav">
    <v-app-bar app id="app-header">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-uppercase text-center white--text">
        <!-- <span>HCT </span> -->
        <h3 color="white">Health4Life</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="white" @click="logout()">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon style="margin-right: -35px" v-bind="attrs" v-on="on" right
              >mdi-logout</v-icon
            >
          </template>
          <span color="white">Logout</span>
        </v-tooltip>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      id="drawer"
      temporary
      color="white"
      width="300"
      left
    >
      <v-list dense nav>
        <v-list-item-group v-model="selected">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            router
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Admin-Dashboard",
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "Admin options",
          icon: "mdi-folder-account",
          route: "/dashboard",
        },
        {
          title: "Survey Entries",
          icon: "mdi-database-settings",
          route: "/entries",
        },
      ],
      right: null,
      selected: null,
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("hct-token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#nav {
  position: absolute;
  width: 100vw;
  height: 100vh;
  font-family: "Open Sans";
  font-size: 1.2rem;
}
#app-header {
  height: 64px;
  left: 0px;
  top: 0px;
  background: #770000;
  color: white;
}
#drawer {
  background: #770000;
  color: white;
}
.cursor:hover {
  cursor: pointer;
  color: rgb(255, 195, 195);
}
</style>