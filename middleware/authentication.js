import { rememberPage } from "~/models/rememberPage";

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
                return redirect(loginRoute);
            } 
            else {
                if (!$nuxt.$store.state.curEditRP) {
                    let currendEditedFromLocalStorage = localStorage.getItem('currentEditedRP');
                    if(!currendEditedFromLocalStorage) {
                        currendEditedFromLocalStorage = new rememberPage();
                        localStorage.setItem('currentEditedRP',JSON.stringify(currendEditedFromLocalStorage));
                    } else {
                        currendEditedFromLocalStorage = JSON.parse(currendEditedFromLocalStorage);
                    }    

                    $nuxt.$store.commit("setState", {
                        value: currendEditedFromLocalStorage,
                        state: "curEditRP",
                    });
                } 
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