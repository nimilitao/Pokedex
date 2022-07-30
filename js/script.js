const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImg');

const form = document.querySelector('#form');
const input = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');

let searchPokemon  =1;

const fetchPokemon = async (pokemon) => { // conexão com API e busca dos pokemons
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //promise
    console.log(APIResponse);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json(); // função assíncrona: leva um tempo para executar
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){ // se tiver algo no data
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        // não passamos à propriedade com "." pois temos na api a chave "generation-i" onde daria erro, pois o vsCode apontaria o "-i" como fora da chave
        searchPokemon = data.id;
        input.value = "";

        console.log(data)
    }
    else{
        pokemonImage.style.display = 'none'; 
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '404'
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    console.clear();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1)
    {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () =>{
    searchPokemon++;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
