<template>
    <div class="p-card">
        <img src="../assets/delete.svg" class="img-delete" @click="emitter(pokemon)">
        <img v-if="pokemon.sprite_img" v-bind:src="pokemon.sprite_img">
        <img v-else src="../assets/fogliotriste.svg" class="no-img">
        <ul>
          <li>Name {{ pokemon.name }}</li>
          <li>Abilities: {{ pokemon.abilities }}</li>
          <li>Experience: {{ pokemon.base_experience }}</li>
          <li>Types: {{ pokemon.types }}</li>
        </ul>
    </div>
</template>


<script>
export default {
    name: 'PokemonCard',
    props: ['pokemon'],
    methods: {
      emitter(pokemon){
        this.$emit('delete', pokemon.id);
      }
    }
}

</script>

<style>
ul{
  text-align: left;
}



.img-delete{
  width: 1em;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
}

.no-img{
  width: 4em;
}

</style>