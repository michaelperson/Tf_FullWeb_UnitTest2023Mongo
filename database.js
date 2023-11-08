const mongoose = require('mongoose');

let mongoServer;

const connect = async () => {
    let dbConnexion;

    if(process.env.NODE_ENV === 'test') {
        const {MongoMemoryServer} = require('mongodb-memory-server');
        
        // Base donnée MongoDB "Memoire" pour les tests
        mongoServer = await MongoMemoryServer.create();
        dbConnexion = mongoServer.getUri();
    }
    else {
        mongoServer = null;
        dbConnexion = process.env.DB_CONNEXION;
    }

    try {
        await mongoose.connect(dbConnexion, { useNewUrlParser: true, useUnifiedTopology: true})
    }
    catch(err) {
        console.log(err);
        process.exit();
    }
};

const disconnect = async () => {
    await mongoose.disconnect();
    await mongoServer?.stop();
};

module.exports = {connect, disconnect};