const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const mahasiswaSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Mahasiswa = mongoose.model('Mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa;


