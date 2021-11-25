<template>
	<div>
		<v-radio-group v-model="fields.selected" :key="fields.selected" row>
			<v-radio
				color="#770000"
				v-for="(answer, idx) in fields.answers"
				:key="idx"
				 @change="update()"
				:label="answer"
				:readonly="readonly"
				:value="answer"
			></v-radio>
		</v-radio-group>
	</div>
</template>

<script>
export default {
	name: "radio",
	props: ["fields", "intersect", "readonly"],
	methods: {
		update() {
			this.$emit('input', this.fields.selected);
			if (this.intersect){
				// Updates parent is (unknown child components changes)
				this.intersect();
			}
		}
	}
}
</script>

