/**
* @swagger
* definitions:
*   specialty:
*     type: object
*     properties:
*       specialtyName:
*         type: "string"
*       specialtyDescription:
*         type: "string"
*       image:
*         type: "string"
*       specialtyNameArabic:
*         type: "string"
*       specialtyDescriptionArabic:
*         type: "string"
*       imageArabic:
*         type: "string"
*       created_at:
*         type: "date"
*       updated_at:
*         type: "date"
*     required:
*     - specialtyName
*     - specialtyDescription
*     - specialtyNameArabic
*     - specialtyDescriptionArabic
*     - imageArabic
*     - image
*/


/**
* @swagger
* /specialty:
*   post:
*     tags:
*       - Specializations
*     name: Insert
*     summary: Insert New Specialty
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             specialtyName:
*               type: string
*             specialtyDescription:
*               type: string
*               format: string
*             image:
*               type: string
*             specialtyNameArabic:
*               type: string
*             specialtyDescriptionArabic:
*               type: string
*             imageArabic:
*               type: string
*         required:
*           - specialtyName
*           - specialtyDescription
*           - specialtyNameArabic
*           - imageArabic
*             specialtyDescriptionArabic
*           - image
*     responses:
*       200:
*         description: Creating successfully

*/

/**
* @swagger
* /specialty/{lang}/{id}:
*   get:
*     tags:
*       - Specializations
*     name: Get All Specializations
*     summary: Get All Specializations
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: lang
*         schema:
*           type: string
*       - in: path
*         name: id
*         schema:
*           type: string
*     responses:
*       200:
*         description: successfully Get
*         schema:
*           $ref: "#/definitions/specialty"
*       400:
*         description: error
*/

/**
* @swagger
* /specialty:
*   put:
*     tags:
*       - Specializations
*     name: Update
*     summary: Update Specialty
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             specialtyId:
*               type: string
*             specialtyName:
*               type: string
*             specialtyDescription:
*               type: string
*             image:
*               type: string
*             specialtyNameArabic:
*               type: string
*             specialtyDescriptionArabic:
*               type: string
*             imageArabic:
*               type: string
*         required:
*           - specialtyName
*           - specialtyDescription
*           - specialtyNameArabic
*           - imageArabic
*             specialtyDescriptionArabic
*           - image
*     responses:
*       200:
*         description: Creating successfully

*/


/**
* @swagger
* /specialty/{id}:
*   delete:
*     tags:
*       - Specializations
*     name: Delete Specializations
*     summary: Delete Specializations
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
*         description: message Sending Successfully
*         schema:
*           $ref: "#/definitions/specialty"
*       400:
*         description: error
*/

/**
* @swagger
* /specialty/{id}:
*   get:
*     tags:
*       - Specializations
*     name: Get Single Specialty
*     summary: Get Single Specialty
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
*         description: message Sending Successfully
*         schema:
*           $ref: "#/definitions/specialty"
*       400:
*         description: error
*/

/**
* @swagger
* /specialty/{lang}:
*   get:
*     tags:
*       - Specializations
*     name: Get Single Specialty
*     summary: Get Single Specialty
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: path
*         name: lang
*         schema:
*           type: string
*     responses:
*       200:
*         description: message Sending Successfully
*         schema:
*           $ref: "#/definitions/specialty"
*       400:
*         description: error
*/

/**
* @swagger
* /specialty/:
*   get:
*     tags:
*       - Specializations
*     name: Get All Specialties
*     summary: Get All Specialties
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
*         description: message Sending Successfully
*         schema:
*           $ref: "#/definitions/specialty"
*       400:
*         description: error
*/

