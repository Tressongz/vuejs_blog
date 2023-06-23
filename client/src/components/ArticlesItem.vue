<template>
  <div class="post">
    <div>
      <div class="post-id"><strong>ID: </strong>{{ post.id }}</div>
      <div class="post-name"><strong>Название: </strong>{{ post.title }}</div>
      <div class="post-body"><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button
        @click="$router.push(`/articles/${post.id}`)"
      >
        Открыть
      </my-button>
      <my-button
          @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    post: {
      type: Object,
      require: true,
    }
  }
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
  background: coral;
  border: 2px solid darkorchid;
}
.post-name {
  font-weight: 600;
}
.post-body {
  font-style: italic;
}
.post__btns {
  display: flex;
}
</style>