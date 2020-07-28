const mongoose = require("mongoose");

const {Clinic} = require('../models/clinic');
const {addClinicValidation, updateClinicValidation} = require("../validation/clinic");
const defaultResponse = require("../helper/default-response");

const index = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  const specialisation = req.query.specialisation || null;
  try {
    let specialisationFilter = {}

    if (specialisation)
      specialisationFilter = {specialisations: {$in: mongoose.Types.ObjectId(specialisation)}};

    let count = await Clinic.find(specialisationFilter)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .countDocuments();

    const clinics = await Clinic.find(specialisationFilter).populate('user').populate("specialisations").skip((currentPage - 1) * perPage).limit(perPage).sort({createdAt: -1});

    return defaultResponse.success(res, "Clinics Data Fetched Successfully.", {count, clinics, currentPage, perPage});
  } catch (e) {

    return defaultResponse.failure(res, e.message);
  }
}

const getClinicById = (logger) => {
  return async function (req, res, next) {
    try {
      const {clinicId} = req.params;

      const clinic = await Clinic.findById(clinicId)
        .populate("user")
        .populate("specialisations");

      if (!clinic) {
        res.status(404).json({
          default_response: {
            success: false,
            errors: err || err.errors,
            message: 'Can not find Clinic ID'
          }
        })
      }

      return res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Clinic Data Fetched Successfully",
          date: {
            clinic
          }
        }
      });


    } catch (err) {
      logger.log('error', err || err.errors);
      res.status(409).json({
        default_response: {
          success: false,
          errors: err || err.errors,
          message: err.message
        }
      })
    }
  }
}

// const getClinicBySpecialisationId = (logger) => {
//     return async function (req, res, next) {
//         try {
//             const { specialisationId } = req.params;

//             let count = await Clinic.find({specialisations: {
//                 $in : mongoose.Types.ObjectId(specialisationId)
//             } }).countDocuments();

//             const clinics = await Clinic.find( {specialisations: {
//                 $in : mongoose.Types.ObjectId(specialisationId)
//             } } );

//             res.status(200).json({
//                 default_response: {
//                     success: true,
//                     errors: [],
//                     message: "Clinics Data Fetched Successfully",
//                     data: {
//                         count,
//                         clinics
//                     }
//                 }
//             });

//         } catch (err) {
//             res.status(200).json({
//                 default_response: {
//                     success: true,
//                     errors: err,
//                     message: "Failed to retrieve Data",
//                }
//             })
//         }

//     }
// }

const AddClinic = (logger) => {
  return async function (req, res, next) {
    const {error, value} = addClinicValidation.validate(req.body);
    if (error) {
      res.status(404).json({
        default_response: {
          success: false,
          errors: error.details,
          message: error.details[0].message
        }
      })
      return;
    }


    try {
      const user = req.headers.user;
      if (!user) {
        res.status(401).json({
          default_response: {
            success: false,
            errors: [],
            message: "Provide userid in headers"
          }
        })
        return;
      }

      const clinic = new Clinic(value);

      clinic.user = user;
      const result = await clinic.save();
      res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Clinic Added Successfully",
          data: result
        }
      })

    } catch (err) {
      logger.log('error', err || err.errors);
      res.status(409).json({

        default_response: {
          success: false,
          errors: err.errors || err,
          message: "Failed To Add Clinic"
        }
      })
    }
    // const { name, logo, thumbnail, specialisations, operatingHours, operatingDays, address, services, amenities, gallery, registrationCertificate, website, doctors, isActive } = req.body;
    // const user = req.headers.user;
    // const clinic = new Clinic({
    //     name, logo, thumbnail, specialisations, operatingHours, operatingDays, address, services, amenities, gallery, registrationCertificate, website, doctors, isActive, user
    // });

    // clinic.save().then(result => {
    //     res.status(200).json({
    //         default_response: {
    //             success: true,
    //             errors: [],
    //             message: result
    //        }})
    // }).catch(err => {
    //     logger.log('error', err || err.errors);
    //     res.status(409).json({

    //         default_response: {
    //             success: false,
    //             errors: err.errors,
    //             message: []
    //        }})
    // });

  }
}

const updateClinic = (logger) => {
  return async function (req, res, next) {
    const {error, value} = updateClinicValidation.validate(req.body);
    if (error) {
      res.status(404).json({
        default_response: {
          success: false,
          errors: error.details,
          message: error.details[0].message
        }
      })
      return;
    }

    try {

      // const user = req.headers.user;
      const clinicId = req.params.clinicId;

      const clinic = await Clinic.findById(clinicId);

      if (!clinic) {
        res.status(404).json({
          default_response: {
            success: false,
            errors: [],
            message: 'Can not find Clinic ID'
          }
        })
      }

      await Clinic.updateOne({_id: clinicId}, {$set: value});
      const updatedClinic = await Clinic.findById(clinicId);

      res.status(200).json({
        default_response: {
          success: true,
          errors: [],
          message: "Clinic Updated Successfully",
          date: updatedClinic
        }
      })

    } catch (err) {
      logger.log('error', err.message || err.errors);

      res.status(409).json({
        default_response: {
          success: false,
          errors: err || err.errors,
          message: err.message
        }
      })
    }
  }
}

module.exports = {
  index,
  AddClinic,
  getClinicById,
  // getClinicBySpecialisationId,
  updateClinic
}

