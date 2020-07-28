
/**
 * @swagger
 * /auth/forgetPassword/{email}:
 *   get:
 *     tags:
 *       - Auth
 *     name: Forget Password
 *     summary: Forget Password
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
*           type: string
*         required:
*           - email
*     responses:
*       200:
*         description: message Sending Successfully
*       400:
*         description: error
*/

/**
* @swagger
* definitions:
*   User:
*     type: object
*     properties:
*       fullName:
*         type: "string"
*       email:
*         type: "string"
*       phone:
*         type: "string"
*       password:
*         type: "string"
*       userRole:
*         type: "string"
*       accessToken:
*         type: "string"
*       deviceToken:
*         type: "string"
*       created_at:
*         type: "string"
*       updated_at:
*         type: "string"
*       isActive:
*         type: "string"
*       verificationCode:
*         type: integer
*     required:
*     - fullName
*     - email
*     - password
*     - userRole
*     - phone

*/

