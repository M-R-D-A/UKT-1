const models = require('../../../../models/index');
const belati_detail = models.belati_detail;

module.exports = {
    controllerGetAll: async (req, res) => {
        belati_detail.findAll()
            .then(belati_detail => {
                res.json({
                    count: belati_detail.length,
                    data: belati_detail
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByTipeUkt: async (req, res) => {
        belati_detail.findAll({
            where: {
                tipe_ukt: req.params.id
            },
            attributes: ['id_belati_detail', 'id_penguji', 'id_event', 'id_siswa', 'tipe_ukt'],
            include: [
                {
                    model: models.siswa,
                    attributes: ['name'],
                    as: "belati_siswa",
                },
                {
                    model: models.penguji,
                    attributes: ['name'],
                    as: "penguji_belati"
                },
                {
                    model: models.belati_siswa,
                    attributes: ['id_belati', 'predikat'],
                    as: "siswa_belati_detail",
                    include: [
                        {
                            model: models.belati,
                            attributes: ['name'],
                            as: "siswa_belati"
                        }
                    ]
                }
            ]
        })
            .then(belati => {
                res.json({
                    count: belati.length,
                    data: belati
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByUktEvent: async (req, res) => {
        belati_detail.findAll({
            where: {
                tipe_ukt: req.params.id,
                id_event: req.params.event
            },
            attributes: ['id_belati_detail', 'id_penguji', 'id_event', 'id_siswa', 'tipe_ukt'],
            include: [
                {
                    model: models.siswa,
                    attributes: ['name', 'nomor_urut'],
                    as: "belati_siswa",
                },
                {
                    model: models.penguji,
                    attributes: ['name'],
                    as: "penguji_belati"
                },
                {
                    model: models.belati_siswa,
                    attributes: ['id_belati', 'predikat'],
                    as: "siswa_belati_detail",
                    required: true,
                    include: [
                        {
                            model: models.belati,
                            attributes: ['name'],
                            as: "siswa_belati"
                        }
                    ]
                }
            ]
        })
            .then(belati => {
                res.json({
                    count: belati.length,
                    data: belati
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByIdSiswa: async (req, res) => {
        belati_detail.findAll({
            attributes: ['id_belati_detail', 'id_siswa', 'id_belati', 'predikat'],
            where: {
                id_siswa: req.params.id
            },
            include: [
                {
                    model: models.belati,
                    attributes: ['name', 'tipe_ukt'],
                    as: "siswa_belati",
                    required: false
                }
            ]
        })
            .then(belati => {
                console.log(belati[0].predikat)
                const nilai = []
                for (let i = 0; i < belati.length; i++) {
                    if (belati[i].predikat == true) {
                        nilai.push('true');
                    }
                }
                console.log(nilai.length);
                res.json({
                    count: belati.length,
                    belati_benar: nilai.length,
                    data: belati
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerAdd: async (req, res) => {
        let data = {
            id_penguji: req.body.id_penguji,
            id_event: req.body.id_event,
            id_siswa: req.body.id_siswa,
            tipe_ukt: req.body.tipe_ukt
        }
        belati_detail.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted",
                    data: result,
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerEdit: async (req, res) => {
        let param = {
            id_belati_detail: req.params.id
        }
        let data = {
            id_penguji: req.body.id_penguji,
            id_event: req.body.id_event,
            tipe_ukt: req.body.tipe_ukt,
            name: req.body.name
        }
        belati_detail.update(data, { where: param })
            .then(result => {
                res.json({
                    message: "data has been updated"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerDelete: async (req, res) => {
        let param = {
            id_belati_detail: req.params.id
        }
        belati_detail.destroy({ where: param })
            .then(result => {
                res.json({
                    massege: "data has been deleted"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
}