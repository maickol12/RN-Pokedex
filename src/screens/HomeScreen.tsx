import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import styles from '../theme/appTheme'

export const HomeScreen = () => {
  const { simplePokemonLists,loadPokemons } = usePokemonPaginated();
  return (
    <View style={{backgroundColor:'white'}}>
      <Image
        source={require('../assets/pokebola.png') } 
        style={ styles.pokebolaBG }
        />
      <View 
        style={{alignItems:'center'}}>
        <FlatList 
          data={ simplePokemonLists }
          showsVerticalScrollIndicator={ false }
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={ item } />}
          keyExtractor={(pokemon) => pokemon.id}

          // LIST HEADER 
          ListHeaderComponent={(
            <Text style={ styles.title }>
              Pokedex
            </Text>
          )}
          // INFINITE SCROLL
          onEndReached={ loadPokemons }
          onEndReachedThreshold={ 0.4 }
          ListFooterComponent={(
            <ActivityIndicator 
              style={{height:100}}
              size={ 20 }
              color='gray' />
          )}
        />
      </View>
    </View>
  )
}
