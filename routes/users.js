const express = require("express");
const router = express.Router();
const UserSchema = require("../schemas/user.js");

// 회원 가입
router.post('/users', async (req, res) => {
   const { email, nickname, password, confirmPassword } = req.body;

   // 패스워드, 확인패스워드 일치 검증
   if ( password !== confirmPassword ) {
      res.status(400).json({
         errorMessage: "패스워드와 전달된 패스워드 확인값이 일치하지 않습니다."
      });
      return;  // 패스워드 검증이 실패하면 뒤에는 실행시키지 않도록 return으로 브레이크
   };

   // 이메일, 닉네임 DB 중복 검증
   const isExistuser = await UserSchema.findOne({
      $or: [{eamile}, {nickname}]      // 이메일 또는 닉네임이 일치할 때, 조회한다.
   });
   if (isExistuser) {
      res.status(400).json({
         errorMessage: "이메일 또는 닉네임이 이미 사용중입니다."
      });
      return;
   };

   // 
   const user = new UserSchema({ email, nickname, password });
   await user.save();   // DB에 저장한다.

   return res.status(201).json({});
});



module.exports = router;