import {computed, ref} from "vue";

export function useSortedAndSearchedPosts(sortedArticles) {
    const searchQuery = ref('')
    const sortedAndSearchedPosts = computed(() => {
        return sortedArticles.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return {
        searchQuery, sortedAndSearchedPosts
    }
}