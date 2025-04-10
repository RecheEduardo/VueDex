<template>
	<div>
		<!-- input com botão de busca -->
		<Motion asChild
			:initial="{ scale: 0.5, opacity: 0 }"
			:animate="{ scale: 1, opacity: 1 }" 
			:transition="{ type: 'spring', stiffness: 100, damping: 25 }"
		>
			<div class="filter rounded my-4">
				<div class="input-group input-group-lg mb-2">
					<!-- campo de texto vinculado ao estado local -->
					<input
						type="text"
						v-model="searchQuery"
						placeholder="Buscar Pokémon..."
						class="form-control pokemon-input border-0 fs-2"
					>
					<!-- botao que dispara o filtro -->
					<button
						class="btn btn-danger fw-bold border-0 filter-btn"
						type="button"
						@click="emitFilter"
					>
						<i class="ti ti-pokeball fs-1"></i>
					</button>
				</div>
			</div>
		</Motion>

		<!-- filtros opcionais de tipo e região -->
		<div class="d-flex justify-content-end gap-3">
			<Motion asChild
				:initial="{ scale: 0, opacity: 0 }"
				:animate="{ scale: 1, opacity: 1 }" 
				:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 0.25 }"
			>
				<select v-model="selectedType" 
					class="form-select form-select-lg border-0 text-muted filter w-auto"
				>
					<option value="">Todos os tipos</option>
					<option v-for="type in types" :key="type" :value="type">
						{{ capitalize(type) }}
					</option>
				</select>
			</Motion>

			<Motion asChild
				:initial="{ scale: 0, opacity: 0 }"
				:animate="{ scale: 1, opacity: 1 }" 
				:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 0.5 }"
			>
				<select v-model="selectedRegion" 
				class="form-select form-select-lg border-0 text-muted filter w-auto"
			>
				<option value="">Todas as regiões</option>
				<option v-for="region in regions" :key="region" :value="region">
					{{ capitalize(region) }}
				</option>
				</select>
			</Motion>
		</div>

	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Motion } from 'motion-v' // Lib para animações
import { fetchTypeList, fetchPokedexList } from '../services/pokeapi'

export default {
	emits: ['filter'],

	setup(props, { emit }) {
		const searchQuery = ref('')
		const selectedType = ref('')
		const selectedRegion = ref('')
		const types = ref([])
		const regions = ref([])

		function emitFilter() {
			emit('filter', {
				query: searchQuery.value,
				type: selectedType.value,
				region: selectedRegion.value
			})
		}

		onMounted(async () => {
			types.value = await fetchTypeList()
			regions.value = await fetchPokedexList()
		})

		return {
			searchQuery,
			selectedType,
			selectedRegion,
			types,
			regions,
			emitFilter,
			Motion
		}
	},
	methods: {
		// deixa a primeira letra maiúscula
		capitalize(value) {
			if (!value) return ''
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	components: {
		Motion
	}
}
</script>

<style scoped>
/* estilo da caixa de filtro */
.filter {
	box-shadow: 0 0 20px rgba(138, 138, 138, 0.20);
}

@media (max-width: 768px) {
	.form-select-lg{
		font-size: 1rem;
	}
	.pokemon-input{
		font-size: 1.25rem !important;
	}
}
</style>
