<template>
  <div class="ui raised grid container segment" id="main">
    <div class="thirteen wide column" v-if="modify">
      <form @submit.prevent="modifierConversation" class="ui bottom aligned form">
        <div class="fields">
          <div class="field">
            <label>Label</label>
            <input v-model="label" type="text">
          </div>
          <div class="field">
            <label>Topic</label>
            <input v-model="topic" type="text">
          </div>
          <div class="item">
            <label>  </label>
            <button class="ui icon inverted green button">
              <i class="save link icon"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="thirteen wide middle aligned column" v-else>
      <p><strong>{{conversation.label}}</strong> : {{conversation.topic}}</p>
    </div>
    <div class="three wide right aligned middle aligned column">
      <button class="ui icon icon inverted orange padded button" @click="setModify" v-if="modify">
        <i class="times link icon"></i>
      </button>
      <button class="ui icon inverted blue button" @click="setModify" v-else>
        <i class="pencil alternate link icon"></i>
      </button>
      <button class="ui icon inverted red button" @click="effacerConversation">
        <i class="trash link icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conversation",
  props : ['conversation'],
  data() {
    return {
      label: this.conversation.label,
      topic: this.conversation.topic,
      modify: false
    };
  },
  methods : {
    effacerConversation(){
      api.delete('channels/'+this.conversation.id).then(response => {
        alert('Conversation effacé correctement');
        this.$bus.$emit('charger-conversations');
      }).catch(error => {
        alert('Error : ' + error);
      });
    },
    modifierConversation(){
      api.put('channels/'+this.conversation.id, {
        label: this.label,
        topic: this.topic
      }).then(response => {
          alert('Conversation modifié correctement');
          this.setModify();
          this.$bus.$emit('charger-conversations');
      }).catch(error => {
        alert('Error : '+error);
      })
    },
    setModify(){
      this.modify = !this.modify;
    }
  },
}
</script>

<style lang="scss">
  .ui.icon.inverted.blue.button{
    margin-right : 15px;
  }
</style>