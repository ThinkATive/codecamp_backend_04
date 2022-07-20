import { Mail } from './services/mail.js';
import { UserInfo } from './services/user.js';
import { User } from '../models/userSchema.js';
import { Token } from '../models/tokenSchema.js';
import { isEmailValid } from '../email.js';

export class UserController{
    createUser = async (req, res) => {
        const getUserInfo = new UserInfo();
        const UserData = await getUserInfo.getData(req);
        
        Token.findOne({phone:UserData.phone}, async (err, phoneData) => {// --- 2. DB에서 핸드폰 번호로 Auth true 판단
            if(err) return res.status(422).send(err); //에러
            else if(phoneData === null) return res.status(422).send("등록되지 않은 핸드폰 번호 입니다."); // DB에 없는 핸드폰일 때
            else if(phoneData.isAuth){ // ---------------------------------------- 3. Auth: true 일 때 (토큰인증 했을 때)
              if(!isEmailValid(UserData.email)) return res.status(422).send("이메일 오류!"); // 4. 이메일 정상인지 확인(1. 존재여부, 2. @가 있는지)
              
              const userInfo = new User(UserData);
              await userInfo.save();
              
              const userMail = new Mail();
              const template = userMail.createTemplate(UserData.name, UserData.phone, UserData.prefer);
              userMail.sendEmailToUser(UserData.email, template);
        
              User.findOne({phone:UserData.phone}, (_, userData) => { // ------- 8. DB에 등록된 유저 _id 보내기
                return res.send(userData._id);
              })
            }
            else return res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다."); // isAuth : false일 때
        })
    }

    getUserData = async (req, res) => {
        const getUserInfo = await User.find();

        return res.send(getUserInfo);
    }
}