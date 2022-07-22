/**
 * @swagger
 * /user:
 *   post:
 *     summary: 핸드폰 인증 완료 후 회원가입 ( 토큰인증 완료 후 )
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 카페인
 *               email:
 *                 type: string
 *                 example: Email@Email.io.kr
 *               personal:
 *                 type: string
 *                 example: 220718-5435463
 *               prefer:
 *                 type: string
 *                 example: https://naver.com
 *               pwd:
 *                 type: string
 *                 example: 아무도모르겠지?
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 * 
 *     responses:
 *       200:
 *         description: _id 값 리턴
 *         content:
 *           application/json:
 *              schema:
 *                  type: string
 *                  example: r43tt54it390ri23t4
 *          
 *       422:
 *         description: 오류 메세지
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items: 
 *                      type: string
 *                  example:
 *                      - 등록되지 않은 핸드폰 번호 입니다.
 *                      - 이메일 오류!
 *                      - 에러!! 핸드폰 번호가 인증되지 않았습니다.
 * 
*/

/**
 * @swagger
 * /user:
 *   get:
 *     summary: 회원가입 된 유저 정보 가져오기
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          og:
 *                              type: object
 *                              example: {"title" : "드코프캠", "discription" : "드코프캠에서 무료 커피 드세요", "image" : "https://이거슨이미지.png"}
 *                          _id:
 *                              type: objectId
 *                              example: fkl4j3l6kg3
 *                          name:
 *                              type: string
 *                              example: 카페인
 *                          email:
 *                              type: string
 *                              example: Email@Email.co.net.com.kr
 *                          personal:
 *                              type: string
 *                              example: 220718-*******
 *                          prefer:
 *                              type: string
 *                              example: https://navle.goover.io.kr
 *                          pwd:
 *                              type: string
 *                              example: "123456789"
 *                          phone:
 *                              type: string
 *                              example: "01098765432"
 *                          __v:
 *                              type: int
 *                              example: 0
 */