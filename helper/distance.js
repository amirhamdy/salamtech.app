const distance = {
    calcDistance: (lat1, lon1, lat2, lon2, unit) => {
        const radlat1 = Math.PI * lat1 / 180;
        const radlat2 = Math.PI * lat2 / 180;
        const radlon1 = Math.PI * lon1 / 180;
        const radlon2 = Math.PI * lon2 / 180;
        const theta = lon1 - lon2;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }

        return dist;
    },
    distance: (arr, lat, lng, dist) => {
        var clonedArray = JSON.parse(JSON.stringify(arr));
        clonedArray.forEach(v => {
            v.branch.forEach(ele => {
                const dist = distance.calcDistance(Number(ele.address.lat), Number(ele.address.lng), Number(lat), Number(lng), "K");
                ele['distance'] = Math.round(dist * 100) / 100;
            })
        })
        clonedArray = distance.sorDistances(clonedArray);
        clonedArray = distance.removeDistanceNotInRadius(clonedArray, dist);
        clonedArray = distance.getNearestAddress(clonedArray);
        return clonedArray;
    },
    sorDistances: (arr) => {
        arr.forEach(v => { v.branch.length > 1 && v.branch.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); })
        return arr
    },
    removeDistanceNotInRadius: (arr, dist) => {
        const distance = Number(dist);
        arr.forEach(v => { v.branch = v.branch.filter(ele => ele.distance * 1000 <= distance); })
        return arr;
    },
    getNearestAddress: (arr) => {
        arr.forEach(v => v.address = {
            lat: v.branch[0].address.lat,
            lng: v.branch[0].address.lng,
            address_name: v.branch[0].address.address_name,
            building_info: v.branch[0].address.building_info,
            floor: v.branch[0].address.floor,
            apartment_number: v.branch[0].address.apartment_number,
            distance: v.branch[0].distance
        });
        return arr;
    }

};
module.exports = distance;
