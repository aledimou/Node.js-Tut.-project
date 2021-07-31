import mongodb from "mongodb";


const MongoClient = mongodb.MongoClient;

let _db;


const client = new MongoClient("mongodb+srv://alexis:RWDHuOJXLtyHSXEt@cluster01.nk0bi.mongodb.net/Cluster01?retryWrites=true&w=majority", { useUnifiedTopology: true });

export const connectDB = async () =>{
    try {


        await client.connect();
        console.log("Connected correctly to Cluster");
        _db = client.db();
    } catch (err) {
        console.log(err.stack);
    }
    
}



export const getDb = ()=>{
    if (_db) {
        return _db
    }
    throw "No database found"
}


