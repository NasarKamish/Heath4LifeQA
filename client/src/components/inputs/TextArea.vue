<template>
	<v-container fluid>
		<v-col sm="12">
			<v-textarea 
				:label="fields.label"
				v-model="fields.text"
				:rules="rule"
				rounded
				outlined
				color="#770000"
				:value="fields.text"
				rows="2"
				@input="update()"
			></v-textarea>
		</v-col>
	</v-container>
</template>

<script>
	export default {
		name: 'text-area',
		props:  [
			'fields', 'label', 'rule', 'intersect'
		],
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