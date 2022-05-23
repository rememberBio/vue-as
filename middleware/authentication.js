import { rememberPage } from "~/models/rememberPage";
export default function({ route, redirect }) {
    console.log("here auth");
    if (route.path == "/auth/login") {
        if ($nuxt.$fire.auth.currentUser)
        {
            return redirect('/rp/main/create');
        }
    }
    if (route.path == "/") {
        if (!$nuxt.$fire.auth.currentUser)
            return redirect('/auth/login');
        else
            return redirect('/rp/main/create');
    }
    if (route.path.includes("/rp/main")) {
        if (!$nuxt.$fire.auth.currentUser) 
        {
            return redirect('/auth/login');
        } else {
          
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
                        value: JSON.parse(localStorage.getItem("currentUser")),
                        state: "currentUser",
                    });
                } 
            } else {
                $nuxt.$fire.auth.signOut();
                return redirect('/auth/login');
            }
            
        }
    }
}