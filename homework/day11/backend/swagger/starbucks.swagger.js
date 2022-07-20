/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 메뉴 정보 가져오기
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          _id:
 *                              type: objectId
 *                              example: q1w2e3r4t5yt6gf
 *                          name:
 *                              type: string
 *                              example: 찐한파랑색커피
 *                          image:
 *                              type: string
 *                              example: https://그럴듯한링크.jpg
 *                          __v:
 *                              type: int
 *                              example: 0
 */