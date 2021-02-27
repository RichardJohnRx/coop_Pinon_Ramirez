<template>
  <div class="ui raised container segment" id="main">
    <sui-modal v-model="open">
      <sui-modal-header>Informations du Membre</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"/>
        <sui-modal-description>
          <sui-header><strong>Nom complet</strong> : {{membre.fullname}}</sui-header>
          <p><strong>Id</strong> : {{membre.id}}</p>
          <p><strong>Email</strong> : {{membre.email}}</p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggle">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <a @click="toggle"><p><strong>{{membre.fullname}}</strong> : {{membre.email}}</p></a>
  </div>
</template>

<script>
export default {
  name: "Membre",
  props: ['membre'],
  data(){
    return{
      open: false
    }
  },
  mounted() {
    console.log(this.membre);
  },
  methods:{
    toggle() {
      this.open = !this.open;
    }
  }
}
</script>

<style scoped>

</style>