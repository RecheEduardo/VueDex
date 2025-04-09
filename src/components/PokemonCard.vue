<template>
	<!-- card inteiro clicável -->
	<div class="input-group my-3 rounded" @click="navigateToDetail">
		<div class="pokemon-card form-control border-0 d-flex align-items-center gap-5 py-0">
			<!-- imagem do pokemon -->
			<div class="pokemon-image-container overflow-hidden">
				<img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image" />
			</div>
			<!-- nome do pokemon -->
			<p class="pokemon-name mb-0 display-4">
				{{ capitalize(pokemon.name) }}
			</p>
		</div>
		<!-- botão com o ID do pokemon -->
		<button class="btn bg-gradient bg-secondary px-4 fs-1 d-flex align-items-center gap-2">
			<small class="text-light fs-3">{{ pokemonId }}</small>
		</button>
	</div>
</template>

<script>
export default {
	name: 'PokemonCard',
	props: {
		// recebe os dados do pokemon
		pokemon: {
			type: Object,
			required: true
		}
	},
	computed: {
		// pega o id do pokemon (do objeto ou da url)
		pokemonId() {
			if (this.pokemon.id) return this.pokemon.id
			const url = this.pokemon.url
			if (url) {
				const parts = url.split('/').filter(Boolean)
				return parts.pop()
			}
			return ''
		},
		// monta o link da imagem com base no id
		pokemonImage() {
			const id = this.pokemonId
			return id
				? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
				: 'https://via.placeholder.com/120' // placeholder qualquer para 'nao encontrado'
		}
	},
	methods: {
		// deixa a primeira letra maiúscula
		capitalize(value) {
			if (!value) return ''
			return value.charAt(0).toUpperCase() + value.slice(1)
		},
		// muda de rota para a tela de detalhes
		navigateToDetail() {
			this.$router.push({ name: 'Detail', params: { id: this.pokemon.name } })
		}
	}
}
</script>

<style scoped>
.pokemon-image-container {
	max-width: 300px;
	max-height: 150px;
	border-radius: 0.5rem;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.input-group {
	cursor: pointer;
	box-shadow: 0 0 20px rgba(138, 138, 138, 0.1);
}

.pokemon-card {
	background: linear-gradient(180deg, rgba(250,250,250,1) 0%, rgb(241, 240, 240) 100%);
}

.pokemon-name {
	transition: .25s;
}

.pokemon-image {
	max-width: 300px;
	max-height: 200px;
	margin-top: -10px;
	object-fit: contain;
	transition: transform 0.4s ease-out;
}

.input-group:hover .pokemon-image {
	transform: scale(0.7);
}

.input-group:hover .pokemon-name {
	font-size: 4rem;
	transition: .25s ease-out;
	transform: translateX(30px);
}
</style>
