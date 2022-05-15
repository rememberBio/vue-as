export default function({ route, redirect }) {
    console.log("here auth");
    if (route.path == "/auth/login") {
        if ($nuxt.$fire.auth.currentUser)
            return redirect('/rPage/main/create');
    }
}