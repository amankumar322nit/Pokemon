import axios from 'axios';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Card from '../component/home/card';


const Home = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/type/')
        .then(function (response) {
          // handle success
          console.log(response.data.results);
          setData(response.data.results)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },[])
  return (
    <div className='flex flex-wrap w-full min-w-fit justify-center gap-10 my-10'>
        {data.map((pokemon,i)=>{
            var name=pokemon.name;
            name=name.charAt(0).toUpperCase()+name.slice(1);
            var url=pokemon.url.split('/')[6];
            return(<div key={i} className='min-w-fit'>
                <Link to={url}>
                <Card id={i+10} name={name}/>
            </Link></div>)
        })}
    </div>
  )
}

export default Home