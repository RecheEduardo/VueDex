<template>
    <div class="home-container container pt-4">
        <h1 class="display-1 mb-4 fw-bold text-muted text-center">Pokédex Interativa</h1>

        <!-- componente de filtro que emite evento com nome digitado -->
        <Filter @filter="handleUpdateFilters" />

        <!-- lista de pokemon: se estiver buscando, mostra so o resultado da busca -->
        <ul class="pokemon-list list-group mb-5">
            <PokemonCard
                v-for="(pokemon, index) in displayPokemons"
                :key="index"
                :pokemon="pokemon"
            />
        </ul>

        <!-- estado de loading -->
        <div v-if="loading" class="loading">Carregando...</div>
    </div>
</template>

<script>
import Filter from '../components/Filter.vue'
import PokemonCard from '../components/PokemonCard.vue'
import { fetchPokemonDetail, fetchAllPokemons } from '../services/pokeapi'

export default {
    name: 'Home',
    components: {
        Filter,
        PokemonCard
    },
    data() {
        return {
            loading: false,         // controla o estado de carregamento
            offset: 0,              // controle da paginação
            limit: 20,              // quantidade por requisição
            searchMode: false,      // indica se está em modo busca
            searchResults: []       // armazena resultados da busca
        }
    },
    computed: {
        // se estiver buscando, mostra os resultados. senão, mostra os pokémons do Vuex
        displayPokemons() {
            return this.searchMode
                ? this.searchResults
                : this.$store.state.poke.pokemons
        }
    },
    methods: {
        // carrega mais pokemons da API (scroll infinito)
        async fetchPokemons() {
            if (this.searchMode) return
            this.loading = true
            await this.$store.dispatch('poke/fetchPokemons', {
                offset: this.offset,
                limit: this.limit
            })
            this.loading = false
            this.offset += this.limit
        },
        // chamado quando o filtro e usado
        async handleUpdateFilters(query) {
            // limpa o texto do pokemon e coloca tudo em minusculo
            const term = query.trim().toLowerCase()

            // se o campo estiver vazio, sai do modo de busca e limpa os resultados
            if (!term) {
                this.searchMode = false
                this.searchResults = []
                return
            }

            // ativa o modo de busca e liga o loading
            this.searchMode = true
            this.loading = true

            try {
                // busca todos os pokemons da api (só os nomes e urls, bem rapido)
                const all = await fetchAllPokemons()
                // filtra os que contem o texto digitado em qualquer parte do nome
                const matches = all.filter(p => p.name.includes(term))
                
                const details = await Promise.all(
                    // busca os dados completos de cada pokemon que bateu no filtro
                    matches.map(p => fetchPokemonDetail(p.name))
                )

                // salva os resultados pra exibir na tela
                this.searchResults = details

            } catch (err) {
                console.error('erro na busca:', err)
                // se der algum erro mostra no console e limpa os resultados
                this.searchResults = []
            } finally {
                // desliga o loading dando certo ou nao
                this.loading = false
            }
        },
        // busca um unico pokemon pelo nome ou ID
        async fetchSearchResult(nameOrId) {
            this.loading = true
            try {
                const result = await fetchPokemonDetail(nameOrId)
                this.searchResults = [result]
            } catch (error) {
                console.error('Pokémon não encontrado:', error)
                this.searchResults = []
            }
            this.loading = false
        },
        // detecta scroll no final da pagina e carrega mais (se nao estiver buscando)
        handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 5 && !this.loading && !this.searchMode) {
                this.fetchPokemons()
            }
        }
    },
    mounted() {
        // carrega a primeira pagina e ativa o scroll infinito
        this.fetchPokemons()
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
        // remove o scroll ao sair do componente
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style scoped>
</style>
