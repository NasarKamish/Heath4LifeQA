<template>
	<div id="panel-container">
			<!-- <Navbar/> -->
				<v-card id="panel-card">
						<div>
								<div>
										<h1 style="width: 100%; color: #770000; text-align: center; margin-bottom: 20px;">
												FORGOT YOUR PASSWORD ?
										</h1>
										<p>Provide your email address to reset your password</p>
								</div>
								<div>
										<v-text-field
												id="text-field1"
												label="Email"
												solo
												rounded
												dense
												color="#770000"
												outlined
												prepend-inner-icon="mdi-email"
												:rules="emailRules"
												v-model="reset.email"
												required
										></v-text-field>
								</div>
								<div  class="panel-btns">
										<v-btn
												rounded
												style="background: #FFFFFF ; color: #770000 "
												class="go-btn"
												@click.prevent="goBack"
										>
											 Back
										</v-btn>
										<v-btn
												rounded
												style="background: #770000 ; color: #FFFFFF"
												class="go-btn"
												@click.prevent="handleSubmit"
										>
											 Proceed
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
				<v-snackbar v-if="!disruption">
						{{ message }}
						<template  v-slot:action="{ attrs }">
								<v-btn text v-bind="attrs" @click="disruption = false">
								Close
								</v-btn>
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
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/Footer'

export default {
		components : {
						Navbar, Footer
		},
		data() {
				return {
						overlay: false,
						admin: true,
						zIndex: 0,
						disruption: false,
						reset : {},
						message: '',
						// user_id : null,
						nameRules:[
										v => !!v || 'Name is required',
								],
						emailRules: [
										v => !!v || 'E-mail is required',
										v => /.+@.+/.test(v) || 'E-mail must be valid',
								],
				}
		},
		//
		created() {

		},
		methods: {
				validate() {
						this.$refs.form.validate();
						},
				goBack(){
						this.$router.push('/panel');
				},
				handleSubmit () {
						if(this.user_id !== null) {
								this.overlay = true;
								let URL = `https://health4life-api.herokuapp.com/api/user/forgot-pw/`;
								this.reset.email = this.reset.email.toLowerCase();
								let token = window.localStorage.getItem("hct-token");
								fetch(URL, {
												method: "POST",
												body: JSON.stringify(this.reset),
												mode: "cors",
												headers: {
														"Content-type": "application/json",
														"h4l-token": token                    },
								})
								.then(response => response.json())
										.then(json => {
												if(json.token) {
														this.message = json.message;
														this.disruption = false
														this.$router.push('/panel');
												} else {
														this.overlay = false;
														this.disruption = true;
														this.$router.push('/');
												}
										})
										.catch((err) => console.log("err: ", err));
						}
				}
		}
}
</script>

<style scoped>
#panel-container {
		background: #770000;
		width: 100vw;
		height: 100vh;
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