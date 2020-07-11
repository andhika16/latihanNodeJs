const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Mahasiswa = require('./modules/mahasiswa');
const bodyParser = require('body-parser')





const port = 3000;

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}))
// connect to database
const db_mhs = 'mongodb+srv://andhika:dhika.12345@node-tuts.4yfq2.mongodb.net/daftar_mahasiswa?retryWrites=true&w=majority'
mongoose.connect(db_mhs, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        app.listen(port, () => {
            console.log(`mongodb connection on ${port}`)
        })
    })
    .catch(err => console.log(err))


app.post('/add-mhs', (req, res) => {

    const mahasiswa = new Mahasiswa({
        nama: req.body.nama,
        nim: req.body.nim,
        jurusan: req.body.jurusan

    });
    mahasiswa.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })

    res.redirect('/about')

});

// app.post('/add-mhs', (req, res) => {
//     console.log(req.params);
//     const nama = req.params.nama;
//     const nim = req.params.nim;
//     const jurusan = req.params.jurusan;
//     const data = `your name is ${nama}, and nim ${nim}, and jurusan ${jurusan}`

//     res.write(`nama kamu = ${nama}`);
//     res.write(`nim kamu = ${nim}`);
//     res.write(`jurusan kamu = ${jurusan}`);
//     res.write(data)
//     res.end();

// })

// app.get('/show-mhs', (req, res) => {
//     Mahasiswa.find()
//         .sort({ createdAt: -1 })
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })



// route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });


})


app.get('/details/:id', (req, res) => {
    const id = req.params.id;
    Mahasiswa.findById(id)
        .then(result => {
            res.render('detailMhs', {
                title: 'Profil Mahasiswa',
                mhs: result
            })
        })
        .catch(err => {
            console.log(err)

        })


})

app.get('/about', (req, res) => {

    Mahasiswa.find()
        .then((result) => {
            res.render('about', {
                title: 'About',
                mahasiswa: result
            });
        })
        .catch((err) => {
            res.send(err)
        })


})


app.get('/blogs', (req, res) => {
    res.render('blogs', {
        title: 'Blogs'
    });
})


app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
})