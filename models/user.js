const fileHandler = require('./helpers/fileHandler')
const crypto = require('crypto')
const fileName = 'users.txt'

let users = []

module.exports = {

    async populate() {
        users = await fileHandler.read(fileName)
    },

    async create(data) {
        const user = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password
        }

        users.push(user)
        await fileHandler.write(fileName, users)
    },

    async update(id, data) {
        const user = {
            id: id,
            name: data.name,
            email: data.email,
            password: data.password
        }

        const index = users.findIndex(oldUser => oldUser.id === user.id)
        if (index !== -1) {
            users[index] = user
        }
        
        await fileHandler.write(fileName, users)
    },

    async delete(id) {
        const updatedUsers = users.filter(user => user.id != id)
        users = updatedUsers

        await fileHandler.write(fileName, users)
    },

    async search(id) {
        await this.populate()
        return users.find(user => user.id == id)
    },

    async getAll() {
        await this.populate()
        return users
    }
}