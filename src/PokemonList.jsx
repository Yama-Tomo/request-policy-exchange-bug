import React, { useState } from 'react';
import { gql, useQuery } from 'urql';

const POKEMONS_QUERY = gql`
  query Pokemons($skip: Int = 0) {
    pokemons(limit: 10, skip: $skip) {
      id
      name
    }
  }
`;

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [result] = useQuery({ query: POKEMONS_QUERY, variables: { skip: offset * 10 } });

  const { data, fetching, error } = result;

  return (
    <div>
      {fetching && <p>Loading...</p>}

      {error && <p>Oh no... {error.message}</p>}

      <div>page: {offset + 1}</div>
      <div>
        <button disabled={offset === 0} onClick={() => setOffset(offset - 1)}>prev</button>
        | 
        <button onClick={() => setOffset(offset + 1)}>next</button>
      </div>

      {data && (
        <ul>
          {data.pokemons.map(pokemon => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
