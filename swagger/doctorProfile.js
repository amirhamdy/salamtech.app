/**
* @swagger
* definitions:
*   doctorProfile:
*     type: object
*     properties:
*       user:
*         type: "string"
*       logo:
*         type: "string"
*       thumbnail:
*         type: "string"
*       workingHour:
*         type: "array"
*       address:
*         type: "object"
*       dob:
*         type: "date"
*       gender:
*         type: "string"
*       levelOfSeniority:
*         type: "string"
*       specializations:
*         type: "array"
*       fess:
*         type: "number"
*       eductionCertificate:
*         type: "date"
*       documents:
*         type: "array"
*       subSpecializations:
*         type: "string"
*     required:
*     - user
*     - phoneNumber
*     - workingHour
*     - address
*     - dob
*     - gender
*     - levelOfSeniority
*     - specializations
*     - fess
*     - eductionCertificate
*     - documents
*     - subSpecializations
*/

/**
* @swagger
* /doctor:
*   post:
*     tags:
*       - Doctor Profile
*     name: Insert
*     summary: Insert New Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             user:
*               type: string
*             logo:
*               type: string
*             thumbnail:
*               type: number
*             phoneNumber:
*               type: string
*             workingHour:
*                type: array
*                items:
*                    type: object
*                    properties:
*                        day:
*                           type: number
*                        name:
*                           type: string
*                        start:
*                           type: string
*                        end:
*                           type: string
*                        duration:
*                           type: string
*                        status:
*                           type: string
*
*             address:
*               type: object
*               properties:
*                       address:
*                           type: string
*                       lat:
*                           type: number
*                       lng:
*                           type: number
*                       buliding:
*                           type: string
*                       floor:
*                           type: string
*                       apartment_number:
*                           type: string
*                       address_line:
*                           type: string
*             dob:
*               type: date
*             gender:
*               type: string
*             levelOfSeniority:
*               type: string
*             specializations:
*               type: array
*               items:
*                    type: string
*             fess:
*               type: number
*             eductionCertificate:
*               type: string
*             documents:
*               type: array
*               items:
*                    type: string
*             subSpecializations:
*               type: string

*         required:
*           - user
*           - phoneNumber
*           - workingHour
*           - address
*           - dob
*           - gender
*           - levelOfSeniority
*           - specializations
*           - fess
*           - eductionCertificate
*           - documents
*           - subSpecializations
*     responses:
*       200:
*         description: Creating successfully
*/

/**
* @swagger
* /doctor:
*   get:
*     tags:
*       - Doctor Profile
*     name: Get All Doctors Has Profile 
*     summary: Get All Doctors Has Profile 
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: query
*         name: limit
*         schema:
*           type: string
*       - in: query
*         name: offset
*         schema:
*           type: string
*       - in: query
*         name: specializations
*         schema:
*           type: string
*       - in: query
*         name: name
*         schema:
*           type: string

*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/doctorProfile"
*       400:
*         description: error
*/



/**
* @swagger
* /doctor/{id}:
*   get:
*     tags:
*       - Doctor Profile
*     name: Get Single Doctor With User Id 
*     summary:  Get Single Doctor With User Id  
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/doctorProfile"
*       400:
*         description: error
*/


/**
* @swagger
* /doctor/profile/{id}:
*   get:
*     tags:
*       - Doctor Profile
*     name:  Get Single Doctor With Profile Id 
*     summary: Get Single Doctor With Profile Id 
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/doctorProfile"
*       400:
*         description: error
*/

/**
* @swagger
* /doctor/count:
*   get:
*     tags:
*       - Doctor Profile
*     name: Get Count Doctors Has Profile 
*     summary: Get Count Doctors Has Profile 
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: query
*         name: specializations
*         schema:
*           type: string
*       - in: query
*         name: name
*         schema:
*           type: string

*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/doctorProfile"
*       400:
*         description: error
*/



/**
* @swagger
* /doctor:
*   put:
*     tags:
*       - Doctor Profile
*     name: Update
*     summary: Update Doctor Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             doctorId:
*               type: string
*             user:
*               type: string
*             logo:
*               type: string
*             thumbnail:
*               type: number
*             phoneNumber:
*               type: string
*             workingHour:
*                type: array
*                items:
*                    type: object
*                    properties:
*                        day:
*                           type: number
*                        name:
*                           type: string
*                        start:
*                           type: string
*                        end:
*                           type: string
*                        duration:
*                           type: string
*                        status:
*                           type: string
*
*             address:
*               type: object
*               properties:
*                       address:
*                           type: string
*                       lat:
*                           type: number
*                       lng:
*                           type: number
*                       buliding:
*                           type: string
*                       floor:
*                           type: string
*                       apartment_number:
*                           type: string
*                       address_line:
*                           type: string
*             dob:
*               type: date
*             gender:
*               type: string
*             levelOfSeniority:
*               type: string
*             specializations:
*               type: array
*               items:
*                    type: string
*             fess:
*               type: number
*             eductionCertificate:
*               type: string
*             documents:
*               type: array
*               items:
*                    type: string
*             subSpecializations:
*               type: string

*         required:
*           - user
*           - phoneNumber
*           - workingHour
*           - address
*           - dob
*           - gender
*           - levelOfSeniority
*           - specializations
*           - fess
*           - eductionCertificate
*           - documents
*           - subSpecializations
*     responses:
*       200:
*         description: Updating successfully
*/

/**
* @swagger
* /doctor/{id}:
*   delete:
*     tags:
*       - Doctor Profile
*     name:  Delete Profile Doctor 
*     summary: Delete Profile Doctor 
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*     responses:
*       200:
*         description: Delete Successfully
*       400:
*         description: error
*/