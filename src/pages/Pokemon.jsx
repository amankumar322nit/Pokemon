import axios from 'axios';
// import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const Pokemon = () => {
    const {id}=useParams();
    const [data,setData]=useState([]);
    useEffect(()=>{
      var url= 'https://pokeapi.co/api/v2/pokemon/'+id;
        axios.get(url)
        .then(function (response) {
          console.log(response.data);
          setData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    },[])
   let imageId=id.toString();
    var x=imageId.length;
    while(x<3){
      imageId='0'+imageId;
      x++;
    }
    var url="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+imageId+".png";
    //var url=`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${imageId}.png`;
  return (
    <div className='flex flex-col justify-center items-center'>
    <img className="w-1/5 h-1/5" src={url} alt="Pokemon"/>
    <div className='flex flex-row justify-center items-center'>
    </div>
    </div>
  )
}

export default Pokemon