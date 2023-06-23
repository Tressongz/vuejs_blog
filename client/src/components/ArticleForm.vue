<template>
  <form @submit.prevent>
    <h3>Добавить статью</h3>
    <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />
    <my-button @click="create" class="btn">Добавить статью</my-button>
  </form>
</template>

<script>
// import MyButton from "@/components/UI/MyButton";
export default {
  // components: {
  //   MyButton,
  // },
  data () {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    create() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body:  '',
      }
    }
  }
}
</script>

<style scoped>
form {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>