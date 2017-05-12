import Client from './Client'

export default class ClientParser {
    static parseClients(rowList) {
        if (rowList === null)
            throw new Error('RowList cannot be null')

        if (rowList === undefined)
            throw new Error('RowList cannot be undefined')

        return rowList
            .filter((item) => { return item !== null && item !== undefined && item !== '' })
            .map((item) => { return new Client(item) })
    }
}