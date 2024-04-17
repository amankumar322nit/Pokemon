import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Card from "../component/home/card";
import Filter from "../component/common/Filter";
import { Context } from "../contextProvider";
import { typeData } from "../Const";

const Home = () => {
  const { ref, inView } = useInView();
  const { search, setSearch } = useContext(Context);
  const [type, setType] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const getAllPokemons = async (props) => {
    const { pageParam } = props;
    var url = "https://pokeapi.co/api/v2/pokemon/";
    const res = await axios({
      url: url,
      params: {
        page: pageParam,
        limit: pageParam * 20,
        offset: pageParam * 20 - 20,
      },
      method: "get",
    });
    if (search.length && res) {
      var ans = [
        {
          name: res.data.name,
          url: "https://pokeapi.co/api/v2/pokemon/" + res.data.id,
        },
      ];
      return ans;
    }
    return res.data.results;
  };
  var { isPending, error, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    {
      queryKey: ["pokemon", { search: search }],
      queryFn: getAllPokemons,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? null : allPages.length + 1;
      },
    }
  );
  useEffect(() => {
    if (search.length) {
      if (typeData.includes(search)) {
        axios
          .get(`https://pokeapi.co/api/v2/type/${search.toLowerCase()}`)
          .then((response) => {
            setPokemons(response.data.pokemon);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
          .then((response) => {
            var pokemon = {
              pokemon: {
                name: response.data.name,
                id: response.data.id,
                url: "https://pokeapi.co/api/v2/pokemon/" + response.data.id,
              },
            };
            const pokemons = [];
            pokemons.push(pokemon);
            setPokemons(pokemons);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    }
  }, [search]);
  useEffect(() => {
    if (type?.length) {
      setSearch(type);
    }
  }, [type]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <>
      <div className="flex flex-col justify-end items-end">
        <Filter setType={setType} />
      </div>
      <div className="sm:mx-10 md:mx-20 lg:mx-40">
        <div className="flex flex-wrap w-full min-w-fit justify-center gap-10 my-10">
          {!search?.length
            ? data?.pages?.map((page) => (
                <div
                  key={page.nextId}
                  className="flex flex-wrap w-full min-w-fit justify-center gap-10"
                >
                  {page?.map((pokemon) => {
                    var name = pokemon.name;
                    name = name.charAt(0).toUpperCase() + name.slice(1);
                    var id = pokemon.url.split("/")[6];
                    return (
                      <div key={id} className="min-w-fit">
                        <Link to={`/${id}`}>
                          <Card id={pokemon.id || id} name={name} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ))
            : pokemons?.map(({ pokemon }) => {
                var name = pokemon.name;
                name = name.charAt(0).toUpperCase() + name.slice(1);
                var url = pokemon.url.split("/")[6];
                return (
                  <div key={url} className="min-w-fit">
                    <Link to={`/${pokemon.id }`}>
                      <Card id={pokemon.id || url} name={name} />
                    </Link>
                  </div>
                );
              })}
        </div>
        {!search?.length && (hasNextPage || isPending) && (
          <div
            ref={ref}
            role="status"
            className="mb-5 flex justify-center align-middle"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
