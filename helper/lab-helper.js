
const labHelper = {
    params: (isLab, name, arabicName, lat, lng, dist) => {
        var params = {
            isLab: isLab ? true : false, "name": { "$regex": name, "$options": "i" },
            "name": { "$regex": name, "$options": "i" },
            "arabicName": { "$regex": arabicName, "$options": "i" }, "isActive": true,
            'branch.address.location': {
                $near: { $geometry: { type: "Point", coordinates: [Number(lat), Number(lng)] }, $maxDistance: dist, $minDistance: 1 },
            }
        } 
        !params['name'].$regex && delete params['name'];
        !params['arabicName'].$regex && delete params['arabicName'];
        (!lat || !lng || !dist) && delete params['branch.address.location'];
        return params;
    },
    doctorInsertCheckTypes: (Res, data) => {
        if (Res.userRole == 'lab') {
            data.isLab = true;
            data.branch.forEach(v => {
                v.address.location = { type: 'Point', coordinates: [Number(v.address.lat), Number(v.address.lng)] }
                delete v.isDeliveryAvailable
            })
        } else if (Res.userRole == 'pharmacy') {
            data.isLab = false;
            data.branch.forEach(v => {
                v.address.location = { type: 'Point', coordinates: [Number(v.address.lat), Number(v.address.lng)] }
                delete v.isHomeSampleAvailable
            })
        }
        return data;
    }

   

};
module.exports = labHelper;
