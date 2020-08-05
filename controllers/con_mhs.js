const Mahasiswa = require('../model/Mahasiswa')
const errors = [];
const mhs_index = (req, res) => {
    Mahasiswa.find().sort({
            createdAt: -1
        })
        .then((result) => {
            res.render('mahasiswa/index', {
                title: 'mahasiswa',
                mahasiswa: result
            });
        })
        .catch((err) => {
            res.send(err)
        })
}

const mhs_detail = (req, res) => {
    const id = req.params.id;
    Mahasiswa.findById(id)
        .then(result => {
            res.render('mahasiswa/detailMhs', {
                title: 'Profil Mahasiswa',
                mhs: result
            })
        })
        .catch(err => {
            console.log(err)

        })

}

const mhs_create_get = (req, res) => {
    res.render('mahasiswa/tambahData', {
        title: 'Tambah Data'
    })
}
const mhs_delete = (req, res) => {
    const id = req.params.id;
    Mahasiswa.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/mahasiswa'
            })
        })
        .catch(err => {
            console.log(err)

        })

}
const mhs_create = (req, res) => {



    const {
        nama,
        nim,
        jurusan
    } = req.body;

    if (!nama || !nim || !jurusan) {
        res.render('mahasiswa/tambahData', {
            title: 'Tambah Data',
            errors
        });
        errors.push({
            msg: 'Field harus di isi'
        })
    }

    // if (errors.length > 0) {
    //     res.render('mahasiswa/tambahData', {
    //         title: 'Tambah Data',
    //         nama,
    //         nim,
    //         jurusan,
    //         errors
    //     })
    // }

    const mahasiswa = new Mahasiswa({
        nama,
        nim,
        jurusan
    });
    mahasiswa.save()
        .then((result) => {
            req.flash('success_msg', 'Mahasiswa Berhasil ditambahkan');
            res.redirect('/mahasiswa');
        })
        .catch((err) => {
            console.log(err);
        })


}

const mhs_update = (req, res) => {
    const id = req.params.id;

    let update_mahasiswa = req.body


    const {
        nama,
        nim,
        jurusan
    } = update_mahasiswa;

    if (!nama || !nim || !jurusan) {
        res.render('mahasiswa/tambahData', {
            title: 'Tambah Data',
            errors
        });
        errors.push({
            msg: 'Field harus di isi'
        })
    }


    Mahasiswa.findByIdAndUpdate(id, update_mahasiswa)
        .then(result => {
            req.flash('success_msg', 'Mahasiswa Berhasil diupdate');
            res.redirect('/mahasiswa');
        })
        .catch(err => console.log(err))
}


module.exports = {
    mhs_create,
    mhs_detail,
    mhs_index,
    mhs_create_get,
    mhs_delete,
    mhs_update
}