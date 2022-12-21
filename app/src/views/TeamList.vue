<template>
  <div class="about">
    <h1>Lista dei team</h1>

    <div>
      <img src="../assets/filter-outline.svg" class="filter" @click="filterVisibility()">

      <div class="p-card container" id="filter-div" v-if="filter_visible">
        <div class="container">
          <b-form-group label="Pokemon team must have:" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="checkbox-group"
            v-model="typesSelected"
            :options="allType"
            :aria-describedby="ariaDescribedby"   
          ></b-form-checkbox-group>
        </b-form-group>
        </div>
      </div>
    </div>

      <div class="container">
        <div class="p-card" v-for="team, i in teams" :key="i" @click="rowClicked(team.id)">
          <img v-for="pokemon, u in team.pokemons" :key="u" :src="pokemon">
          <div class="container">
            
              <div class=box>
                <strong>Team name:</strong> {{team.team_name}}
             </div>
              
              <div class=box>
                <strong>Created at</strong> {{team.created_at}}
             </div>
              
              <div class=box>
                <strong>Total Exp</strong> {{team.totale_esperienza}}
             </div>
              
              <div class=box>
                <strong>Types</strong> {{team.types.join()}}
             </div>
              
            
          </div>
        </div>
      </div>

      <!-- <b-table striped hover :items="teams" @row-clicked="rowClicked">
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
      </b-table> -->
  </div>
</template>


<script>
export default {
  name: 'TeamList',
  data(){
    return {
      filter_visible: false,
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

        this.$store.dispatch('UpdatePokemonTeam', this.oldCopy);

      })
    }else{
      this.teams = this.$store.state.team.pokemons
      this.allType = this.teams.map(el=>el.types).flat(1).filter(onlyUnique);
      this.oldCopy = [...this.teams];
    }
    
  },
  watch: {
    typesSelected: function (n) {

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
      this.$store.dispatch('PrepareUpdate', row);
      this.$router.push({ path: `/team/update/${row}`});
    },
    filterVisibility(){
      console.log(this.filter_visible)
      this.filter_visible = !this.filter_visible
    }
  }

}
</script>


<style>

.custom-control{
  margin: 0.3em;
}

.custom-control input{
  margin-left: 0.3em;
  margin-right: 0.3em;
}
.box{
  min-width: 100%;
  overflow-wrap: break-word;
}
.filter{
  width: 30px;
  border-radius: 8px;
  border: #0075be91;
  border-style: groove;
  margin: 1em;
  padding: 0.3em;
  cursor: pointer;
}

#filter-div{
  width: 80%;
  margin-bottom: 1em;
}
</style>
