import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceValue } from '../hooks/useDebounceValue';

interface Props{
    onDebounce: (value: string) => void;
    style?:  StyleProp<ViewStyle>
}

export const SearchInput = ({ style,onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('');
    const { debounceValue }                     = useDebounceValue(textValue);
   

    useEffect(() => {
        onDebounce(debounceValue);
    }, [debounceValue])
    

    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
            <View style={ styles.textBackground }>
                <TextInput
                    placeholder='Buscar pokemon'
                    style={{
                        ...styles.textInput,
                        top:(Platform.OS === 'android') ? 0 : 2,
                        color:'black'
                    }}
                    autoCapitalize='none'
                    autoCorrect={ false }
                    placeholderTextColor={'grey'}
                    value={textValue}
                    onChangeText={ setTextValue }
                    
                />
                <Icon
                    name='search'
                    color={'grey'}
                    size={ 30 }/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{

    },
    textBackground:{
        backgroundColor:'#F3F1F3',
        borderRadius:50,
        height:50,
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput:{
        flex:1,
        fontSize:18
    }
});