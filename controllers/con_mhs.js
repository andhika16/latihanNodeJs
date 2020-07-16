const Mahasiswa = require('../modules/Mahasiswa')

const mhs_index = (req, res) => {
    Mahasiswa.find()
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
    const mahasiswa = new Mahasiswa(req.body);
    mahasiswa.save()
        .then((result) => {
            res.redirect('/mahasiswa')
        })
        .catch((err) => {
            console.log(err);
        })


}

const mhs_update = (req, res) => {
    const id = req.params.id;

    let update_mahasiswa = req.body


    Mahasiswa.findByIdAndUpdate(id, update_mahasiswa)
        .then(result => {
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