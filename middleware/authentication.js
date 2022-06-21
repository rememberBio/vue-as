import { getUserByEmail } from "~/services/userService";

//auth
const loginRoute = "/auth/login";
const registerRoute = "/auth/register";
//remember pages
const createPageRoute = "/rp/create";



export default async function({ route, redirect }) {

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
                if(rpId) rpId = '/?redirect-to=/rp/create/?rp-id=' + rpId;
                else rpId = "";
                return redirect(loginRoute + rpId);
            } 
            else {
                if (!$nuxt.$store.state.currentUser) {
                    const userFromDb = await getUserByEmail($nuxt.$fire.auth.currentUser.email);
                    $nuxt.$store.commit("setState", {
                        value: userFromDb,
                        state: "currentUser",
                    });
                }
                
            }
            return route;
        }
    }
}