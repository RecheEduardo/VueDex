<template>
    <div class="d-flex gap-5 my-5" >
            <p class="pokemon-name mb-0 display-4">
                {{ capitalize(pokemon.name) }} - {{ pokemonId }}
            </p>
            <button class="btn btn-primary" @click="navigateToDetail">Ver</button>
    </div>
</template>

<script>
export default {
    name: 'PokemonCard',
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    computed: {
        // pega o ID do pokemon (se não vier no objeto, extrai da URL)
        pokemonId() {
            if (this.pokemon.id) return this.pokemon.id
            const url = this.pokemon.url
            if (url) {
                const parts = url.split('/').filter(Boolean)
                return parts.pop()
            }
            return ''
        },
        // monta o link da imagem a partir do ID
        pokemonImage() {
            const id = this.pokemonId
            return id
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
                : 'https://via.placeholder.com/120'
        }
    },
    methods: {
        // transforma a primeira letra em maiuscula
        capitalize(value) {
            if (!value) return ''
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        // leva pra página de detalhes do pokemon
        navigateToDetail() {
            this.$router.push({ name: 'Detail', params: { id: this.pokemon.name } })
        }
    }
}
</script>