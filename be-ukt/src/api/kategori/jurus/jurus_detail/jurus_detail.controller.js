const models = require('../../../../models/index');
const jurus_detail = models.jurus_detail;

module.exports = {
    controllerGetAll: async (req, res) => {
        jurus_detail.findAll()
            .then(jurus_detail => {
                res.json({
                    count: jurus_detail.length,
                    data: jurus_detail
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerSearch: async (req, res) => {
        jurus_detail.findAll({
            include: [
                {
                    model: models.siswa,
                    as: "jurus_siswa",
                    attributes: ['nomor_urut', 'name'],
                    where: {
                        [Op.or]: [
                            { name: { [Op.like]: `%${req.params.id}%` } },
                            { nomor_urut: { [Op.like]: `%${req.params.id}%` } }
                        ]
                    }
                },
            ]
        })
            .then(result => {
                res.json({
                    count: result.length,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByTipeUkt: async (req, res) => {
        jurus_detail.findAll({
            where: {
                tipe_ukt: req.params.id
            },
            attributes: ['id_jurus_detail', 'id_event', 'id_siswa', 'tipe_ukt'],
            include: [
                {
                    model: models.siswa,
                    attributes: ['name'],
                    as: "jurus_siswa",
                },
                {
                    model: models.jurus_siswa,
                    attributes: ['id_jurus', 'predikat'],
                    as: "siswa_jurus_detail",
                    include: [
                        {
                            model: models.jurus,
                            attributes: ['name'],
                            as: "jurus"
                        }
                    ]
                }
            ]
        })
            .then(jurus => {
                res.json({
                    count: jurus.length,
                    data: jurus
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetTotalPage: async (req, res) => {
        const limit = Number(req.params.limit);
        jurus_detail.findAll({
            where: {
                id_event: req.params.id
            },
            attributes: ['id_jurus_detail']
        })
            .then(result => {
                const totalPages = Math.ceil(result.length / limit);
                res.json({ totalPages });
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByEventUkt: async (req, res) => {
        const { id, page, limit } = req.params;
        const pageNumber = Number(page);
        const itemsPerPage = Number(limit);

        const offset = (pageNumber - 1) * itemsPerPage;
        jurus_detail.findAll({
            where: {
                id_event: id,
            },
            attributes: ['id_jurus_detail', 'id_penguji', 'id_event', 'id_siswa', 'tipe_ukt'],
            include: [
                {
                    model: models.siswa,
                    attributes: ['name', 'nomor_urut'],
                    as: "jurus_siswa",
                },
                {
                    model: models.penguji,
                    attributes: ['name'],
                    as: "penguji_jurus"
                },
                {
                    model: models.jurus_siswa,
                    attributes: ['id_jurus', 'predikat'],
                    as: "siswa_jurus_detail",
                    required: true,
                    include: [
                        {
                            model: models.jurus,
                            attributes: ['name'],
                            as: "jurus"
                        }
                    ]
                }
            ],
            limit: itemsPerPage,
            offset: offset
        })
            .then(jurus => {
                res.json({
                    count: jurus.length,
                    data: jurus
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByIdSiswa: async (req, res) => {
        jurus_detail.findAll({
            attributes: ['id_jurus_detail', 'id_siswa', 'id_jurus', 'predikat'],
            where: {
                id_siswa: req.params.id
            },
            include: [
                {
                    model: models.jurus,
                    attributes: ['name', 'tipe_ukt'],
                    as: "siswa_jurus",
                    required: false
                }
            ]
        })
            .then(jurus => {
                console.log(jurus[0].predikat)
                const nilai = []
                for (let i = 0; i < jurus.length; i++) {
                    if (jurus[i].predikat == true) {
                        nilai.push('true');
                    }
                }
                console.log(nilai.length);
                res.json({
                    count: jurus.length,
                    jurus_benar: nilai.length,
                    data: jurus
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
        jurus_detail.create(data)
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
            id_jurus_detail: req.params.id
        }
        let data = {
            id_penguji: req.body.id_penguji,
            id_event: req.body.id_event,
            id_siswa: req.body.id_siswa,
            tipe_ukt: req.body.tipe_ukt
        }
        jurus_detail.update(data, { where: param })
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
            id_jurus_detail: req.params.id
        }
        jurus_detail.destroy({ where: param })
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