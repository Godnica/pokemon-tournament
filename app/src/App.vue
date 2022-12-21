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
      
      this.pokemonCounter = res.data.count;

      this.$store.dispatch('InitializePokemonCounter', res.data.count);
      
    })
  }
}
</script>

<style>
#app 
  {

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
  margin-bottom: 1em;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0 2em 0 2em
}

nav a:hover {
  color: white;
}

nav img{
  max-width: 25%;
}

nav a.router-link-exact-active {
  color: #ffcb05;
}

h1, h2{
  color: #003A70;
  margin-left: 1em;
  margin-right: 1em;
}


input[type=text] {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align:center;
  font-size: 1.3em;
}

b-button{
  background-color: #0075BE;
  color: #ffcb05;
  border-radius: 8px;
  padding: 5px;
  border-color: #0A285F;
  margin-bottom: 2em;
}

b-button:disabled{
  background-color: #003a706c;
  color: #ffcd056c;
}

.flex{
  display: flex;
  justify-content: center;
  flex-wrap:wrap;
}

.p-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 8px;
  padding: 20px;
  margin: 0.3em;
  position: relative;

}

.p-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}


</style>
