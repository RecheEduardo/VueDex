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
  background-color: #fafafa !important;
  background-image: url('../public/wallpaper.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
