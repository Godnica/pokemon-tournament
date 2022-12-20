<template>
  <div class="about">
    <h1>Lista dei team</h1>
  </div>
</template>


<script>
export default {
  name: 'TeamList',
  mounted(){
    this.$internal_api.get('team').then(teams=>{
      console.log(teams)
    })
  }
}
</script>
