import Detail from '../../views/Detail.vue'

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

// finge os serviços da pokeapi pra nao chamar a api de verdade
vi.mock('../../services/pokeapi', () => ({

  // simula que a funcao fetchPokemonDetail retorna um pokemon simples
  fetchPokemonDetail: vi.fn().mockResolvedValue({
    id: 1, name: 'bulbasaur',
    sprites: {}, moves: [], gameIndices: [], types: [], species: {}
  }),

  // simula que a funcao fetchPokemonSpecies retorna uma descricao simples
  fetchPokemonSpecies: vi.fn().mockResolvedValue({
    description: 'desc', evolution_chain: {}
  }),

  // simula que a funçao fetchEvolutionChain retorna uma linha de evolucao vazia
  fetchEvolutionChain: vi.fn().mockResolvedValue({ chain: {} }),
}))

// TESTES:
describe('Detail.vue (smoke test)', () => {

  // cria um teste que verifica se o componente monta certo e mostra loading
  it('monta a view e mostra o loading inicialmente', () => {

    // monta o componente com algumas configuracoes especiais
    const wrapper = mount(Detail, {
      global: {
        // define dois componentes falsos pra nao quebrar: motion e router-link
        components: {
          Motion: { template: '<div><slot/></div>' },
          'router-link': { template: '<div><slot/></div>' }
        },
        // simula a funcao $t de traducao e o id que vem da rota
        mocks: {
          $t: msg => msg,
          $route: { params: { id: 1 } }
        }
      }
    })

    // verifica se tem um elemento com a classe "loading" logo no começo
    expect(wrapper.find('div.loading').exists()).toBe(true)
  })
})
