<template>
  <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid coral;
  width: 100%;
  margin-top: 5px;
}
</style>