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
    controllerArray: async (req, res) => {
        try {
            if (!req.body.dataArray || !Array.isArray(req.body.dataArray)) {
                return res.json({
                    message: "Invalid or missing dataArray in the request body"
                });
            }
    
            const dataArray = req.body.dataArray;
            const promises = [];
    
            dataArray.forEach(data => {
                const newData = {
                    id_nilai_sambung: data.id,
                    id_siswa: req.body.id_siswa,
                    green: data.green
                };
    
                const createPromise = gerakan.create(newData);
                promises.push(createPromise);
            });
    
            await Promise.all(promises);
    
            res.json({
                message: "Data has been inserted"
            });
        } catch (error) {
            res.json({
                message: error.message
            });
        }
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