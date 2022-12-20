<template>
  <div class="home">
    <div class="container">
      <h1>Nome del team </h1>
      <input   type="text" @input="setName($event.target.value)">      
    </div>
    <button @click="catching()" :disabled="teamName==''">
      Gotta Catch 'Em All
    </button>
    <button  @click="saveTeam()" v-if="pokemonArray.length>0 && teamName">
      Salva Team
    </button> 
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="flex">

      <PokemonCardVue v-for="p,i in pokemonArray" v-bind:key="i" v-bind:pokemon="p"></PokemonCardVue>
    </div>
    <div id="footer">
    </div>
  </div>

  

</template>

<script>
import PokemonCardVue from '@/components/PokemonCard.vue';
export default {
  name: 'HomeView',
  components: {
    PokemonCardVue
  },
  data(){
    return {
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
      console.log("-Fine-->",this.$store.state.pokemonList);
      const rand = Math.floor(Math.random() * this.$store.state.pokemonCounter);
      const pokemon_url = this.$store.state.pokemonList[rand].url;
      const split_index = pokemon_url.split("/").length

      console.log("---", pokemon_url.split("/")[split_index-2])

      this.$external_api.get(`pokemon/${pokemon_url.split("/")[split_index-2]}`).then(pokemon_=>{        


        console.log(pokemon_);

        

        const pokemon = {
          name: pokemon_.data.name,
          base_experience: pokemon_.data.base_experience,
          sprite_img : pokemon_.data.sprites.front_default||pokemon_.data.sprites.versions['genertation-viii'].icon.front_default,
          abilities: pokemon_.data.abilities.map(a=>a.ability.name).join(),
          types: pokemon_.data.types.map(t=>t.type.name).join()
        }

        console.log("---->",pokemon)

        this.pokemonArray.push(pokemon)
      })
    },
    saveTeam(){
      console.log("Santo dio")
      const pay = {
        team_name : this.teamName,
        created_at: new Date(),
        pokemons : this.pokemonArray
      }
      this.$internal_api.post('team', pay)
    }
  },
  
 
}
</script>

<style scoped>
button{
  margin-right: 0.3em;
  margin-left: 0.3em;
}
</style>
