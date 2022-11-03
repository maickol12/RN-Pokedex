import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { PokemonCard } from '../components/PokemonCard'
import { SearchInput } from '../components/SearchInput'
import { usePokemonSearch } from '../hooks/usePokemonSearch'
import styles from '../theme/appTheme'
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces'

const width = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { isFetching,simplePokemonLists } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if( term.length === 0 ){
      return setPokemonFiltered([]);
    }
    setPokemonFiltered(
      simplePokemonLists.filter(el => {
        if( isNaN( Number(el.id) ) ){
          return el.name.toLowerCase().includes(term.toLowerCase());
        }else{
          return el.id === term;

        }
      })
    )
  }, [term]);
  
  if( isFetching ){
    return <Loading />
  }

  return (
    <View style=
        {{ 
          flex:1,
          marginHorizontal: 20,
          marginTop:20
        }}>
        <SearchInput 
          onDebounce={ setTerm }
          style={{
            position:'absolute',
            zIndex:999,
            width: width - 40
          }}/>
        <FlatList
          data={ pokemonFiltered }
          showsVerticalScrollIndicator={ false }
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={ item } />}
          keyExtractor={(pokemon) => pokemon.id}

          // LIST HEADER 
          ListHeaderComponent={(
            <Text style={{
              ...styles.title ,
              marginTop:60
            }}>
              { term }
            </Text>
          )}
        />
    </View>
  )
}


const lStyles = StyleSheet.create({
    activityContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
});