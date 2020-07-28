/**
 * security:
  - bearerAuth: []  
 */
/**
 * paths:
 * /:
 *  get:
 *    security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 'Will send `Authenticated`'
 *      '403': 
 *         description: 'You do not have necessary permissions for the resource'
 */

/**
* @swagger
* definitions:
*   rateDoctor:
*     type: object
*     properties:
*       user:
*         type: "string"
*       doctor:
*         type: "string"
*       rate:
*         type: "number"
*       created_at:
*         type: "date"
*       updated_at:
*         type: "date"
*     required:
*     - user
*     - doctor
*     - rate
*/


/**
* @swagger
* /rate:
*   get:
*     tags:
*       - Rate
*     name: Get All Rates
*     summary: Get All Rates
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get Successfully
*         schema:
*           $ref: "#/definitions/rateDoctor"
*       400:
*         description: error
*/

/**
* @swagger
* /rate/profile/{id}:
*   get:
*     tags:
*       - Rate
*     name: Get All Rates For Single Profile
*     summary: Get All Rates For Single Profile
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
*           $ref: "#/definitions/rateDoctor"
*       400:
*         description: error
*/

/**
* @swagger
* /rate/user/{id}:
*   get:
*     tags:
*       - Rate
*     name: Get All Rates For Single User
*     summary: Get All Rates For Single User
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
*           $ref: "#/definitions/rateDoctor"
*       400:
*         description: error
*/

/**
* @swagger
* /rate:
*   post:
*     tags:
*       - Rate
*     name: Insert
*     summary: Insert New Rate
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
*             receiver:
*               type: string
*               format: string
*             rate:
*               type: number
*             rateFor:
*               type: string
*         required:
*           - user
*           - receiver
*           - rate
*           - rateFor

*     responses:
*       200:
*         description: Creating successfully
*/