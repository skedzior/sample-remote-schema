const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const {CoinGecko} = require('./services/coinGecko')
const {DeBank} = require('./services/deBank')
const { DefiLlama } = require('./services/defiLlama')

const typeDefs = gql`
  type GeckoChain {
    id: String
    chain_identifier: Int
    name: String
    shortname: String
  }

  type DeBankChain {
    name: String
    wrapped_token_id: String
    id: String
    native_token_id: String
    logo_url: String
    community_id: Int
    usd_value: Int
  }

  type LlamaChain {
    gecko_id: String
    tvl: Int
    name: String
    tokenSymbol: String
    cmcId: String
  }

  type Query {
    getGeckoChains: [GeckoChain]
    getDeBankChain(id:String!):DeBankChain
    getDeBankChains: [DeBankChain]
    getLlamaChain(id:String!): LlamaChain
    getLlamaChains: [LlamaChain]
  }
`;

const resolvers = {
  Query: {
    getGeckoChains: async (_, __, { dataSources }) =>
      dataSources.geckoAPI.getChains(),
    getDeBankChain: async (_, {id}, { dataSources }) =>
      dataSources.deBankAPI.getChain(id),
    getDeBankChains: async (_, __, { dataSources }) =>
      dataSources.deBankAPI.getChains(),
    getLlamaChain: async (_, {id}, { dataSources }) =>
      dataSources.llamaAPI.getChain(id),
    getLlamaChains: async (_, __, { dataSources }) =>
      dataSources.llamaAPI.getChains()
  },
};

const schema = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      geckoAPI: new CoinGecko(),
      deBankAPI: new DeBank(),
      llamaAPI: new DefiLlama()
    };
  }
 });

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

