import { TOKEN } from "../constants";

const initialState = {
    token: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN:
            console.log('TOKEN', action.payload);
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer