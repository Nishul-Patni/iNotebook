const jwt = require('jsonwebtoken');

const JWT_SECRET = "KISIkoMtbaTAna";

const fetchUser = (req, res, next)=>{
    // sbse phele token nikal rahe hai request se
    let token = req.header("auth-token");
    // let token = req.body.authToken;
    // console.log(token);
    if(!token){
        // agr tokne exist ni krta request me
        res.status(401).json({error: "Please authenticate using a valid token"});
        return
    }

    try{
        // ab token ko verify krre hai
        let data = jwt.verify(token, JWT_SECRET);

        // token verify hogya or us token ka data jo tha wo extract kr liya 
        let user = data.user;

        // ab humne token me data ke andar user chupa ke bheja tha to use autorise krne ke baad user ko req ke sath chipka ke bhejre hai
        req.user = user;
        next();
    }catch(error){
        // agr authorization fail hota hai to
        console.log(error);
        res.status(401).send("Please authenticate using a valid token");
    }
}

module.exports = fetchUser;