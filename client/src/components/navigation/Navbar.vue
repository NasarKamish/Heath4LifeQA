<template>
    <nav id="nav">
      <v-app-bar
        app
        dark
        id="app-header"
      >
      <!-- <v-app-bar-nav-icon v-if="onLanding" x-large @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-spacer></v-spacer>
        <!-- Text-->
      <h2 v-if="onLanding" class="text-center mobile-header pleft">
        Health4Life
      </h2>
      <h2 v-else class="text-center mobile-header">
        HCT Client Record ({{ progress.toFixed(0) }}%)
      </h2>
      <v-row
        align="center"
        justify="space-around"
      >
      </v-row>
      <v-menu v-if="onLanding" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon 
            v-bind="attrs"
            v-on="on"
          >
            mdi-account-cog
          </v-icon>
        </template>
       <v-list>
        <!-- <v-list-item>
            <v-btn text color="grey" @click.prevent="logout">
                <span>Logout</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-list-item> -->
        <v-list-item>
            <v-btn text color="grey" @click.prevent="login">
                <span>Login as admin</span>
                <v-icon right>mdi-login</v-icon>
            </v-btn>
        </v-list-item>
       </v-list>
      </v-menu>
    </v-app-bar>
    <!-- <v-navigation-drawer
      v-if="onLanding"
      v-model="drawer" 
      absolute
      width="300"
      left
      id="drawer"
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          class="black--text text--accent-4"
        >
        <v-list-item class="white">
              <v-list-item-title @click="goSurvey" ><h3>New Form</h3></v-list-item-title>
              <v-icon>mdi-folder-plus</v-icon>
            </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
  </nav>
</template>

<script>
export default {
    props: ['onLanding'],
    data() {
        return {
            drawer: false,
            viewEntries: false,
            group: null,
        }
    },
    computed: {
      progress() {
        return this.$store.state.progress
      }
    },
    methods:{
    goDashboard(){
      this.$router.push('/entries');
    },
    goSurvey(){
      this.$router.push('/');
    },
    login() {
      localStorage.removeItem("hct-token");
      this.$router.push("/panel");
    }
  }
}
</script>

<style scoped>
#nav {
  position: absolute;
  width: 100vw;
  /* height: 100vh; */
  font-family: 'Open Sans';
  font-size: 1.2rem;
}
#app-header {
  height: 64px;
  left: 0px;
  top: 0px;
  background: #770000;
}
#drawer {
  background: #770000;
  color: white;
}
.pleft {
    margin-left: -20px;
}
@media (max-height: 480px) {
  #mobile-header {
    font-size: 16px;
  }
}

.cursor:hover {
    cursor: pointer;
    color: rgb(255, 195, 195);
}
</style>