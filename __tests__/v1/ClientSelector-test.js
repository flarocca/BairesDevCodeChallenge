import ClientSelector from '../../src/v1/models/ClientSelector'
import Client from '../../src/v1/models/Client'

let clientList = [
    new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176'),
    new Client('4568|carlos|lobalzo|jefe de gestión funcional|Argentina|Financial Services|2|259'),
    new Client('646104151|charles willy|ochola|vice president admin|United States|Education|0|0'),
    new Client('644449316|cayce|davenport||United States|Education Management|0|1'),
    new Client('644261684|ryan|gentzler|||Education|0|0'),
    new Client('644513297|marianne|grosveld|||Primary/Secondary Education|0|7'),
    new Client('644749524|oscar eduardo|fraschetto valdés||Mexico|Construction|0|500')
]

describe('ClientSelector', () => {
    it('Cannot create a ClientSelector with a null client list', () => {
        let nullClientList = null

        expect(() => new ClientSelector(nullClientList)).toThrowError('Client list cannot be null')
    })

    it('Cannot create a ClientSelector with an undefined client list', () => {
        let undefinedClientList

        expect(() => new ClientSelector(undefinedClientList)).toThrowError('Client list cannot be undefined')
    })

    it('Cannot create a ClientSelector with an non-client clist', () => {
        let validClient = new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176')
        let nonCLientList = [validClient, { someProp: 'someProp' }]

        expect(() => new ClientSelector(nonCLientList)).toThrowError('Invalid client list')
    })

    it('Can create a valid ClientSelector with a client list', () => {
        let clientSelector = new ClientSelector(clientList)

        expect(clientSelector.clientList.length).toEqual(clientList.length)
        expect(clientSelector.clientList).toEqual(expect.arrayContaining(clientList))
    })

    it('Can sort client list by a given probability function', () => {
        let clientSelector = new ClientSelector(clientList)

        let sortedList = clientSelector.sortBy((client) => {
            let num = (client.NumberOfConnections + client.NumberOfConnections + client.PersonId)
            return parseInt(('' + num)[0]) / 10
        })

        expect(sortedList[0].PersonId).toEqual(644749524)
        expect(sortedList[1].PersonId).toEqual(644513297)
        expect(sortedList[2].PersonId).toEqual(644449316)
        expect(sortedList[3].PersonId).toEqual(646104151)
        expect(sortedList[4].PersonId).toEqual(644261684)
        expect(sortedList[5].PersonId).toEqual(4568)
        expect(sortedList[6].PersonId).toEqual(4567)
    })

    it('Probability function cannot be null', () => {
        let nullProbabilityFunc = null
        let clientSelector = new ClientSelector(clientList)

        expect(() => clientSelector.sortBy(nullProbabilityFunc)).toThrowError('Probability function cannot be null')
    })

    it('Probability function cannot be undefined', () => {
        let undefinedProbabilityFunc
        let clientSelector = new ClientSelector(clientList)

        expect(() => clientSelector.sortBy(undefinedProbabilityFunc)).toThrowError('Probability function cannot be undefined')
    })

    it('Can extract the N most accurated', () => {
        let clientSelector = new ClientSelector(clientList)
        let n = 2
        let probability = (client) => {
            let num = (client.NumberOfConnections + client.NumberOfConnections + client.PersonId)
            return parseInt(('' + num)[0]) / 10
        }

        let extractedList = clientSelector.extract(probability, n)
        
        expect(extractedList.length).toEqual(n)
        expect(extractedList[0].PersonId).toEqual(644749524)
        expect(extractedList[1].PersonId).toEqual(644513297)
    })

    it('Can pre-filter clients not matching a condition', () => {
        let expectedClients = [
            new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176'),
            new Client('4568|carlos|lobalzo|jefe de gestión funcional|Argentina|Financial Services|2|259'),
            new Client('644449316|cayce|davenport||United States|Education Management|0|1'),
            new Client('644749524|oscar eduardo|fraschetto valdés||Mexico|Construction|0|500')
        ]

        let filteringCondition = (client) => {
            return client.Country !== undefined &&
                client.Country !== null &&
                client.Country !== '' &&
                (client.NumberOfRecommendations > 0 || client.NumberOfConnections > 0)
        }
        let clientSelector = new ClientSelector(clientList, filteringCondition)

        expect(clientSelector.clientList.length).toEqual(expectedClients.length)
        expect(clientSelector.clientList).toEqual(expect.arrayContaining(expectedClients))
    })

    it('Probability function cannot return values over 1', () => {
        let clientSelector = new ClientSelector(clientList)
        let invalidProbabilityFunc = (client) => {
            return 1.2
        }

        expect(() => clientSelector.sortBy(invalidProbabilityFunc)).toThrowError('Invalid probability function')
    })

    it('Probability function cannot return values under 0', () => {
        let clientSelector = new ClientSelector(clientList)
        let invalidProbabilityFunc = (client) => {
            return -0.2
        }

        expect(() => clientSelector.sortBy(invalidProbabilityFunc)).toThrowError('Invalid probability function')
    })
})
