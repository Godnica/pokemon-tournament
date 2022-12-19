<template>
  <div id="app">
    <nav>
      <router-link to="/team/create">Build a Team</router-link>
      <img src="./assets/pokemon-title.svg" alt="Title">
      <router-link to="/team/list">Team List</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      pokemonCounter : 0
    }
  },
  mounted(){
    this.$external_api.get('pokemon').then(res=>{
      console.log(res.data.count);      
      this.pokemonCounter = res.data.count;

      this.$store.dispatch('InitializePokemonCounter', res.data.count);

      console.log("---->", this.$store.state.pokemonCounter)
      
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  margin: 0;
}

nav {
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ef5350;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0 2em 0 2em
}

nav img{
  max-width: 25%;
}

nav a.router-link-exact-active {
  color: #ffcb05;
}

h1{
  color: #003A70;
  margin-left: 1em;
  margin-right: 1em;
}


input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align:center;
  font-size: 1.3em;
}


.container{
  padding-top: 0.5em;
  margin: 1em;
}

button{
  background-color: #003A70;
  color: #ffcb05;
  border-radius: 8px;
  padding: 5px;
}

button:disabled{
  background-color: #003a706c;
  color: #ffcd056c;
}

</style>
