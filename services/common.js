const passport = require('passport')


exports.isAuth=(req,res,done)=>{
    return passport.authenticate('jwt')
   
}

exports.sanitizeUser = (user)=>{
    return{id:user.id,role:user.role}
}

exports. cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Yzc3NWQwOTgyZGExYjYyM2RiOWU4YyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI0MzQ3OTExfQ.r3Q9nbmR9Z1UG4ysVv6igtLa444UhgqcBrY1cw9pNP8"
    return token;
};