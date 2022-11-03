import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from '../screens/SearchScreen';
import { Navigation } from './Navigation';
import { Platform } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { PokemonScreen } from '../screens/PokemonScreen';
import { createStackNavigator } from '@react-navigation/stack';



export type RootStackParams = {
  HomeScreen: undefined, 
  PokemonScreen: { simplePokemon: SimplePokemon, color: string }
}

const Tab2 = createStackNavigator<RootStackParams>();


export const Tab2Screen = () => {
  return (
    <Tab2.Navigator
        screenOptions={{
            headerShown:false,
            cardStyle:{
                // backgroundColor:'white'
            }
        }}>
      <Tab2.Screen name="HomeScreen"    component={ SearchScreen } />
      <Tab2.Screen name="PokemonScreen" component={ PokemonScreen } />
    </Tab2.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor:'white'
        }}
        screenOptions={{
          headerShown:false,
          tabBarActiveTintColor:'#5856D6',
          tabBarLabelStyle:{
            marginBottom:( Platform.OS === 'ios') ? 0 : 10
          },
          tabBarStyle:{
            position:'absolute',
            backgroundColor:'rgba(255,255,255,0.92)', 
            borderWidth:0,
            elevation:0,
            height: ( Platform.OS === 'ios' ) ? 80 : 60
          }
        }}
      >
      <Tab.Screen 
        name="PokemonScreenTab" 
        component={Navigation}
        options={{
          tabBarLabel:'Listado',
          tabBarIcon: ({color}) => (
            <Icon 
              color={ color } 
              size={25}
              name={'list'} />
          )
        }} />
      <Tab.Screen 
        name="SearchScreen" 
        component={ Tab2Screen }
        options={{
          tabBarLabel:'Listado',
          tabBarIcon: ({color}) => (
            <Icon 
              color={ color } 
              size={25}
              name={'search'} />
          )
        }} />
    </Tab.Navigator>
  );
}


export default Tabs;