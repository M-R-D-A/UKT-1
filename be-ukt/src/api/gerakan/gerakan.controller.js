const models = require('../../models/index');
const gerakan = models.gerakan;

module.exports = {
    controllerGetAll: async (req, res) => {
        gerakan.findAll()
            .then(gerakan => {
                res.json({
                    count: gerakan.length,
                    data: gerakan
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
            id_nilai_sambung: req.body.id_nilai_sambung,
            id_siswa: req.body.id_siswa,
            green: req.body.green
        }
        gerakan.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted"
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
            id_gerakan: req.params.id
        }
        let data = {
            id_nilai_sambung: req.body.id_nilai_sambung,
            id_detail_sambung: req.body.id_detail_sambung,
            green: req.body.green
        }
        gerakan.update(data, { where: param })
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
            id_gerakan: req.params.id
        }
        gerakan.destroy({ where: param })
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