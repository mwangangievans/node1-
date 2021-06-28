const mongoose =require('mongoose');


module.exports = () =>{
    mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log('mongodb connected...');
    }).catch(err=> console.log(err.message));
    
    mongoose.connection.on('error', (err)=>{
        console.log(err.message);
    })
    
    mongoose.connection.on('connected', () =>{
        console.log('mongoose connected to db...');
    });
    
    mongoose.connection.on('disconnected', () =>{
        console.log('mongoose connection is disconnected...');
    });
    
    process.on('SIGINT',() =>{
        mongoose.connection.close(()=>{
            console.log('Mongoose connection is disconnected due to app termination...');
        process.exit(0);
    });
    });
 
      
}