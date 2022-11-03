import { useEffect, useRef, useState } from "react";
import pokemonApi from "../api/pokemonApi";
import { PokemoPaginatedResponse, Result, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonSearch = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [simplePokemonLists, setSimplePokemonLists] = useState<SimplePokemon[]>([]);
    
    const loadPokemons = async() => {
        const resp = await pokemonApi.get<PokemoPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemoList(resp.data.results);
        setIsFetching( false );
    }

    const mapPokemoList = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name,url}) => {
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {id,picture,name}
        });
        setSimplePokemonLists(newPokemonList);
    }

    useEffect(() => {
        loadPokemons();
    }, []);
    
    return {
        isFetching,
        simplePokemonLists,
        loadPokemons
    }
}
