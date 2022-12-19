<template>
  <div class="home">
    <div class="container">
      <label for="tname">Nome del team</label>
      <input id="tname"  type="text" @input="setName($event.target.value)">

      
      <button @click="catching()" :disabled="teamName==''">
        Gotta Catch 'Em All
      </button>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data(){
    return {
      pokemonCounter : 0,
      teamName: '',
      pokemonArray: []
    }
  },
  mounted(){
  },
  methods:{
    setName(val){
      console.log(val)
      this.teamName = val;
    },
    catching(){
      if(this.$store.state.pokemonList.length===0){
        this.$external_api.get(`/pokemon?limit=${this.$store.state.pokemonCounter}`).then(res=>{
          this.$store.dispatch('InitializePokemonList', res.data.results);
          this.takeRandomPokemon();        
        })
      }else{
        this.takeRandomPokemon();
      }
    },
    takeRandomPokemon(){
      console.log("-Fine-->",this.$store.state.pokemonList)
    }
  },
 
}
</script>

<style scoped>

</style>
