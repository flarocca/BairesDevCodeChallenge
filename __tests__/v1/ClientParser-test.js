import ClientParser from '../../src/v1/models/ClientParser'
import Client from '../../src/v1/models/Client'

describe('ClientParser', () => {

    it('Cannot parse a null rowList', () => {
        let nullRowList = null

        expect(() => ClientParser.parseClients(nullRowList)).toThrowError('RowList cannot be null')
    })

    it('Cannot parse an undefined rowList', () => {
        let undefinedRowList

        expect(() => ClientParser.parseClients(undefinedRowList)).toThrowError('RowList cannot be undefined')
    })

    it('Can parse a rowList into a List of Clients', () => {
        let rowList = [
            '4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176',
            '4568|carlos|lobalzo|jefe de gestión funcional|Argentina|Financial Services|2|259'
        ]

        let parsedList = ClientParser.parseClients(rowList)

        expect(parsedList.length).toBe(rowList.length)
        parsedList.forEach((client) => {
            expect(client).toBeInstanceOf(Client)
        })
    })
})
