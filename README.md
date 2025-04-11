<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=40&pause=1000&color=FAFAFA&center=true&vCenter=true&width=435&lines=%F0%9F%8E%AE+VueDex" />
</h1>

**VueDex** é uma aplicação web desenvolvida com Vue.js 3, TypeScript e Vite, que simula uma Pokédex interativa e moderna. Ela consome dados da PokéAPI para listar, filtrar e exibir detalhes completos dos Pokémon de forma responsiva, com animações suaves e acessibilidade garantida.

---

# 🚀 Tecnologias Utilizadas

## <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" height="45" />

Framework JavaScript progressivo utilizado para construir a interface do projeto. O Vue.js 3 oferece reatividade avançada, composição de componentes e uma curva de aprendizado amigável, ideal para criar interfaces ricas com facilidade.

## <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" height="45" />

Na vuedex, o javascript é usado junto com typescript pra controlar o comportamento da aplicação, buscar e tratar os dados da pokéapi, gerenciar o estado global com vuex, controlar a navegação com vue router e aplicar animações com motion one. ele também é responsável por lidar com eventos, lógica de exibição, filtros, e interações nos componentes vue, garantindo que a pokédex funcione de forma dinâmica e responsiva.

## <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="45" />

Ferramenta de build moderna, rápida e otimizada, usada para criar e executar o ambiente de desenvolvimento da VueDex. O Vite proporciona uma experiência de desenvolvimento extremamente ágil com recarregamento instantâneo.

## <img src="https://img.shields.io/badge/Vuex-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" height="45" />

Gerenciador de estado utilizado para compartilhar dados entre componentes. A VueDex usa Vuex para armazenar e atualizar a lista de Pokémon, filtros e configurações globais da aplicação.

## <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" height="45" />

Pré-processador CSS usado para estilização da interface. O SCSS permite criar estilos modulares, reutilizáveis e organizados.

## <img src="https://img.shields.io/badge/Motion_One-000000?style=for-the-badge&logo=motion&logoColor=white" height="45" />

Biblioteca leve de animações utilizada para aplicar transições suaves entre componentes, especialmente nos cards de Pokémon e páginas de detalhe.

---

# 📦 Bibliotecas Complementares

### **Vue Router** 🔁  
**Uso**: Gerencia as rotas da aplicação e navegação entre páginas.  
**Funcionalidade**: Permite navegação entre lista de Pokémon, página de detalhes e página de erro personalizada.

### **i18n** 🌍  
**Uso**: Implementa suporte à internacionalização.  
**Funcionalidade**: Exibe os nomes dos Pokémon no idioma do usuário, baseado nos dados da PokéAPI.

### **PokéAPI** 🐱‍🏍  
**Uso**: API pública utilizada como fonte de dados oficial.  
**Funcionalidade**: Fornece todas as informações dos Pokémon: imagens, tipos, habilidades, status, descrições e mais.

---

# ⚙️ Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/vuedex.git
cd vuedex
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar o projeto localmente

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

# 🧩 Funcionalidades

### **Scroll Infinito**:
- Os Pokémon são carregados aos poucos conforme o usuário rola a tela, evitando sobrecarga na página.

##

### **Filtro por Tipo**:
- Filtre Pokémon por tipo (água, fogo, planta, etc.) diretamente na barra superior.

##
  
### **Página de Detalhes**:
- Ao clicar em um Pokémon, o usuário visualiza detalhes completos com animações em cadeia (nome, descrição, tipos, habilidades, altura, peso e status).

##
  
### **Animações com Motion Vue**:
- As transições entre elementos são suaves e fluidas, melhorando a experiência do usuário.

##
  
### **Acessibilidade e Responsividade**:
- Projeto responsivo e com boas práticas de acessibilidade aplicadas.

##
  
### **Internacionalização**:
- A VueDex traduz a página de descrições dos Pokémon dinamicamente com base no idioma configurado.

---

# 📁 Estrutura do Projeto

```
src/
├── assets/               # Imagens, ícones e estilos globais
├── components/           # Componentes reutilizáveis (cards, filtros, loaders)
├── views/                # Páginas principais (Home, Detail, Error)
├── router/               # Configuração das rotas com Vue Router
├── store/                # Gerenciamento de estado global com Vuex
├── i18n/                 # Internacionalização (idiomas)
├── services/             # Serviços HTTP para consumo da PokéAPI
└── App.vue               # Componente raiz da aplicação
```

---

# 📸 Demonstração

<img align="center" src="https://github.com/RecheEduardo/VueDex/blob/main/public/poke_example.png?raw=true" />

---

# 🤝 Contribuição
1. Faça um fork do repositório.

2. Crie um novo branch:
   ```bash
   git checkout -b minha-funcionalidade
   ```

3. Commit suas alterações:
   ```bash
   git commit -m "Minha funcionalidade"
   ```

4. Faça o push para o branch:
   ```bash
   git push origin minha-funcionalidade
   ```

5. Pronto! Já pode abrir seu Pull Request.

---

<h3 align="center">🙌 É isso! Caso tenha gostado do repositório, não se esqueça de dar uma olhada no meu perfil ❤</h3>

