import { Todo } from "./todo.model";

interface UserWithToken {
    user: {
        active?: boolean;
        id: string;
        password: string;
        userEmail: string;
        userFirstName: string;
        userLastName: string;
        userTodos: Todo[]
    };
    token: string;
}

export default UserWithToken;