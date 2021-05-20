import mongodb from "mongodb";
import * as accessDb from '../util/database.js';
    
class Product{   
    constructor(title, price, description, imageUrl, _id){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id;
    }

    async save(){
        const db = accessDb.getDb();
        let dbOp;
         if (this._id) {
            //upadte the product
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})            
         }
         else{
            dbOp = db.collection('products')
            .insertOne(this)
         }

        return dbOp
        .then(res =>{
            console.log(res);
        })
        .catch(err=> console.log(err))      
    }

    static fetchAll(){
        const db = accessDb.getDb();
        return db.collection('products')
        .find().toArray()
        .then(results => {
            return results;
        })
        .catch(err=>console.log(err))
      
    }

    static findProduct(prodctId){
        const db = accessDb.getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(prodctId)}).next()
        .then(result=>{
            return result
        })
        .catch(err=>console.log(err))
    }

    static deleteById(prdctID){
        const db = accessDb.getDb();
        return db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(prdctID)})
        .then(result =>{
            return result;
        })
        .catch(err=>console.log(err));
        
    }
}

export default Product;