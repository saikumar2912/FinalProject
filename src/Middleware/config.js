require('dotenv').config();

module.exports={
    SECRET_KEY : process.env.SECRET_KEY,
    TOKEN_EXPIRE : process.env.TOKEN_AGE
}