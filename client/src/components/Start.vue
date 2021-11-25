<template>
	<div class="center">
		<v-card @click="start" class="card mx-auto my-8" dark>
			<div>
				<v-icon color="#770000" class="icon">mdi-clipboard-file</v-icon>
			</div>
			<div center v-if="!draft" class="headline">
				New Client Record
				<div>
					<v-btn v-if="(isHidden = true)" color="#770000" class="start-btn"
						>Begin</v-btn
					>
					<v-btn v-else color="#770000" class="continue-btn">Continue</v-btn>
				</div>
			</div>
			<div center v-if="draft" class="headline">
				Continue where left off
				<div>
					<v-btn v-if="(isHidden = true)" color="#770000" class="start-btn"
						>Resume</v-btn
					>
					<v-btn v-else color="#770000" class="continue-btn">Continue</v-btn>
				</div>
			</div>
		</v-card>
	</div>
</template>
<script>
	export default {
		props: ["start"],
		data: () => ({
			isHidden: false,
			draft: false,
		}),
		// method: {
		// 	toggleBtn() {
		// 		this.isHidden = true;
		// 	},
		// },
		created() {
			if(window.localStorage.getItem('draft')){
				this.draft = true;
			} else {
				this.draft = false;
			}
		},
	};
</script>

<style scoped>
	.card {
		width: 534px;
		height: 188px;
		top: 87px;
		padding: 20px;
		background: #ffffff;
		color: #770000;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 4px 8px 3px rgba(0, 0, 0, 0.25);
		border-radius: 15px;
	}
	.headline {
		/* left: 802px;
  top: 128px; */
		font-family: "Poor Story";
		font-style: normal;
		font-weight: normal;
		font-size: 50px;
		line-height: 52px;
		/* text-align: center; */
	}
	.start-btn {
		padding: 4px 19px;
		width: 120px;
		/* height: 27px;
  left: 591px;
  top: 287px; */
		font-style: normal;
		font-weight: normal;
		font-size: 22px;
		background: #770000;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 27px;
	}
	.continue-btn {
		padding: 4px 19px;
		width: 160px;
		/* height: 27px;
  left: 591px;
  top: 287px; */
		font-style: normal;
		font-weight: normal;
		font-size: 22px;
		background: #770000;
		box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 27px;
	}
	.icon {
		font-size: 80px;
		width: 100px;
		line-height: 50px;
	}
</style>
