const nome_pokemon = document.querySelector('.nome_pokemon')
const number_pokemon = document.querySelector('.id_pokemon')
const img_pokemon = document.querySelector('.img_pokemon')
const form = document.querySelector('.form')
const input__search = document.querySelector('.input__search')
const bnt_prev = document.querySelector('.bnt-prev')
const bnt_next = document.querySelector('.bnt-next')


const fetchpokemon = async (pokemon) => {

    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)

    if (fetchResponse.status === 200){
        const dados = await fetchResponse.json() //tambem demora, precisamos do await
        return dados
    }else{
        alert("Verfique a consulta")
        renderPokemon('1')
    }

}

const renderPokemon = async (pokemon) => {
    nome_pokemon.innerHTML = 'Loading...'

    const data = await fetchpokemon(pokemon)

    if(data){
        nome_pokemon.innerHTML = data.name
        number_pokemon.innerHTML = data.id
        img_pokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input__search.value = ''
    }else{
        number_pokemon.innerHTML = ''
        img_pokemon.src = "#"
        nome_pokemon.innerHTML = 'Not Found'
        input__search.value = ''
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    renderPokemon(input__search.value)

})

bnt_prev.addEventListener('click',()=>{
    console.log(number_pokemon.innerHTML)
    if(number_pokemon.innerHTML == 1){
        alert("Este é o primeiro Pokémon")
    }else{
        renderPokemon((number_pokemon.innerHTML -1).toString())
    }
})

bnt_next.addEventListener("click",()=>{
    renderPokemon(String(Number(number_pokemon.innerHTML)+1))
})

renderPokemon('1')
