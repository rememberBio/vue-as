export default function({ route, redirect }) {
    console.log("here auth");
    if (route.path == "/auth/login") {
        if ($nuxt.$fire.auth.currentUser)
            return redirect('/rp/main/create');
    }
    if (route.path == "/") {
        if (!$nuxt.$fire.auth.currentUser)
            return redirect('/auth/login');
    }
}