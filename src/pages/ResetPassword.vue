<template>
    <div id="panel-container">
        <!-- <Navbar/> -->
        <v-card id="panel-card">
            <div>
                <div>
                    <h1 style="width: 100%; color: #770000; text-align: center; margin-bottom: 20px;">
                        RESET YOUR PASSWORD
                    </h1>
                    <p>Please enter your new password</p>
                </div>
                <div>
                    <v-text-field
                        id="text-field2"
                        label="New Password"
                        solo
                        rounded
                        dense
                        color="#770000"
                        outlined
                        prepend-inner-icon="mdi-lock"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        :rules="passwordRules"
                        v-model="user.password"
                        required
                        @click:append="show = !show"
                    ></v-text-field>
                    <v-text-field
                        label="Password Check"
                        placeholder="Confirm Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        v-model="confirmPassword"
                        @formchange="passwordConfirmationRule"
                        :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                        rounded
                        outlined
                        dense
                        height="38"
                        prepend-inner-icon="mdi-onepassword"
                        color="grey"
                        @click:append="show1 = !show1"
                    >
                  </v-text-field>
                </div>
                <div  class="panel-btns">
                    <v-btn
                        rounded
                        style="background: #770000 ; color: #FFFFFF"
                        class="go-btn"
                        @click.prevent="handleReset"
					>
                       Reset 
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
        <v-snackbar v-model="updated">
        Password Updated
        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="updated = false">Close</v-btn>
        </template>
        </v-snackbar>
        <v-snackbar v-model="disruption">
            Something went wrong, check for invalid inputs.
            <template  v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="disruption = false">
                Close
                </v-btn>
            </template>
        </v-snackbar>
        <!-- <Footer/> -->
    </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: { Footer, Navbar },
    data(){
        return {
            show: false,
            show1: false,
            overlay: false,
            admin: true,
            zIndex: 0,
            disruption: false,
            user : {},
            updated: false,
            user_id : null,
            confirmPassword: null,
            passwordRules: [
				v => !!v || 'This field is required',
			],
            confirmPasswordRules : [
                v => !!v || 'This field is required',
            ]
        }
    },
    created() {
        if (this.$route.params.id) {
            window.localStorage.setItem("user_id", this.$route.params.id);
            this.user_id = window.localStorage.getItem("user_id");
            } else if (window.localStorage.getItem("user_id")) {
            this.user_id = window.localStorage.getItem("user_id");
            } else {
            this.user_id = null;
        }
    },
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.user.password === this.confirmPassword ||
                "Password must match";
        }
    },
    methods : {
        validate() {
        this.$refs.form.validate();
        },
        handleReset() {
            this.overlay = true;
            let URL = `https://health4life-api.herokuapp.com/api/user/reset-pw/${this.user_id}`;
                fetch(URL, {
                method:"PUT",   
                body:  JSON.stringify(this.user),
                mode: 'cors',
                headers: {
                "Content-type": "application/json"
                }
                })
                .then(response => response.json())
                    .then(json => {
                        if(json.msg) {
                            this.overlay = false;
                            this.updated = true;
                            this.$router.push("/panel");
                        }
                        else {
                            this.overlay = false;
                            this.disruption = true;
                        }
                    }
                    )
                    .catch(err => console.log('err: ',err))
        
        }
    }
}
</script>

<style scoped>
#panel-container {
    width: 100vw;
    height: 100vh;
    background: #770000;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
#panel-card {
    /* /* width: 800px; */
    height: auto;  
    position: absolute;
    text-align: center;
    padding: 40px;
    /* width: 650px; */
    /* height: 380px; */
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
#text-field1{
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
#text-field2{
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
    font-family: 'Poppins';
    text-decoration: none;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 22px;
    color: #770000;
}

h1 {
    width: 502px;
    height: 51px;
    font-family: 'Poor Story';
    font-style: normal;
    font-weight: normal;
    font-size: 41px;
    line-height: 51px
}
</style>