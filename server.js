const server = require('./app')
const redis = require('./src/redis')
const sequelize = require('./src/config/db')
const configApp = require('./config.app')

const stratServre = ()=>{
    try {
        sequelize.authenticate()
        .then(()=>{
            console.log('connect to DB is ok');
            
        })
        .catch((error)=>{
            console.log(error);
            
        })
        redis.ping()
            .then(()=>{
                console.log('connect to REDIS is ok');
                
            })
            .catch((error)=>{
                console.log(error);
                
            })
        server.listen(configApp.server.port, ()=>{
            console.log('server is running');
            
        })
    } catch (error) {
        process.exit(1)
    }

}

stratServre()