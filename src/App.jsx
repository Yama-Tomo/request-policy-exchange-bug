import React from 'react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { requestPolicyExchange } from '@urql/exchange-request-policy';

import PokemonList from './PokemonList';

const client = new Client({
  url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
  exchanges: [requestPolicyExchange({ ttl: 5000 }), cacheExchange, fetchExchange],
});

function App() {
  return (
    <Provider value={client}>
      <PokemonList />
    </Provider>
  );
}

export default App;
