export default {
    namespaced: true,
    state: {
        messages : []
    },
    mutations : {
        display(state, newMessage){
            state.messages.push(newMessage);
        },
    },
    getters : {
        get(state){
            return state.messages;
        }
    }
}