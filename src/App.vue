<template>
  <div id="app" v-if="apiOk">
    <router-view/>
  </div>
  <div v-else></div>
</template>


<script>
export default {
  data(){
    return{
      apiOk:false
    }
  },
  mounted(){
    console.log("L'app est demarrée")
    api.get('ping').then(reponse => {
      this.apiOk = true;
      console.log("L'api est fonctionnelle");

      if(!this.$store.state.membre || !this.$store.state.token){
        if(this.$route.path !== '/se-connecter' || this.$route.path !== '/creer-compte') {
          this.$router.push('/se-connecter');
        }
      } else {
        this.$router.push('/conversations');
      }
      //this.$router.push('/se-connecter');
    }).catch(error => {
      console.log("L'api ne marche pas")
    });
    this.$bus.$on('charger-conversations',this.chargerConversations);
    this.$bus.$on('charger-membres',this.chargerMembres);
  },
  methods:{
    chargerConversations(){
      api.get('channels').then(response => {
        this.$store.commit('setConversations',response.data);
      });
    },
    chargerMembres(){
      api.get('members').then(response => {
        this.$store.commit('setMembres',response.data);
      });
    },
  }
}
</script>

<style lang="scss">
  body{
    background-color: white;
  }
</style>
