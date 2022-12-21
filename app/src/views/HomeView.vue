<template>
  <div class="home">
    <div class="container">
      <h2 v-if="editPage">Stai modificando il team</h2>
      <h1>Nome del team </h1>
      <input v-model="teamName"  type="text" @input="setName($event.target.value)">      
    </div>
    <div class="bt-container">
      <b-button @click="catching()" :disabled="teamName==''" class="poke-button" pill>
        Gotta Catch 'Em All
      </b-button>
      <b-button  @click="saveTeam()" v-if="pokemonArray.length>0 && teamName" class="poke-button" pill>
        Salva Team
      </b-button> 
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="flex">

      <PokemonCardVue v-for="p,i in pokemonArray" v-bind:key="i" v-bind:pokemon="p" @delete="deletePokemon(i)"></PokemonCardVue>
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
      editPage: false,
      teamName: '',
      pokemonArray: []
    }
  },
  mounted(){
    if(this.$route.params.id){
      this.$internal_api.get(`team/${this.$route.params.id}`).then(res=>{
        if(res.data.length==0){
          this.$router.push('/team/create')
        }else{
          this.editPage = true;
          this.teamName = res.data[0].team_name
          this.pokemonArray = res.data[0].pokemons
        }
      })
    }
  },
  methods:{
    setName(val){
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
      const rand = Math.floor(Math.random() * this.$store.state.pokemonCounter);
      const pokemon_url = this.$store.state.pokemonList[rand].url;
      const split_index = pokemon_url.split("/").length
      this.$external_api.get(`pokemon/${pokemon_url.split("/")[split_index-2]}`).then(pokemon_=>{        
        
        const pokemon = {
          name: pokemon_.data.name,
          base_experience: pokemon_.data.base_experience,
          sprite_img : pokemon_.data.sprites.front_default||pokemon_.data.sprites.versions['genertation-viii'].icon.front_default,
          abilities: pokemon_.data.abilities.map(a=>a.ability.name).join(),
          types: pokemon_.data.types.map(t=>t.type.name).join()
        }

        this.pokemonArray.push(pokemon)
      })
    },
    saveTeam(){
      const pay = {
        team_name : this.teamName,
        created_at: new Date(),
        pokemons : this.pokemonArray
      }
      if(!this.editPage){
        this.$internal_api.post('team', pay).then(()=>{
          this.$store.dispatch('MustSeePokemonTeam')
          this.$router.push({path: "/team/list"});
        })
      }else{
        this.$internal_api.put(`team/${this.$route.params.id}`, pay).then(()=>{
          this.$store.dispatch('MustSeePokemonTeam')
          this.$router.push( {path: "/team/list"});
        })
      }
    },
    deletePokemon(i){
      this.pokemonArray.splice(i,1);
    }
  },
  
 
}
</script>

<style scoped>

.bt-container{
  margin-top: 1em;
  margin-bottom: 1em;
}

button{
  font-size: x-large;
  background-color: #0075BE;
  margin-bottom: 1em;
}

button:hover{
  color: #ffcb05;
  background-color: #0075BE;
}

button:disabled{
  font-size: x-large;
  background-color: #0075be91;
}

button{
  margin-right: 0.3em;
  margin-left: 0.3em;
}
</style>
