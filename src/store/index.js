// importa a funcao pra criar o store
import { createStore } from 'vuex'

// importa o modulo que cuida das infos dos pokemons
import pokeModule from './modules/pokeModule'

// cria e exporta o store principal da app
export default createStore({
    // organiza o store em "modulos"
    // no caso, o modulo "poke" vai cuidar das infos dos pokemons
    modules: {
        poke: pokeModule
    }

    // se tiver mais modulos no futuro, da pra ir jogando aqui
})
