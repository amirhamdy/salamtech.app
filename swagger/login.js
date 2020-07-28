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

/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: change Password Account
 *     summary: change Password Account
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             password:
 *               type: string
 *               formate: password
 *         required:
 *           - userId
 *           - password
 *     responses:
 *       200:
 *         description: Successfully Verify  You Can Login Now
 *       400:
 *         description: Bad email, not found in db
 */
