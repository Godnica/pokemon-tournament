<template>
  <div class="about">
    <h1>Lista dei team</h1>

    <div>
      <b-form-group label="Pokemon team must have:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group"
        v-model="typesSelected"
        :options="allType"
        :aria-describedby="ariaDescribedby"   
      ></b-form-checkbox-group>
    </b-form-group>
    </div>
 
      <b-table striped hover :items="teams" @row-clicked="rowClicked">
        <template #cell(pokemons)="data">
          <img v-for="p_img, i in data.item.pokemons" :key="i" :src="p_img">
        </template>
        <template #cell(types)="data">
          <ul>
            <li v-for="p_type, i in data.item.types" :key="i">
              {{ p_type }}
            </li>
          </ul>
        </template>
      </b-table>
  </div>
</template>


<script>
export default {
  name: 'TeamList',
  data(){
    return {
      teams: [],
      allType: [],
      typesSelected: [],
      oldCopy: []
    }
  },
  mounted(){
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }


    if(!this.$store.state.team.ready){

      this.$internal_api.get('team').then(teams=>{
        teams.data = teams.data.sort((a, b)=>
          {
            return (new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          }
        )
        this.teams = teams.data.map(row=>{
          row.created_at = new Date(row.created_at).toLocaleDateString('it-IT')
          row.totale_esperienza = row.pokemons.map(el=>el.base_experience).reduce((a,b)=>a+b)
          row.types = row.pokemons.map(t=>t.types).join().split(",").filter(onlyUnique)
          row.pokemons = row.pokemons.map(p=>p.sprite_img);
          this.allType = this.allType.concat(row.types);
          return row
        })

        this.allType = this.allType.filter(onlyUnique)
        
        this.oldCopy = [...this.teams];

        console.log("dispaccio l'evento")
        this.$store.dispatch('UpdatePokemonTeam', this.oldCopy);

      })
    }else{
      console.log("non faccio più la chiamata")
      this.teams = this.$store.state.team.pokemons
    }
    
  },
  watch: {
    typesSelected: function (n) {
      console.log(n)

      function contains(arrStart,arrMustHave){
        let flag = true
        arrMustHave.forEach(element => {
          if(!arrStart.includes(element)){      
            flag = false
          }
        });

        return flag        

      }

      this.teams = this.oldCopy.filter(el=>contains(el.types, n))
            
    }
  },
  methods: {
    rowClicked(row){
      console.log("buco di culo", row)
      this.$store.dispatch('PrepareUpdate', row);
      this.$router.push({ path: '/team/update'});
    }
  }

}
</script>


<style>
#checkbox-group{
  display: inline-flex;
}

.custom-control{
  margin: 0.3em;
}

.custom-control input{
  margin-left: 0.3em;
  margin-right: 0.3em;
}

</style>
