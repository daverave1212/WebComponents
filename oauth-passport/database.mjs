
const users = {}

export function addOrGetUser(id) {
    if (users[id] == null) {
        users[id] = { id }
    }
    return users[id]
}

export function getUser(id) {

}
