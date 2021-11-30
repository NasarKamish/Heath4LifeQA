<template>
	<div>
		<h4>*File should be smaller than 2mb*</h4>
		<video
			v-show="!imageCaptured"
			ref="video"
			class="camera-frame"
			width="100%"
			autoplay
		/>
		<canvas
			v-show="imageCaptured"
			ref="canvas"
			class="camera-frame camera-frame-2"
		/>
		<div class="photo-button-container">
			<v-btn
				fab
				v-if="hasCameraSupport && imageCaptured"
				class="capture-btn"
				color="primary"
				@click="retakeImage"
			>
				<v-icon xs dark>mdi-camera-retake</v-icon>
			</v-btn>
			<v-btn
				fab
				v-if="hasCameraSupport && !imageCaptured"
				class="capture-btn"
				color="primary"
				@click="captureImage"
			>
				<v-icon xs dark>mdi-camera-plus</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
	export default {
		name: "camera",
		data() {
			return {
				mediaStream: null,
				videoDevices: [],
				imageCaptured: false,
				imageUpload: [],
				hasCameraSupport: true,
			};
		},
		computed: {
			signed() {
				return this.$store.state.signed;
			},
			photo: {
				get() {
					return this.$store.state.photo;
				},
				set(value) {
					this.$store.commit("UPDATE_PHOTO", value);
				},
			},
		},
		methods: {
			initCamera() {
				navigator.mediaDevices
					.getUserMedia({
						video: { facingMode: { exact: "environment" } },
					})
					.then((stream) => {
						this.$refs.video.srcObject = stream;
					})
					.catch((err) => {
						this.hasCameraSupport = false;
						console.log("errors :", err);
					});
			},
			disableCamera() {
				this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
					track.stop();
				});
			},
			captureImage() {
				let video = this.$refs.video;
				let canvas = this.$refs.canvas;
				canvas.width = video.getBoundingClientRect().width;
				canvas.height = video.getBoundingClientRect().height;
				let context = canvas.getContext("2d");
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
				this.imageCaptured = true;
				this.photo = canvas.toDataURL("image/jpeg", 0.33);
				this.disableCamera();
			},
			retakeImage() {
				this.imageCaptured = false;
				this.initCamera();
			},
			dataURLtoBlog(dataURL) {
				// convert base64 to raw binary data held in a string
				// doesn't hundle URLEncoded DataURLs
				var byteString = atob(dataURL.split(",")[1]);
				// separate out the mime component
				var mimeString = dataURL
					.split(",")[0]
					.split(":")[1]
					.split(";")[0];

				// write the bytes of the string to an ArrayBuffer
				var ab = new ArrayBuffer(byteString.length);
				// create a view into the buffer
				var ia = new Uint8Array(ab);
				// set the bytes of the buffer to the correct values
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				// write the ArrayBuffer to a blob
				var blob = new Blob([ab], { type: mimeString });
				return blob;
			},
		},
		mounted() {
			this.initCamera();
		},
		beforeDestroy() {
			if (this.hasCameraSupport) {
				this.disableCamera();
			}
		},
	};
</script>

<style scoped>
	h4 {
		color: red;
	}
	.camera-frame {
		border: 2px solid black;
		border-radius: 10px;
		height: 450px;
	}
	.camera-frame-2 {
		width: 100%;
		padding: 0 14.5%;
	}
	.photo-button {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.photo-button-container {
		width: 100%;
		height: 10px;
		display: flex;
		justify-content: center;
	}
	.capture-btn {
		color: #fff;
	}
</style>
