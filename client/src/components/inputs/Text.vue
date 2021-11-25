
<template>
	<v-text-field
		:prepend-inner-icon="prepends"
		size="sx"
		v-model="fields.text"
		:label="fields.label"
		:rules="rule"
		:type="type"
		:disabled="disabled"
		rounded
		outlined
		color="#770000"
		background="#F6E1E1"
		:value="fields.text"
		@input="update()"
	></v-text-field>
</template>

<script>
	export default {
		name: 'txt',
		props:  ['fields', 'rule', 'type', 'disabled', 'intersect', 'prepends'],
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

<style>
.v-input__icon.v-input__icon--prepend-inner {
	margin-right: 15px;
	/* padding:  0 5px; */
}
</style>
