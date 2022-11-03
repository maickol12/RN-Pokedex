import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon  from 'react-native-vector-icons/Ionicons'
import { FadeInImage } from '../components/FadeInImage'
import { PokemonDetail } from '../components/PokemonDetail'
import { usePokemon } from '../hooks/usePokemon'
import { RootStackParams } from '../navigation/Navigation'

interface Props extends StackScreenProps<RootStackParams,'PokemonScreen'>{};

export const PokemonScreen = ({ route, navigation }:Props) => {
  const { simplePokemon,color } = route.params;
  const { id,name,picture }     = simplePokemon;
  const {isLoading,pokemon}     = usePokemon(id);
  console.log(pokemon)
  return (
    <View style={{flex:1}}>
      {/* Header Container */}
      <View style={{
        ...styles.headerContainer,
        backgroundColor:color
      }}>
        {/* Nombre del pokemon */}
        <Text style={styles.pokemonName}>{ name+"\n" } #{id}</Text>
        {/* Pokebola blanca */}
        <Image 
          source={ require('../assets/pokebola-blanca.png')}
          style={styles.pokeball} />
        <FadeInImage 
          style={styles.pokemonImage}
          uri={picture} />
      </View>
      {/* Detalles y Loading */}
      {
        isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              color={ color }
              size={ 50 }

            />
          </View>
        )
      }
      {
        !isLoading && (
          <PokemonDetail pokemon={pokemon}/>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer:{
      height: 370,
      zIndex: 999,
      alignItems:'center',
      borderBottomRightRadius:1000,
      borderBottomLeftRadius:1000
    },
    textColor:{
      color:'black'
    },
    pokemonName:{
      color:'white',
      fontSize:40,
      alignSelf:'flex-start',
      left:20,
      top: 45
    },
    pokeball:{
      width:250,
      height:250,
      bottom:-20,
      opacity:0.7
    },
    pokemonImage:{
      width:250,
      height:250,
      position:'absolute',
      bottom:-15
    },
    activityIndicator:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
});