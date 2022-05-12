export const state = () => ({
    currentUser: {},
    curEditRP: null

})
export const mutations = {
    setState(state, payload) {
        state[payload.state] = payload.value
    },
}
export const actions = {
    onAuthStateChangedAction(state, { authUser, claims }) {
        console.log("authUser", authUser);
        console.log("claims", claims);
        if (!authUser) {
            this.$router.push('/auth/login')
            console.log("not connect");

        } else {
            // debugger
            this.$router.push('/rPage/main')
            console.log("connnect");
        }
    }
}