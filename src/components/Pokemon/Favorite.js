import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi} from '../../api/favorite'

export default function Favorite(props) {
    const {id} = props
     
    const [isfavorites, setIsFavorites] = useState(undefined)
    const [reloadCheck, setReloadCheck] = useState(false)
    const Icon = isfavorites ? FontAwesome : FontAwesome5
    console.log(isfavorites)

    useEffect(() => {
        (async() =>{
            try{
                const response = await isPokemonFavoriteApi(id)
                setIsFavorites(response)
            }catch(error){
                setIsFavorites(false)
            }
        })()
    },[id, reloadCheck])



    const onReloadCheckFavorite = () => {
        setReloadCheck((prev) => !prev)
    }


    const addFavorite = async () => {
       await addPokemonFavoriteApi(id)
       try{
        onReloadCheckFavorite()
       }catch(error){
        console.log(error)
       }
    }


    const removeFavorite = async () =>{
       try{
        await removePokemonFavoriteApi(id)
        onReloadCheckFavorite()
       }catch(error){
        console.log(error)
       }
    }

    return (
      
        <Icon
            name='heart'
            color='#fff'
            size={20}
            style={{marginRight: 20}}
            onPress={isfavorites ? removeFavorite : addFavorite}
        />
     
    )
}
