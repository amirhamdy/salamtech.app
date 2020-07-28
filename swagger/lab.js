/**
* @swagger
* definitions:
*   labProfile:
*     type: object
*     properties:
*       name:
*         type: "string"
*       arabicName:
*         type: "string"
*       user:
*         type: "string"
*       logo:
*         type: "string"
*       thumbnail:
*         type: "string"
*       arabicLogo:
*         type: "string"
*       arabicThumbnail:
*         type: "string"
*       phoneNumber:
*         type: "string"
*       branch:
*         type: "array"
*       isActive:
*         type: "boolean"
*       isLab:
*         type: "boolean"
*     required:
*     - name
*     - arabicName
*     - user
*     - phoneNumber
*     - branch
*     - numberOfBranches
*     - isActive
*     - isLab
*/

/**
* @swagger
* /lab-pharmacy:
*   post:
*     tags:
*       - Lab And Pharmacy
*     name: Insert
*     summary: Insert New Lab Or Pharmacy Profile
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
*             name:
*               type: string
*             arabicName:
*               type: string
*             arabicLogo:
*               type: string
*             arabicThumbnail:
*               type: string
*             logo:
*               type: string
*             thumbnail:
*               type: number
*             phoneNumber:
*               type: string
*             branch:
*                type: array
*                items:                                 
*                    type: object
*                    properties:
*                       phoneNumber:
*                           type: number

*                       workingHour:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   day:
*                                       type: number
*                                   name:
*                                       type: string
*                                   start:
*                                       type: string
*                                   end:
*                                       type: string
*                                   status:
*                                       type: string
*
*                       address:
*                           type: object
*                           properties:
*                               address_name:
*                                   type: string
*                               lat:
*                                   type: number
*                               lng:
*                                   type: number
*                               building_info:
*                                   type: string
*                               floor:
*                                   type: string
*                               apartment_number:
*                                   type: string
*                               address_line:
*                                   type: string
*                       isDeliveryAvailable:
*                           type: boolean
*                       isHomeSampleAvailable:
*                           type: boolean

*             numberOfBranches:
*               type: number
*             isActive:
*               type: boolean
*             isLab:
*               type: boolean
*         required:
*           - user
*           - name
*           - arabicName
*           - phoneNumber
*           - branch
*           - numberOfBranches
*           - isActive
*           - isLab
*     responses:
*       200:
*         description: Creating successfully
*/

/**
* @swagger
* /lab-pharmacy:
*   get:
*     tags:
*       - Lab And Pharmacy
*     name: Get All Labs Or Pharmacies Has Profile 
*     summary: Get All Labs Or Pharmacies Has Profile 
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
*         name: name
*         schema:
*           type: string
*       - in: query
*         name: lat
*         schema:
*           type: string
*       - in: query
*         name: lng
*         schema:
*           type: string
*       - in: query
*         name: dist
*         schema:
*           type: string
*       - in: isLab
*         name: dist
*         schema:
*           type: integer


*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/labProfile"
*       400:
*         description: error
*/



/**
* @swagger
* /lab-pharmacy/{id}:
*   get:
*     tags:
*       - Lab And Pharmacy
*     name: Get Single  Lab Or Pharmacy With Profile Id 
*     summary:  Get Single  Lab Or Pharmacy With Profile Id  
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
*           $ref: "#/definitions/labProfile"
*       400:
*         description: error
*/


/**
* @swagger
* /lab-pharmacy/profile/{id}:
*   get:
*     tags:
*       - Lab And Pharmacy
*     name:  Get Single Doctor With User Id 
*     summary: Get Single Doctor With User Id 
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
*           $ref: "#/definitions/labProfile"
*       400:
*         description: error
*/

/**
* @swagger
* /lab-pharmacy/count:
*   get:
*     tags:
*       - Lab And Pharmacy
*     name:  Get Count of Doctor Profile 
*     summary: Get Count of Doctor Profile 
*     security:
*       - bearerAuth: []
*     consumes:
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
*         name: name
*         schema:
*           type: string
*       - in: query
*         name: lat
*         schema:
*           type: string
*       - in: query
*         name: lng
*         schema:
*           type: string
*       - in: query
*         name: dist
*         schema:
*           type: string
*       - in: isLab
*         name: dist
*         schema:
*           type: integer
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get Successfully
*       400:
*         description: error
*/


/**
* @swagger
* /lab-pharmacy:
*   put:
*     tags:
*       - Lab And Pharmacy
*     name: Update
*     summary: Update  Lab Or Pharmacy Profile
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
*             name:
*               type: string
*             arabicName:
*               type: string
*             arabicLogo:
*               type: string
*             arabicThumbnail:
*               type: string
*             logo:
*               type: string
*             thumbnail:
*               type: number
*             phoneNumber:
*               type: string
*             branch:
*                type: array
*                items:                                 
*                    type: object
*                    properties:
*                       phoneNumber:
*                           type: number

*                       workingHour:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   day:
*                                       type: number
*                                   name:
*                                       type: string
*                                   start:
*                                       type: string
*                                   end:
*                                       type: string
*                                   status:
*                                       type: string
*
*                       address:
*                           type: object
*                           properties:
*                               address_name:
*                                   type: string
*                               lat:
*                                   type: number
*                               lng:
*                                   type: number
*                               building_info:
*                                   type: string
*                               floor:
*                                   type: string
*                               apartment_number:
*                                   type: string
*                               address_line:
*                                   type: string
*                       isDeliveryAvailable:
*                           type: boolean
*                       isHomeSampleAvailable:
*                           type: boolean

*             numberOfBranches:
*               type: number
*             isActive:
*               type: boolean
*             isLab:
*               type: boolean
*         required:
*           - user
*           - name
*           - arabicName
*           - phoneNumber
*           - branch
*           - numberOfBranches
*           - isActive
*           - isLab
*     responses:
*       200:
*         description: Update successfully
*/

/**
* @swagger
* /lab-pharmacy/{id}:
*   delete:
*     tags:
*       - Lab And Pharmacy
*     name:  Delete Profile lab Or pharmacy 
*     summary: Delete Profile lab Or pharmacy 
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