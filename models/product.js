import mongoose from 'mongoose';


//constructor for a schema
  const { Schema } = mongoose;


//initialize a new schema/data definition
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        //reference to user who created the product and User model
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

//create and export a model for schema 
 const productModel = mongoose.model('Product', productSchema)
export default productModel




// import * as accessDb from '../util/database.js';
    
// class Product{   
//     constructor(title, price, description, imageUrl, _id, userId){
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = _id;
//         this.userId = userId
//     }

//     async save(){
//         const db = accessDb.getDb();
//         let dbOp;
//          if (this._id) {
//             //upadte the product
//             dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})            
//          }
//          else{
//             dbOp = db.collection('products')
//             .insertOne(this)
//          }

//         return dbOp
//         .then(res =>{
//             console.log(res);
//         })
//         .catch(err=> console.log(err))      
//     }

//     static fetchAll(){
//         const db = accessDb.getDb();
//         return db.collection('products')
//         .find().toArray()
//         .then(results => {
//             return results;
//         })
//         .catch(err=>console.log(err))
      
//     }

//     static findProduct(prodctId){
//         const db = accessDb.getDb();
//         return db.collection('products')
//         .find({_id: new mongodb.ObjectId(prodctId)}).next()
//         .then(result=>{
//             return result
//         })
//         .catch(err=>console.log(err))
//     }

//     static deleteById(prdctID){
//         const db = accessDb.getDb();
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectId(prdctID)})
//         .then(result =>{
//             return result;
//         })
//         .catch(err=>console.log(err));
        
//     }
// }

// export default Product;