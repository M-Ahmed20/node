import mongoose from 'mongoose'

// field details
let booksSchema = mongoose.Schema({
     bookName: {
        type: String,
        required: true,
        unique:true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
     genre: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: new Date(),
    }
})
// collection Name 
let Books = mongoose.model("books", booksSchema);

// to use this model in our code
export default Books;