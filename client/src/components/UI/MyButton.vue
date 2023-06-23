<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
button {
  align-self: end;
  border: 1px solid coral;
  padding: 10px;
  background: aqua;
}
</style>