
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
        
        for(let userRole of authRoles){
            userRole = req.session.user.role  
            if(authRoles.includes(userRole)){
                isAuth = true
                //res.send("Thanks for logging in: " + req.session.user.role);
            }
        }
        if(isAuth){
            next()
        }else{
            res.status(403).send('You are unauthorized for this endpoint');
        }
    }
}