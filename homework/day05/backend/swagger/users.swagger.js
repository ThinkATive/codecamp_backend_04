/**
 * @swagger
 * /users:
 *   get:
 *     summary: 이용자 목록 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: aglkdsjg@gmail.com
 *                          name:
 *                              type: string
 *                              example: 철수
 *                          phone:
 *                              type: string
 *                              example: 010-5298-2398
 *                          personal:
 *                              type: string
 *                              example: 239482-4198343
 *                          prefer:
 *                              type: string
 *                              example: http://naver.com
 */