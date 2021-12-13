
// console.log("inside index file");

// for (var i = 0; i < 100; i++) {
//     console.log(i);
// }

// console.log('loop finished again');























// import React from 'react';
// var React = require('react');

// var http = require('http');

// http.createServer(function (req, res) {

//     if (req.url === '/login') {
//         res.end('Login route working fine');
//     }
//     else if (req.url === '/signup') {
//         res.end('signup route working fine');
//     }
//     else {
//         res.end("Hello World");
//     }

// }).listen(4000);































































// import express from 'express';

// const app = express();

// app.use((req, res, next) => {
//     // console.log(req.url);
//     next();
// });

// app.get("/signup", (req, res, next) => {
//     console.log('inside signup ');
//     res.end('Signup run');
// });

// app.use((req, res) => {
//     console.log('inside second middleware 1');
//     res.end();
// })

// app.listen(7000, () => {
//     console.log('=================== server started on 7000 ===================');
// });
















































































import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js'
import morgan from 'morgan';
import cors from 'cors';
import Books from './models/books.js';
import User from './models/user.js';
import bcrypt from 'bcrypt';

const app = express();

mongoose.connect('mongodb+srv://testing:1234567890@cluster0.x5kx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
    console.log('=================== ISI Secrete Database Connected ===================');
});
mongoose.connection.on('error', () => {
    console.log('=================== Black Vigo is outside your home ===================');
});


app.use(cors());

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('tiny'));

app.post('/add-student', async (req, res) => {
        console.log(req.body);
        let book = new Books({
            bookName: req.body.bookName,
            author: req.body.author,
            price: req.body.price,
            genre:req.body.genre
        });
        try {
            let savedData = await book.save();
            res.json(savedData);
        } catch (e) {
            console.log(e);
            res.json(e);
        }
});
app.get('/get-all-books', async  (req, res) => {
    console.log(req.url);
    let allBooks = await Books.find().limit(3) ; // returns array
    res.json(allBooks);
    console.log( res(allBooks))
});
app.get('/get-one-book/:bookName', async (req, res) => {
    let { bookName } = req.params;
    console.log(bookName);
    let allBooks = await Books.findOne({ bookName: bookName }); // returns one object
    res.json(allBooks);
});

app.post('/update-book/:bookName', async (req, res) => {
    let { bookName } = req.params;
    // console.log(req.body, id);
    let updated = await Books.findOneAndUpdate({ bookName: bookName },
        { price: req.body.price });
    res.json(updated);
});

app.post('/delete-book/:bookName', async (req, res) => {
    let { bookName } = req.params;
    // console.log(req.body, id);
    let deleted = await Books.findOneAndDelete({ bookName: bookName })
    res.json(deleted);
});

async function makeHashedPassword(password){
    let SALT_ROUND=10
    try {
        let hashedPasword=await bcrypt.hash(password,SALT_ROUND)
        return hashedPasword
    } catch (error) {
console.error(error);        
    }
}

app.post("/signup",async(req,res,next)=>{
    console.log(req.body)
    const{email,password,username}=req.body
    let hashedPassword=await makeHashedPassword(password)
    let user = new User({
        email,
        password:hashedPassword,
        username
    })
    try{
let savedUser=await user.save()
res.json(savedUser)
    }catch(e){
res.json(e)
    }
})






// app.get('/get-student/:studentName', async (req, res) => {
//     let { studentName } = req.params;
//     console.log(studentName);
//     let allStudents = await Student.find({ studentName: studentName }); // returns array
//     res.json(allStudents);
// });



// app.get('/get-student-pagination/:pageNumber/:studentPerPage', async (req, res) => {
//     let { pageNumber, studentPerPage } = req.params;
//     console.log(pageNumber, studentPerPage)
//     let skipCount = (pageNumber - 1) * studentPerPage;
//     let allStudents = await Student.find().limit(Number(studentPerPage)).skip(skipCount); // returns array
//     res.json(allStudents);
// });


// app.post('/add-student', async (req, res) => {
//     console.log(req.body);
//     let student = new Student({
//         studentName: req.body.stName,
//         email: req.body.emailAddress,
//         rollNumber: req.body.rollNum
//     });
//     try {
//         let savedData = await student.save();
//         res.json(savedData);
//     } catch (e) {
//         console.log(e);
//         res.json(e);
//     }



    // student.save(function (e, savedData) {
    //     if (express) {
    //         res.json(e);
    //     }
    //     else {
    //         res.json(savedData);
    //     }
    // })

    // student.save()
    //     .then((savedData) => {
    //         res.json(savedData);
    //     })
    //     .catch((e) => {
    //         res.json(e);
    //     })

// })

// app.use((req, res) => {
//     console.log(req.body, '***************');
//     res.end();
// });

app.listen('1000', () => {
    console.log('=================== server started on 1000 ===================');
});
