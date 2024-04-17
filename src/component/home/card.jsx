import React from 'react'

const Card = ({id,name}) => {
  
    id=id.toString();
    console.log(id);
    var x=id.length;
    while(x<3){
      id='0'+id;
      x++;
    }
    var url="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+id+".png";
  return (
<div
    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="rounded-t-lg h-24 overflow-hidden bg-lime-200">
    </div> 
    <div className="flex w-32 h-32 relative -mt-16 justify-center mx-7">
    <img className="w-31 h-31" src={url} alt="Pokemon"/>
    </div>
    <div className="text-center mt-2">
        <h1 className="font-semibold mb-5">{name}</h1>
    </div>
</div> 

  )
}

export default Card