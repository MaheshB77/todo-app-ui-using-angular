import Constants from "./Constants";

const urls: any = {
    LOGIN_URL: `http://localhost:${Constants.PORT}/api/users/login`,
    UPDATE_TODOS_URL: `http://localhost:${Constants.PORT}/api/users/todos/`,
    ADD_NEW_USER_URL: `http://localhost:${Constants.PORT}/api/users/`
}

export default urls;