const dashboardRoute = require('./dashboard');
const productRoute = require('./products');
const systemConfig = require('../../config/system')
module.exports = (app) => {  
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboardRoute);
    app.use(PATH_ADMIN+"/products",productRoute);
}