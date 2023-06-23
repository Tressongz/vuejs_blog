<template>
  <div v-if="posts.length > 0">
    <h2>Список статей</h2>
    <transition-group name="articles_list">
      <articles-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove = "$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h3 v-else style="color:slateblue">Список статей пуст</h3>
</template>

<script>
import ArticlesItem from "@/components/ArticlesItem";
export default {
  components: {
    ArticlesItem,
  },
  props: {
    posts: {
      type: Array,
      require: true,
    }
  }
}
</script>

<style scoped>
.articles_list-item {
  display: inline-block;
  margin-right: 10px;
}
.articles_list-enter-active,
.articles_list-leave-active {
  transition: all .5s ease;
}
.articles_list-enter-from,
.articles_list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.articles_list-move {
  transition: transform 0.8s ease;
}
</style>