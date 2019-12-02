
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
        
        //for(let userRole of req.session.user.role){
        //let userRole = req.session.user.role  
            if(authRoles.includes(req.session.user.role)){
                isAuth = true
                res.status(400).send("Thanks for logging in: " + req.session.user.role);
            }
        
        if(isAuth){
            next()
        }else{
            res.status(403).send('You are unauthorized for this endpoint');
        }
    }
}