export const state = () => ({
    currentUser: {},
    curEditRP: null

})
export const mutations = {
    setState(state, payload) {
        state[payload.state] = payload.value
    },
    setCurEditRPAttrState(state, payload) {
        state['curEditRP'].attributes[payload.attr] = payload.value
    },
}
export const actions = {
    onAuthStateChangedAction(state, { authUser, claims }) {
        if (!authUser) {
            this.$router.push('/auth/login')
            console.log("not connect");

        } /*else {
            // debugger
            this.$router.push('/rPage/main/create')
            console.log("connect");
        }*/
    }
}