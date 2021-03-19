<template>
  <div>
    <sui-modal v-model="open">
      <sui-modal-header>Informations du Membre</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" :src="avatar"/>
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
    <div class="ui raised container segment" id="main" @click="toggle">
      <a is="sui-label" image >
        <img :src="avatar" />
        {{membre.fullname}} : {{membre.email}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Membre",
  props: ['membre'],
  data(){
    return{
      open: false,
      avatar: ''
    }
  },
  mounted() {
    this.getAvatar();
  },
  methods:{
    toggle() {
      this.open = !this.open;
    },
    getAvatar(){
      this.avatar = 'https://eu.ui-avatars.com/api/?name='+this.membre.fullname+'&background=random';
    }
  }
}
</script>

<style scoped>

</style>