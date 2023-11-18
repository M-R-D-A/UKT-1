const models = require('../../models/index');
const event = models.event;

module.exports = {
    controllerGetAll: async (req, res) => {
        event.findAll()
            .then(event => {
                res.json({
                    count: event.length,
                    data: event
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    },
    controllerGetByTipeUkt: async (req, res) => {
        event.findAll({
            where: {
                tipe_ukt: req.params.id,
                is_active: true
            }
        })
            .then(event => {
                res.json({
                    count: event.length,
                    data: event
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
            name: req.body.name,
            tanggal: req.body.tanggal,
            tipe_ukt: req.body.tipe_ukt,
            is_active: req.body.is_active
        }
        event.create(data)
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
            id_event: req.params.id
        }
        let data = {
            name: req.body.name,
            tanggal: req.body.tanggal,
            tipe_ukt: req.body.tipe_ukt,
            is_active: req.body.is_active
        }
        event.update(data, { where: param })
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
            id_event: req.params.id
        }
        event.destroy({ where: param })
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