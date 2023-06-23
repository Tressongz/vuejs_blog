<template>
  <div class="navbar">
    <div>First site on Vue3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/')">Главная</my-button>
      <my-button @click="$router.push('/articles')">Статьи</my-button>
      <my-button @click="$router.push('/store')">Статьи (Store)</my-button>
      <my-button @click="$router.push('/composition')">Статьи (Сomposition API)</my-button>
      <my-button @click="$router.push('/about')">О нас</my-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  height: 100px;
  background-color: slateblue;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>