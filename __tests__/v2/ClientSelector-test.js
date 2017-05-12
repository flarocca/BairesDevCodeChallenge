import ClientSelector from '../../src/v2/models/ClientSelector'
import Client from '../../src/v2/models/Client'

describe('ClientSelector', () => {
    it('Cannot create a ClientSelector with a null probability function', () => {
        let nullProbabilityFunc = null

        expect(() => new ClientSelector(nullProbabilityFunc, 10)).toThrowError('Probability function cannot be null')
    })

    it('Cannot create a ClientSelector with an undefined probability function', () => {
        let undefinedProbabilityFunc

        expect(() => new ClientSelector(undefinedProbabilityFunc, 10)).toThrowError('Probability function cannot be undefined')
    })

    it('Cannot create a ClientSelector with a null number of clients to extract', () => {
        let nullNumberToExtract = null

        expect(() => new ClientSelector(() => { return 1 }, nullNumberToExtract)).toThrowError('Number to extract cannot be null')
    })

    it('Cannot create a ClientSelector with an undefined number of clients to extract', () => {
        let undefinedNumberToExtract

        expect(() => new ClientSelector(() => { return 1 }, undefinedNumberToExtract)).toThrowError('Number to extract cannot be undefined')
    })

    it('Number of clients to extract must be greater than 0', () => {
        let zeroNumberToExtract = 0

        expect(() => new ClientSelector(() => { return 1 }, zeroNumberToExtract)).toThrowError('Number to extract must be greater than 0')
    })

    it('Cannot add a null client', () => {
        let clientSelector = new ClientSelector(() => { return 1 }, 10)
        let nullClient = null
        expect(() => clientSelector.addIfMatches(nullClient)).toThrowError('Client cannot be null')
    })

    it('Cannot add an undefined client', () => {
        let clientSelector = new ClientSelector(() => { return 1 }, 10)
        let undefinedClient

        expect(() => clientSelector.addIfMatches(undefinedClient)).toThrowError('Client cannot be undefined')
    })

    it('Cannot add a non-client', () => {
        let clientSelector = new ClientSelector(() => { return 1 }, 10)
        let nonClient = { someProp: 'someProp' }

        expect(() => clientSelector.addIfMatches(nonClient)).toThrowError('Invalid client')
    })

    it('A client must be added if the limit has not beed reached yet', () => {
        let clientSelector = new ClientSelector(() => { return 1 }, 10)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176'))
        clientSelector.addIfMatches(new Client('644261684|ryan|gentzler|||Education|0|0'))

        expect(clientSelector.clients.length).toEqual(2)
    })

    it('Probability must added to the client after adding it', () => {
        let probability = 0.5
        let clientSelector = new ClientSelector(() => { return probability }, 10)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176'))

        expect(clientSelector.clients[0].Probability).toEqual(probability)
    })

    it('A client must not be added if it does not match the condition', () => {
        let condition = (client) => {
            return false
        }
        let clientSelector = new ClientSelector(() => { return 1 }, 10, condition)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|176'))

        expect(clientSelector.clients.length).toEqual(0)
    })

    it('A client must not be added if the limit has not been reached and its probability is smaller than the smalest', () => {
        let probabilityFunc = (client) => {
            let num = (client.NumberOfConnections + client.NumberOfConnections + client.PersonId)
            return parseInt(('' + num)[0]) / 10
        }
        let clientSelector = new ClientSelector(probabilityFunc, 1)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|9'))
        expect(clientSelector.clients.length).toEqual(1)
        expect(clientSelector.clients[0].PersonId).toEqual(4567)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|1'))
        expect(clientSelector.clients.length).toEqual(1)
        expect(clientSelector.clients[0].PersonId).toEqual(4567)
    })

    it('A client must be added if the limit has not been reached and its probability is greater than the smalest', () => {
        let probabilityFunc = (client) => {
            return parseInt(('' + client.NumberOfConnections)[0]) / 10
        }
        let clientSelector = new ClientSelector(probabilityFunc, 5)

        clientSelector.addIfMatches(new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|1'))
        clientSelector.addIfMatches(new Client('646104151|charles willy|ochola|vice president admin|United States|Education|0|5'))
        clientSelector.addIfMatches(new Client('4568|carlos|lobalzo|jefe de gestión funcional|Argentina|Financial Services|2|3'))
        clientSelector.addIfMatches(new Client('644513297|marianne|grosveld|||Primary/Secondary Education|0|7'))
        clientSelector.addIfMatches(new Client('644449316|cayce|davenport||United States|Education Management|0|9'))

        let clients = clientSelector.getClients()

        expect(clients.length).toEqual(5)
        expect(clients[0].PersonId).toEqual(644449316)
        expect(clients[1].PersonId).toEqual(644513297)
        expect(clients[2].PersonId).toEqual(646104151)
        expect(clients[3].PersonId).toEqual(4568)
        expect(clients[4].PersonId).toEqual(4567)

        clientSelector.addIfMatches(new Client('644749524|oscar eduardo|fraschetto valdés||Mexico|Construction|0|8'))
        clientSelector.addIfMatches(new Client('644261684|ryan|gentzler|||Education|0|4'))

        let newClientes = clientSelector.getClients()

        expect(newClientes.length).toEqual(5)
        expect(newClientes[0].PersonId).toEqual(644449316)
        expect(newClientes[1].PersonId).toEqual(644749524)
        expect(newClientes[2].PersonId).toEqual(644513297)
        expect(newClientes[3].PersonId).toEqual(646104151)
        expect(newClientes[4].PersonId).toEqual(644261684)
    })

    it('Probability function cannot return values over 1', () => {
        let probabilityFunc = (client) => { return -1 }
        let someClient = new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|1')
        let clientSelector = new ClientSelector(probabilityFunc, 2)

        expect(() => clientSelector.addIfMatches(someClient)).toThrowError('Invalid probability function')
    })

    it('Probability function cannot return values under 0', () => {
        let probabilityFunc = (client) => { return -0.1 }
        let someClient = new Client('4567|arturo|perez|teleport engineering manager|Germany|Telecommunications|2|1')
        let clientSelector = new ClientSelector(probabilityFunc, 2)

        expect(() => clientSelector.addIfMatches(someClient)).toThrowError('Invalid probability function')
    })
})
