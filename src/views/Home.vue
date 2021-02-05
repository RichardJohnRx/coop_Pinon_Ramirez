<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
        fullname : this.$store.state.membre.fullname
    };
  },
  mounted() {
  },
  methods: {},
}
</script>

<style>
#header{
    background-color: rgb(227, 251, 255);
}

#headerBottom{
    text-align: center;
    background-color: #303030;
    color: white;
}
</style>