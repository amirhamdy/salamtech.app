const accessControl = {
    isClinic: (req, res, next) => {
        if (req.user.userRole == "clinic"){
            next();
        } else {
            res.status(404).json({
                default_response: {
                    success: false,
                    errors: [],
                    message: `Unauthorized User Role of ${req.user.userRole}, Only Users with clinic role Allowed`
               }
            })
        }    
    },
    isPatient: (req, res, next) => {
        if (req.user.userRole == "patient"){
            next();
        } else {
            res.status(404).json({
                default_response: {
                    success: false,
                    errors: [],
                    message: `Unauthorized User Role of '${req.user.userRole}', Only Users with 'patient' role Allowed`
               }
            })
        }    
    },
    isDoctor: (req, res, next) => {
        if (req.user.userRole == "doctor"){
            next();
        } else {
            res.status(404).json({
                default_response: {
                    success: false,
                    errors: [],
                    message: `Unauthorized User Role of ${req.user.userRole}, Only Users with doctor role Allowed`
               }
            })
        }    
    }
}

module.exports = accessControl;