<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >{{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  name: 'my-select',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}

</script>

<style scoped>
select {
  padding: 5px;
}
</style>