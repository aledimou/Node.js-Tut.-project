import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId:{
                //this will store a reference to a product
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
          }
        ]
    }
})

export default mongoose.model("User", userSchema)

// class User{
//     constructor(username, email, cart, _id){
//         this.name = username;
//         this.email = email;
//         this.cart = cart; // {items: []}
//         this._id = _id;
//     }

//     save(){
//         const db = accessDb.getDb();
//         return db.collection('users').insertOne(this)    
//     }

//      addtoCart(product){
//         const cartProductIndex = this.cart.items.findIndex(p=>{
//             return p.productId.toString() === product._id.toString()
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;          
//         }else{
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectId(product._id),
//                 quantity: newQuantity
//             });
//         }

//         const updatedCart = {
//             items: updatedCartItems
//                 };
//         const db = accessDb.getDb();
//         return db.collection('users')
//         .updateOne({_id: new mongodb.ObjectId(this._id) },
//         {$set: {cart: updatedCart} });
//     }


//     getCartItems(){
//         const db = accessDb.getDb();
 
//         const productIds = [];
//         const quantities = {};
    
//         this.cart.items.forEach((ele) => {
//             let prodId = ele.productId;
    
//             productIds.push(prodId);
//             quantities[prodId] = ele.quantity;
//         });
 
//         return db
//             .collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then((products) => {
//                 return products.map((p) => {
//                     return { ...p, quantity: quantities[p._id] };
//                 });
//             });
//     }

//     deleteCartItem(productId){
//         const updatedCartItems = this.cart.items.filter(ele =>{
//             return ele.productId.toString() !== productId.toString()
//         })
//         const db = accessDb.getDb();
//         return db.collection('users')
//         .updateOne({_id: new mongodb.ObjectId(this._id) },
//         {$set: {cart: {items: updatedCartItems}} });
        
//     }

//      addOrder(){
//         const db = accessDb.getDb();
//         return db.collection('orders').insertOne(this.cart)
//         .then(result =>{
//             console.log(result);
//             this.cart = {items: [] };
//             return db.collection('users')
//             .updateOne({_id: new mongodb.ObjectId(this._id) },
//             {$set: {cart: {items: []}} });
//         })
//         .catch(err=>console.log(err));
//     }

//     static findById(userId){
//         const db = accessDb.getDb();
//         return db.collection('users')
//         .find({_id: new mongodb.ObjectId(userId)}).next()
//         .then(result=>{
//             return result
//         })
//         .catch(err=>console.log(err))
//     }
// }

//  export default User;