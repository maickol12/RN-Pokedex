import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ( {pokemon} : Props) => {
    const navigation = useNavigation();
    const [bgColor, setbgColor] = useState('grey');
    const isMounted             = useRef(true);
    useEffect(() => {
        ImageColors.getColors(pokemon.picture,{ fallback:'grey' })
        .then(colors => {
            if( !isMounted.current ) return;
             if(colors.platform === 'android'){
                 setbgColor( colors.dominant || 'grey' );
             } else if(colors.platform === 'ios') {
                 setbgColor( colors.background || 'grey' );
 
             }
        });
        return () => {
            isMounted.current = false;
        }
    }, [])
    
    const navigateTo = () => {
        navigation.navigate('PokemonScreen',{simplePokemon:pokemon,color:bgColor});
    }

    return (
        <TouchableOpacity 
            activeOpacity={0.9}
            onPress={ navigateTo } >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth*0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y ID */}
                <View>
                    <Text style={styles.name}>
                        { pokemon.name }
                        { '\n#'+pokemon.id }
                    </Text>
                </View>
                <View style={ styles.pokebolaContainer }>
                    <Image 
                        style={ styles.pokebola }
                        source={ require('../assets/pokebola-blanca.png') }
                    />
                </View>
                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        marginHorizontal:10,
        height: 120,
        width:160,
        marginBottom:25,
        borderRadius:10,
        elevation:5,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51
    },
    name:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        top: 20,
        left: 10
    },
    pokebola:{
        width:100,
        height:100,
        position:'absolute',
        right:-8,
        bottom:-8,
        overflow:'hidden'
    },
    pokebolaContainer :{
        width:100,
        height:100,
        position:'absolute',
        bottom:-20,
        right:-20,
        opacity:0.5,
        overflow:'hidden'
    },
    pokemonImage:{
        width:120,
        height:120,
        position:'absolute',
        right:-8,
        bottom: -5,
        shadowColor: "#000"
    }
});