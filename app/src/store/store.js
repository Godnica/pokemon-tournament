import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pokemonCounter: 0,
        pokemonList: []
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
        }
    },
    actions: {
        InitializePokemonCounter({commit}, total){          
            commit('INIT_TOTAL', total);
        },

        InitializePokemonList({commit}, list){
            commit('INIT_LIST', list);
        }
    }
})