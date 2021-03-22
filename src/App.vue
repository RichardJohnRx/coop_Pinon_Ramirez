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
    //On envoie un message dans la console indiquant que l'appli est démarrée
    console.log("L'app est demarrée")
    //On envoie une requête à l'API pour savoir si la connection est OK
    api.get('ping').then(reponse => {
      //Si oui on change la visualization de l'appli à TRUE
      // et on envoie une message dans la console
      this.apiOk = true;
      console.log("L'api est fonctionnelle");

      //Si à l'intérieur de l'appli n'est pas sauvegardé la variable
      // du membre connecté et son token...
      if(!this.$store.state.membre && !this.$store.state.token){
        //Et si le path de la route est different de 'se-connecter' et 'creer-compte'
        if(this.$route.path !== '/se-connecter' || this.$route.path !== '/creer-compte') {
          //L'appli est redirigée vers la route 'se-connecter'
          this.$router.push('/se-connecter');
        }
      } else {
        //Sinon l'appli est redirigée vers la route 'conversations'
        this.$router.push('/conversations');
      }
      //this.$router.push('/se-connecter');
    }).catch(error => {
      //Si la requête a des erreurs de connexion on envoie
      //une message d'erreur dans la console
      console.log("L'api ne marche pas")
    });

    //On ajout des méthodes dans la variable $bus pour qu'ils soient
    //disponibles dans tout l'environnement de l'appli

    //Le methode
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
