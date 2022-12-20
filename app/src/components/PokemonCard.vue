<template>
    <div class="p-card">
        <ul>
            <li>Nome {{ pokemon.name }}</li>
            <li>Abilità: {{ pokemon.abilities }}</li>
            <li>Esperienza: {{ pokemon.base_experience }}</li>
            <li>Tipi: {{ pokemon.types }}</li>
        </ul>
        <img v-bind:src="pokemon.sprite_img">
    </div>
</template>


<script>
export default {
    name: 'PokemonCard',
    props: ['pokemon']
}

</script>

<style>
ul{
  text-align: left;
}

.p-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 8px;
  padding-right: 0.3em;
  margin: 0.3em;
}

.p-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}



</style>