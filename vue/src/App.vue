<template>
  <div class="nav">
    <a href="/" class="nav-link router-link-exact-active" >Movies</a>
    <a href="/" class="nav-link">Post a Movie</a>
    <a href="/" class="nav-link">About</a>
  </div>
  
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav {
  text-align: center;
  padding: 30px;
}

.nav-link {
  font-weight: bold;
  color: #2c3e50;
}

.nav-link.router-link-exact-active {
  color: #42b983;
}

a {
  color: #00B7FF;
}
</style>
