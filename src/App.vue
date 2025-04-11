<template>
  <router-view />
</template>


<script>
  export default {
      name: 'App'
  };
</script>


<style>
/* background da pokebola */
body { 
  margin: 0;
  font-family: 'Inter' !important;
  background-color: #fafafa !important;
  background-image: url('../public/wallpaper.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
