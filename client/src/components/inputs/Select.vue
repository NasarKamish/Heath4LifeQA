<template>
    <v-select
      class="select"
      v-model="fields.selected"
      :items="fields.answers"
      :label="fields.label"
      rounded
      outlined
      color="#770000"
      backgground="#F6E1E1"
      :multiple="fields.multiple"
      :value="fields.selected"
      @change="update()"
    ></v-select>
</template>
<script>
	export default {
		name: 'drop',
		props: ['fields', 'intersect'],
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
