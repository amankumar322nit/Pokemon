import React from 'react'

const Card = ({id,name}) => {
    var url=`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  return (
// {/* <div className="w-full max-w-sm bg-white border px-10 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//     <div className="flex flex-col items-center pb-10">
//         <img className="w-24 h-24 my-3" src={url} alt="Bonnie image"/>
//         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
//     </div>
// </div>  */}
<div
    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="rounded-t-lg h-24 overflow-hidden bg-lime-200">
        {/* <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    */}
    </div> 
    <div className="flex mx-auto w-32 h-32 relative -mt-16 justify-center mx-7">
    <img className="w-28 h-28 my-3" src={url} alt="Pokemon"/>
    </div>
    <div className="text-center mt-2">
        <h1 className="font-semibold mb-5">{name}</h1>
    </div>
</div> 

  )
}

export default Card