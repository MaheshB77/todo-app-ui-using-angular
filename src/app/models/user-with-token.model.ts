import { Todo } from "./todo.model";

interface UserWithToken {
    user: {
        active: boolean;
        id: string;
        password: string;
        userEmail: string;
        userFirstName: string;
        userLastName: string;
        userTodos: Todo[]
    };
    jwtToken: string;
}

export default UserWithToken;