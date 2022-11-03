import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { PokemonFull } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetail = ({ pokemon }: Props) => {
  return (
    <ScrollView style={{
        ...StyleSheet.absoluteFillObject
    }}>
        {/* Types y peso */}
        <View style={{
            ...styles.container,
            marginTop:370
        }}>
            <Text style={ styles.title }>Types</Text>
            <View>
                <Text style={{
                    ...styles.title,
                    flexDirection:'row'
                }}>
                    { 
                        pokemon.types.map(({type}) => (
                            <Text style={{
                                ...styles.regularText,
                                marginRight:10
                            }} key={type.name}>{type.name}</Text>
                        ))
                    }
                </Text>
            </View>
             {/* Peso */}
            <Text style={ styles.title }>Peso</Text>
            <Text style={ styles.regularText }>{ pokemon.weight }kg</Text>
        </View>
       
        {/* Types */}
        <View 
            style={{
                ...styles.container,
                ...styles.title,
                marginTop:20
            }}>
            <Text style={styles.title}>Sprites</Text>
        </View>
        <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}>
            <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite}/>
            <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite}/>
            <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite}/>
            <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite}/>
        </ScrollView>
        {/* Habilidades */}
        <View style={styles.container}>
            <Text style={ styles.title }>Habilidades basicas</Text>
            <View>
                <Text style={{
                    flexDirection:'row'
                }}>
                    { 
                        pokemon.abilities.map(({ability}) => (
                            <Text style={{
                                ...styles.regularText,
                                marginRight:10
                            }} key={ability.name}>{ability.name}</Text>
                        ))
                    }
                </Text>
            </View>
        </View>
        {/* Movimientos */}
        <View style={styles.container}>
            <Text style={ styles.title }>Movimientos</Text>
            <View>
                <Text style={{
                    flexDirection:'row',
                    flexWrap:'wrap'
                }}>
                    { 
                        pokemon.moves.map(({move}) => (
                            <Text style={{
                                ...styles.regularText,
                                marginRight:10
                            }} key={move.name}>{move.name}</Text>
                        ))
                    }
                </Text>
            </View>
        </View>
         {/* Stats */}
         <View style={styles.container}>
            <Text style={ styles.title }>Stats</Text>
            <View>
                <Text>
                    { 
                        pokemon.stats.map((stat,index) => (
                           <View 
                                key={stat.stat.name + index}
                                style={{flexDirection:'row'}}>
                                 <Text style={{
                                    ...styles.regularText,
                                    marginRight:10,
                                    width:150
                                }}>{stat.stat.name}</Text>
                                <Text style={{
                                    ...styles.regularText,
                                    fontWeight:'bold'
                                }} key={stat.stat.name}>{stat.base_stat }</Text>
                           </View>
                        ))
                    }
                </Text>
            </View>
        </View>
        {/* Sprite final */}
        <View style={{
            marginBottom:20,
            alignItems:'center'
        }}>
            <FadeInImage 
                uri={ pokemon.sprites.front_default }
                style={ styles.basicSprite }
            />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
    title:{
        fontSize:22,
        color:'black',
        fontWeight:'bold',
        marginTop:10
    },
    regularText:{
        fontSize:19,
        color:'black'
    },
    basicSprite:{
        width:100,
        height:100
    }
});
