const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImg');

const form = document.querySelector('#form');
const Search = document.querySelector('.InputSearch');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //promise
    
    const data = await APIResponse.json(); // função assíncrona: leva um tempo para executar

    console.clear();
    console.log(data)
    return data;
}

const renderPokemon = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    // não passamos à propriedade com "." pois temos na api a chave "generation-i" onde daria erro, pois o vsCode apontaria o "-i" como fora da chave
    console.log(data)
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    console.log('enviando formulário...')
    console.log(Search);
});

renderPokemon('1');