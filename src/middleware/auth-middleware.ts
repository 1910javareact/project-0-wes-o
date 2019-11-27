
export function authorization(authRoles:string[]){

//middleware function generated using authRoles parameter
    return (req,res,next)=>{
        let isAuth = false
        //Check login
        if(!req.session.user){
            console.log(req.session.user + " 888");
            res.status(401).send('Please Login');
            return
        }
        for(let userRole of req.session.user){
            if(authRoles.includes(userRole)){
                isAuth = true
                res.status(400).send("Thanks for logging in: " + userRole);
            }
        }
        if(isAuth){
            next()
        }else{
            res.status(403).send('You are unauthorized for this endpoint');
        }
    }
}