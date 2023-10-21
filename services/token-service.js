const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService{

    generateToken = payload =>{
        const accessToken = jwt.sign(payload,process.env.KEY_ACCESS_TOKEN,{
            expiresIn:'1d'
        });
        const refereshToken = jwt.sign(payload,process.env.KEY_REFERESH_TOKEN,{
            expiresIn:'1y'
        });
        return {accessToken,refereshToken};
    }

    storeRefereshToken = async (userId,refereshToken  ) =>{
        const tokens = {token:refereshToken};
        const isExist = await TokenModel.exists({userId});
        if (!isExist)
            return await TokenModel.create({userId,tokens});
        else
            return await TokenModel.findOneAndUpdate({userId},{$push:{tokens}});
    }

    verifyAccessToken = token => jwt.verify(token,process.env.KEY_ACCESS_TOKEN);

    verifyRefereshToken = token => jwt.verify(token,process.env.KEY_REFERESH_TOKEN);

    findRefereshToken = async (userId,token) =>{
        return await TokenModel.find({userId,'tokens.token':token}).select({tokens:{$elemMatch:{token}}});
    }

    removeRefereshToken = async (userId,token) =>{
        const tokens = {token};
        return await TokenModel.updateOne({userId,'tokens.token':token},{$pull : {tokens}});
    }

   
    
}

module.exports = new TokenService();