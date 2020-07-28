/**
* @swagger
* definitions:
*   Clinic:
*     type: object
*     properties:
*       name:
*         type: string
*       specialisations:
*         type: array
*         items:
*           type: integer
*       logo:
*         type: "string"
*       thumbnail:
*         type: "string"
*       rate:
*         type: "integer"
*       operatingHours:
*         type: "object"
*       operatingDays:
*         type: "object"
*       address:
*         type: "object"
*       services:
*         type: "array"
*       amenities:
*         type: "array"
*       gallery:
*         type: "array"
*       registrationCertificate:
*         type: "string"
*       website:
*         type: "string"
*       doctors:
*         type: "array"
*       isActive:
*         type: "boolean"
*       user:
*         type: "string"
*     required:
*     - name
*     - user
*/

/**
* @swagger
* /clinic:
*   get:
*     tags:
*       - Clinic Profile
*     name: Get All Clinics
*     summary: Get All Clinics
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
*         name: page
*         schema:
*           type: string
*       - in: query
*         name: specialisation
*         schema:
*           type: string
*     responses:
*       200:
*         description: Clinics Data Fetched Successfully
*         schema:
*           $ref: "#/definitions/Clinic"
*       400:
*         description: Error
*/

/**
* @swagger
* /clinic/{id}:
*   get:
*     tags:
*       - Clinic Profile
*     name: Get Single Clinic ID
*     summary:  Get Single Clinic ID 
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
*         description: Clinic Data Fetched Successfully
*         schema:
*           $ref: "#/definitions/Clinic"
*       400:
*         description: error
*       404:
*         description: Can not find Clinic ID
*/

/**
* @swagger
* /clinic:
*   post:
*     tags:
*       - Clinic Profile
*     name: Add Clinic Profile
*     summary: Add Clinic Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: "#/definitions/Clinic"
*     responses:
*       201:
*         description: Clinic Added Successfully
*       409:
*         description: Failed To Add Clinic
*/

/**
* @swagger
* /clinic:
*   put:
*     tags:
*       - Clinic Profile
*     name: Update Clinic Profile
*     summary: Update Clinic Profile
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: "#/definitions/Clinic"
*     responses:
*       201:
*         description: Clinic Added Successfully
*       409:
*         description: Failed To Add Clinic
*/