const products = require('../data/product');
const resolvers = {
    Query: {
        products: () => products,
        products:(_,{id})=> products.find(item => item.id === id),
    },
};


module.exports = resolvers;