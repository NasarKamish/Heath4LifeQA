<template>
  <div id="panel-container">
    <!-- <Navbar/> -->
    <!-- <v-app-bar app id="app-header">
      <v-spacer></v-spacer>
			<v-toolbar-title class="text-uppercase text-center white--text">
        <h3 color="white">M&E Admin Portal</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
		</v-app-bar> -->
    <v-card id="panel-card">
      <div v-if="admin" id="p_login">
        <div>
          <h1
            style="width: 100%; color: #770000; text-align: center; margin-bottom: 20px;"
          >
            M&E LOGIN
          </h1>
        </div>
        <div>
          <v-text-field
            id="text-field1"
            label="Email"
            solo
            dense
            rounded
            color="#770000"
            outlined
            prepend-inner-icon="mdi-email"
            :rules="emailRules"
            v-model="login.email"
            required
          ></v-text-field>
          <v-text-field
            id="text-field2"
            label="Password"
            solo
            rounded
            dense
            color="#770000"
            outlined
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="passwordRules"
            v-model="login.password"
            required
            @click:append="show = !show"
          ></v-text-field>
        </div>
        <div class="panel-btns">
          <!-- <a class="link" href="/forgot-pw">Forgot password?</a> -->
          <v-btn
            rounded
            style="background: #770000 ; color: #FFFFFF"
            class="go-btn"
            @click.prevent="handleLogin"
          >
            Log In
          </v-btn>
        </div>
      </div>
    </v-card>
    <v-row justify="center" style="position: absolute">
      <v-overlay :z-index="zIndex" :value="overlay">
        <v-progress-circular
          :size="75"
          color="#770000"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-row>
    <v-snackbar v-model="disruption">
      Something went wrong, check for invalid inputs.
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="disruption = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- <Footer/> -->
  </div>
</template>

<script>
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/Footer";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      overlay: false,
      admin: true,
      zIndex: 0,
      disruption: false,
      register: {
        fullname: "",
        email: "",
        password: "",
      },
      login: {},
      user_id: null,
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      show: false,
      show1: false,
      show2: false,
      passwordRules: [(v) => !!v || "This field is required"],
      confirmpassword: "",
      confirmpasswordRules: [
        () =>
          this.confirmpassword === this.login.password ||
          this.confirmpassword === this.register.password ||
          "Password must match",
      ],
    };
  },
  created() {},
  methods: {
    handleLogin() {
      this.overlay = true;
      let URL = "http://localhost:3000/api/user";
      this.login.email = this.login.email.toLowerCase();
      fetch(URL, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(this.login),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.token) {
            window.localStorage.removeItem("hct-token");
            window.localStorage.setItem("hct-token", json.token);
            this.$router.push("/entries");
          } else {
            this.overlay = false;
            this.$router.push("/forgot-pw");
            // this.disruption = true;
          }
        })
        .catch((err) => console.log("err: ", err));
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

#panel-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #770000;
  justify-content: center;
  align-items: center;
  text-align: center;
}
#panel-card {
  height: auto;
  position: absolute;
  text-align: center;
  padding: 40px;
  /* width: 500px; */
  /* height: 360px; */
  justify-content: center;
  align-self: center;
  background: #fff;
  box-shadow: 2px 4px 8px 3px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
.go-btn {
  padding: 0px 19px;
  background: #fff;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: #770000;
  width: 100px;
  height: 80px;
}
#text-field1 {
  margin: 30px;
  width: 486px;
  height: 100px;
  left: 487px;
  padding: 20px;
  /* top: 445px; */
  background: #770000;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
#text-field2 {
  margin: 30px;
  width: 486px;
  height: 100px;
  left: 487px;
  padding: 20px;
  /* top: 445px; */
  background: #770000;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.panel-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.link {
  margin-top: 50px;
  font-family: "Poppins";
  text-decoration: none;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  color: #770000;
}
.link:hover {
  color: #fff;
}

h1 {
  width: 502px;
  height: 51px;
  font-family: "Poor Story";
  font-style: normal;
  font-weight: normal;
  font-size: 41px;
  line-height: 51px;
}
</style>
