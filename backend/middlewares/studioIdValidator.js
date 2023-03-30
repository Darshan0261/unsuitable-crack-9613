const { StudioModel } = require("../models/Studio.model");


// Checks if studio id is valid or not saves studio data in req.body
const studioIdValidator = async (req, res, next) => {
    const studio_id = req.params['id'];
    try {
        // Check is studio exists or not
        const studio = await StudioModel.findOne({ _id: studio_id })
        if (studio == null) {
            return res.status(404).send({ message: 'Studio not found' });
        }
        req.body.studio = studio;
        next()
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
}

module.exports = {
    studioIdValidator
}