const mongoose = require('mongoose');
module.exports.connect = async ()=> {
    try{
     await  mongoose.connect(process.env.MONGODB_URL);
     console.log('Connected to mongodb');
    }
    catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1);
    }
}
