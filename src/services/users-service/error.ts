export function userAlreadyExist() {

    return {
        name: "UserAlreadyExist",
        message: "Cannot create a duplicated user"
    }

}

export function userNotFound() {

    return {
        name: "UserNotFound",
        message: "Cannot find a existing user"
    }

}