const productsRouter = require('./products');
const homeRouter = require('./home');
module.exports = (app) => {
    
    app.use("/products",productsRouter);
    app.use("/",homeRouter);
}