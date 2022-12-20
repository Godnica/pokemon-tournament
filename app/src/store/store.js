import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pokemonCounter: 0,
        pokemonList: [],
        team: {
            ready: false,
            pokemons: []
        },
        row: false
    },
    getters: {

    },
    mutations:{
        INIT_TOTAL(state, total){
            console.log("Seass", total);
            state.pokemonCounter = total;
        },
        INIT_LIST(state, list){
            console.log("---list", list);
            state.pokemonList = list
        },
        UPDATE_TEAM(state, team){
            state.team.ready = true;
            state.team.pokemons = team;
        },
        MUST_SEE_TEAM(state){
            state.team.ready = false
        },
        ROW_READY(state, row){
            state.row = row
        }
    },
    actions: {
        InitializePokemonCounter({commit}, total){          
            commit('INIT_TOTAL', total);
        },

        InitializePokemonList({commit}, list){
            commit('INIT_LIST', list);
        },
        UpdatePokemonTeam({commit}, team){
            console.log("update pokemon team")
            commit('UPDATE_TEAM', team)
        },
        MustSeePokemonTeam({commit}){
            commit("MUST_SEE_TEAM")
        },
        PrepareUpdate({commit}, row){
            commit('ROW_READY', row)
        }
    }
})