<script>
    import Filter from '../components/Filter.vue';
    import PokemonCard from '../components/PokemonCard.vue';

    export default {
        components: {
            PokemonCard,
            Filter
        }
    }
</script>
<template>
    <h1>Componente principal</h1>
    <Filter />
    <PokemonCard />
</template>