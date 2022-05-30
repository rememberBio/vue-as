
//auth
const loginRoute = "/auth/login";
const registerRoute = "/auth/register";
//remember pages
const createPageRoute = "/rp/create";



export default function({ route, redirect }) {

    const emailVerified = localStorage.getItem("emailVerified");

    if (route.path == loginRoute) {
        if(emailVerified) {
            return redirect(registerRoute);
        }
        else if ($nuxt.$fire.auth.currentUser)
        {
            return redirect(createPageRoute);
        } 
        else return route;
    } 
    else {
        if (route.path == "/") {
            return redirect(createPageRoute);
        }
        else if (route.path.includes("/rp")) {
            if (!$nuxt.$fire.auth.currentUser || emailVerified) 
            {
                let rpId = route.query['rp-id'];
                //http://localhost:8080/rp/create/?rp-id=62945c6f90cfef325bb6cb4
                if(rpId) rpId = '/?redirect-to=/rp/create/?rp-id=' + rpId;
                return redirect(loginRoute + rpId);
            } 
            else {
                let userFromStorage = localStorage.getItem("currentUser");
                if(userFromStorage) {
                    if (!$nuxt.$store.state.currentUser) {
                        $nuxt.$store.commit("setState", {
                            value: JSON.parse(userFromStorage),
                            state: "currentUser",
                        });
                    } 
                } else {
                    $nuxt.$fire.auth.signOut();
                    return redirect(loginRoute);
                }
                
            }
            return route;
        }
    }
}