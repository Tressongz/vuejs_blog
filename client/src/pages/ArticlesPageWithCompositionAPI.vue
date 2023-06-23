<template>
  <div class="body">
    <div class="app__btns">
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-input
        v-focus
        placeholder="Поиск..."
        v-model="searchQuery"
    />
    <articles-list
        v-if="!isArticlesLoading"
        :posts="sortedAndSearchedPosts"
    />
    <h3 v-else>Идёт загрузка..</h3>
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList";
import ArticleForm from "@/components/ArticleForm";
import {usePosts} from "@/components/hooks/usePosts";
import {useSortedPosts} from "@/components/hooks/useSortedPosts";
import {useSortedAndSearchedPosts} from "@/components/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    ArticlesList,
    ArticleForm
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },
  setup(props) {
    const {posts, isArticlesLoading, totalPage} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      isArticlesLoading,
      totalPage,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  }
}
</script>

<style scoped>
.body {
  padding: 20px;
}
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.observer {
  height: 40px;
  background: seagreen;
}
</style>
