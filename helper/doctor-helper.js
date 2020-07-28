var mongoose = require("mongoose");

const doctorHelper = {
    params: (specializations, name) => {
        var params = {
            specializations: specializations ? { $all: [mongoose.Types.ObjectId(specializations)] } : null,
            "user.fullName": { "$regex": name, "$options": "i" },
            "user.isActive": true
        }
        if (!params['specializations']) {
            delete params['specializations'];
        }
        if (!params['user.fullName'].$regex) {
            delete params['user.fullName'];
        }
        return params;
    },


};
module.exports = doctorHelper;
