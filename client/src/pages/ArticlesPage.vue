<template>
  <div class="body">
    <div>
      <div>Количество лайков: <strong>{{ likes }}</strong></div>
      <div>Количество дизлайков: <strong>{{ dislikes }}</strong></div>
      <button @click="incLikes">Like</button>
      <button @click="incDislikes">Dislike</button>
    </div>
    <div class="app__btns">
      <my-button @click="fetchArticles">Получить статьи</my-button>
      <my-button @click="dialogShow">
        Добавить статью
      </my-button>
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
    <my-dialog v-model:show="dialogVisible">
      <article-form
          @create="createArticle"
      />
    </my-dialog>
    <articles-list
        v-if="!isArticlesLoading"
        :posts="searchAndSortedArticles"
        @remove="removeArticle"
    />
    <h3 v-else>Идёт загрузка..</h3>
    <div v-intersection="loadMoreArticles" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPage"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios'
import ArticlesList from "@/components/ArticlesList";
import ArticleForm from "@/components/ArticleForm";
// import MyDialog from "@/components/UI/MyDialog";
// import MyButton from "@/components/UI/MyButton";

export default {
  components: {
    // MyButton,
    // MyDialog,
    ArticlesList,
    ArticleForm
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      posts: [],
      dialogVisible: false,
      isArticlesLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержанию'}
      ]
    }
  },
  methods: {
    incLikes() {
      this.likes += 1;
    },
    incDislikes() {
      this.dislikes += 1;
    },
    createArticle(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removeArticle(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    dialogShow () {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchArticles() {
      this.isArticlesLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
        this.isArticlesLoading = false;
      } catch (e) {
        alert('Ошибка!')
      }
    },
    async loadMoreArticles() {
      try {
        setTimeout(async () => {
          this.page +=1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data];
        }, 1000)
      } catch (e) {
        alert('Ошибка!')
      }
    }
  },
  mounted() {
    this.fetchArticles();
  },
  watch: {
    // page() {
    //   this.fetchArticles();
    // }
  },
  computed: {
    sortedArticles() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    searchAndSortedArticles() {
      return this.sortedArticles.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
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
.page__wrapper {
  justify-content: center;
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current-page {
  border: 2px solid black;
  background: cornflowerblue;
}
.observer {
  height: 40px;
  background: seagreen;
}
</style>
