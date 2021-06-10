require('dotenv').config();

module.exports={
    SECRET_KEY : process.env.SECRET_KEY,
    TOKEN_EXPIRE : process.env.TOKEN_AGE,
   SERVICE_ID:process.env.SERVICE_ID,
   ACCOUNT_SID:process.env.ACCOUNT_SID,
   AUTH_TOKEN:process.env.AUTH_TOKEN
}