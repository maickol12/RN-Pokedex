import { useEffect, useRef, useState } from "react";
import pokemonApi from "../api/pokemonApi";
import { PokemoPaginatedResponse, Result, SimplePokemon } from "../interfaces/pokemonInterfaces";

export const usePokemonPaginated = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonLists, setSimplePokemonLists] = useState<SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
    
    const loadPokemons = async() => {
        setIsLoading( true );
        const resp = await pokemonApi.get<PokemoPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;

        mapPokemoList(resp.data.results);
        setIsLoading( false );
    }

    const mapPokemoList = ( pokemonList: Result[] ) => {
        const newPokemonList: SimplePokemon[] = pokemonList.map(({name,url}) => {
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {id,picture,name}
        });
        setSimplePokemonLists([...simplePokemonLists,...newPokemonList]);
    }

    useEffect(() => {
        loadPokemons();
    }, []);
    
    return {
        isLoading,
        simplePokemonLists,
        loadPokemons
    }
}
