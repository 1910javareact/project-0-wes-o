
export function authorization(authRoles: string[]) {

    //middleware function generated using authRoles parameter
    return (req, res, next) => {
        let isAuth = false

        //Check login
        if (!req.session.user) {
            res.status(401).send('Please Login');
            return
        }

        for (let userRole of authRoles) {
            userRole = req.session.user.role
            if (authRoles.includes(userRole)) {
                isAuth = true
            }
        }
        if (isAuth) {
            next()
        } else {
            res.status(403).send('You are unauthorized for this endpoint');
        }
    }
}