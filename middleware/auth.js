import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // if > 500 -> Google auth

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token.toString(), process.env.JWT_SECRET);
      req.userId = decodedData.id;
    } else { // Google auth
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
