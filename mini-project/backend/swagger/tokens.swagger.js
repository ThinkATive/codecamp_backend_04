/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 핸드폰 번호로 토큰번호 얻기 (회원가입 전 해야할 것!)
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 * 
 *     responses:
 *       '200':
 *         description: 성공 메세지 ( 같은 번호로 다시 시도할 경우 토큰 업데이트 )
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items: 
 *                      type: string
 *                  example:
 *                      - 핸드폰으로 인증 문자가 전송되었습니다!
 *                      - 토큰이 000000으로 업데이트 됐습니다!
 *       '422':
 *         description: 오류 메세지
 *         content:
 *           application/json:
 *              schema:
 *                  type: string
 *                  example: 잘못된 번호입니다.
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰번호 인증하기
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 *               token:
 *                 type: string
 *                 example: "829110"
 *     responses:
 *       '200':
 *         description: 성공 시
 *         content:
 *           application/json:
 *              schema:
 *                  type: boolean
 *                  example: true
 *       '422':
 *         description: 실패 시
 *         content:
 *           application/json:
 *              schema:
 *                  type: boolean
 *                  example: false
 */