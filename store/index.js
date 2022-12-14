import Vue from 'vue'

export const state = () => ({
    currentUser: null,
    curEditRP: null,
    playLoader:false,
    loaderMessage:"",
    messageUpdateRP: {
        type: "", //error/success
        message: ""
    },

})
export const mutations = {
    setState(state, payload) {
        state[payload.state] = payload.value
    },
    setCurEditRPAttrState(state, payload) {
        if(typeof(payload.value) == 'object') {

            let stateAttribute = state.curEditRP.attributes[payload.attr];
            if(state.attr == 'gallery') stateAttribute = state.curEditRP.attributes[payload.attr].items;

            if(Array.isArray(payload.value)) {
                copyArrayOfElementsProps(stateAttribute,payload.value);
            }
            else {
                copyElementsProps(stateAttribute,payload.value);
            }
        }
        else {
            state.curEditRP.attributes[payload.attr] = payload.value;
        }
        state.messageUpdateRP.message = '';
        localStorage.setItem('currentEditedRP',JSON.stringify(state.curEditRP));
    },
}
export const actions = {
    onAuthStateChangedAction(state, { authUser, claims }) {
        /* if (!authUser) {
            this.$router.push('/auth/login');
            console.log("not connect");

        } else {
            // debugger
            this.$router.push('/rp/main/create')
            console.log("connect");
        }*/
    },
}

//helpers
function copyElementsProps(element,elementToCopy) {
    Object.keys(elementToCopy).forEach( key => {
        let value = elementToCopy[key];
        if(typeof(value) == 'object') {
            if(Array.isArray(value)){
                if( element[key] == undefined ) element[key] = [];
                copyArrayOfElementsProps(element[key],value);
            }
            else {
                if( element[key] == undefined ) element[key] = {};
                copyElementsProps(element[key],value);
            }
        } else {
            Vue.set(element, key, value)
        }
    })
}
function copyArrayOfElementsProps(elementsArr,elementsArrToCopy) {
    let stateArrLen = elementsArr.length;
    let valuelen = elementsArrToCopy.length;

    while(stateArrLen > valuelen) {
        elementsArr.pop();
        stateArrLen --;
    }

    for (let index = 0; index < elementsArrToCopy.length; index++) {
        const element = elementsArrToCopy[index];
        if(elementsArr == undefined) elementsArr = [];
        if(elementsArr.length < index + 1) elementsArr.push({});
        if( typeof(element) != 'object' ) {
            Vue.set(elementsArr, index, element)
        }
        else
            copyElementsProps(elementsArr[index],element);
    }
}