const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const dotenv = require('dotenv');

dotenv.config();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}) 
})

mongoose
    .connect(process.env.MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server runnnig at ${res.url}`)
    })

