// axios e quem vai ajudar a fazer as requisicoes HTTP la na API
import axios from 'axios'

// esse aqui vai ser o modulo que cuida dos pokemons
// em JS nao tem interface igual no TS, mas pra se situar:
// um pokemon aqui vai ter => { name: string, url: string }

// estado inicial do modulo
const state = {
    // lista que vai guardar os pokemons que a gente busca
    pokemons: [],

    // filtros que o usuario aplicar (tipo tipo, nome, etc)
    filters: {}
}

// mutations sao funcoes que alteram o estado, mas sempre de forma SÍNCRONA
const mutations = {

    // essa aqui simplesmente troca a lista toda de pokemons por uma nova
    SET_POKEMONS(state, pokemons) {
        state.pokemons = pokemons
    },

    // essa aqui adiciona novos pokemons na lista atual, sem apagar os que ja tem
    APPEND_POKEMONS(state, pokemons) {
        state.pokemons = [ ...state.pokemons, ...pokemons ]
    },

    // atualiza os filtros aplicados pelo usuario
    SET_FILTERS(state, filters) {
        state.filters = filters
    }
}

// actions sao funcoes que podem rodar codigo assincrono (como chamadas de API)
const actions = {

    // essa aqui busca os pokemons da API usando offset e limit
    async fetchPokemons({ commit }, { offset, limit }) {
        try {
            // faz a chamada pra pegar a listinha de pokemons
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

            // se tiver offset, quer dizer que ta carregando mais (scroll infinito ou paginacao por ex)
            if (offset) {
                commit('APPEND_POKEMONS', response.data.results)
            } else {
                // se nao tiver offset, entao deve ser a primeira chamada ou um reset
                commit('SET_POKEMONS', response.data.results)
            }

        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error)
        }
    },

    // essa action atualiza os filtros no estado
    updateFilters({ commit }, filters) {
        commit('SET_FILTERS', filters)
    }
}

// monta o modulo completo, com tudo que ele precisa pra funcionar
const pokeModule = {
    namespaced: true,

    // injeta os estados, mutations e actions que definimos acima
    state,
    mutations,
    actions
}

// exporta esse modulo pra ser usado la no store principal
export default pokeModule
