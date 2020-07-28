/**
* @swagger
* definitions:
*   PromoCode:
*     type: object
*     properties:
*       code:
*         type: string
*       name:
*         type: string
*       description:
*         type: string
*       currentUses:
*         type: integer
*       maxUses:
*         type: integer
*       maxUsesPerUser:
*         type: integer
*       discountAmount:
*         type: integer
*       isFixed:
*         type: boolean
*       maxDiscount:
*         type: integer
*       currency:
*         type: string
*       allowedPaymentMethods:
*         type: array
*         items:
*           type: string
*       startAt:
*         type: string
*       endAt:
*         type: string
*/

/**
* @swagger
* /promocode:
*   get:
*     tags:
*       - Promo Codes
*     name: Get All Promo Codes
*     summary: Get All Promo Codes
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
*         name: userId
*         schema:
*           type: string
*     responses:
*       200:
*         description: Promo Codes Data Fetched Successfully
*         schema:
*           $ref: "#/definitions/PromoCode"
*       400:
*         description: Error
*/

/**
* @swagger
* /promocode/{id}:
*   get:
*     tags:
*       - Promo Codes
*     name: Get Single Promo Code
*     summary:  Get Single Promo Code
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
*         description: Promo Code Data Fetched Successfully
*         schema:
*           $ref:"#/definitions/PromoCode"
*       400:
*         description: error
*       404:
*         description: Can not find Promo Code ID
*/

/**
* @swagger
* /Promocode:
*   post:
*     tags:
*       - Promo Codes
*     name: Add PromoCode
*     summary: Add PromoCode
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: "#/definitions/PromoCode"
*     responses:
*       201:
*         description: Promo Code Added Successfully
*       409:
*         description: Failed To Add Promo Code
*/

/**
* @swagger
* /promocode:
*   put:
*     tags:
*       - Promo Codes
*     name: Update Promo Code
*     summary: Update Promo Code
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: "#/definitions/PromoCode"
*     responses:
*       201:
*         description: Promo Code Added Successfully
*       409:
*         description: Failed To Add Promo Code
*/