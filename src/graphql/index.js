const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground')
const { expressMiddleware  } = require('@apollo/server/express4');
const { loadFiles }  = require('@graphql-tools/load-files')

const resolvers = {
  Query: {
    getProduct: () => ({
      id: '1e212',
      name: 'Azucar',
      description: 'Dulcecita',
      price: 113,
      image: 'https://juanse.dev/logo.png',
      createdAt: new Date().toISOString()
    })
  }
}

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ]
  })
  await server.start()
  app.use(expressMiddleware(server, {
    context: async ({req}) => ({token: req.headers.token})
  }))
}

module.exports = useGraphql
