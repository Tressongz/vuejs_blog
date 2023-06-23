import { createStore } from 'vuex';
import {articleModule} from "@/store/articleModule";


export default createStore ( {
  state: () => ({
    likes: 0
  }),
  modules: {
    article: articleModule
  },

})


