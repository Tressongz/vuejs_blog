<template>
  <div class="body">
    <h1>Страница с постами</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск...."
        v-focus
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать статью
      </my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <article-form
          @create="createPost"
      />
    </my-dialog>
    <articles-list
        :posts="sortedAndSearchedPosts"
        @remove="this.removePost"
        v-if="!isArticleLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
<!--    <div class="page__wrapper">-->
<!--      <div-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="page"-->
<!--          :class="{-->
<!--              'current-page': page === pageNumber-->
<!--            }"-->
<!--          @click="changePage(pageNumber)"-->
<!--      >-->
<!--        {{ pageNumber }}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm";
import ArticlesList from "@/components/ArticlesList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    ArticlesList,
    ArticleForm,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPosts: 'article/setPosts',
      setPage: 'article/setPage',
      setSearchQuery: 'article/setSearchQuery',
      setSelectedSort: 'article/setSelectedSort',
    }),
    ...mapActions({
      removePost: 'article/removePost',
      loadMorePosts: 'article/loadMorePosts',
      fetchPosts: 'article/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.article.posts,
      isArticleLoading: state => state.article.isArticleLoading,
      selectedSort: state => state.article.selectedSort,
      searchQuery: state => state.article.searchQuery,
      page: state => state.article.page,
      limit: state => state.article.limit,
      totalPages: state => state.article.totalPages,
      sortOptions: state => state.article.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'article/sortedPosts',
      sortedAndSearchedPosts: 'article/sortedAndSearchedPosts'
    })
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>
.body {
  padding: 20px;
}
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>