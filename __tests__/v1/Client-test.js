import Client from '../../src/v1/models/Client'

describe('Client', () => {

    it('DataRow must contain 8 fields splitted by |', () => {
        let dataRowWithLessThanEight = '||'
        let dataRowWithMoreThanEight = '||||||||'

        expect(() => new Client(dataRowWithLessThanEight)).toThrowError('Invalid number of fields')
        expect(() => new Client(dataRowWithMoreThanEight)).toThrowError('Invalid number of fields')
    })

    it('PersonId must be numeric', () => {
        let nonNumericNorNullPersonId = 'asdfasdf|||||||'

        expect(() => new Client(nonNumericNorNullPersonId)).toThrowError('PersonId must be numeric or null')
    })

    it('NumberOfRecommendations must be numeric', () => {
        let nonNumericNorNullNumberOfRecommendations = '||||||asdfasdf|'

        expect(() => new Client(nonNumericNorNullNumberOfRecommendations)).toThrowError('NumberOfRecommendations must be numeric or null')
    })

    it('NumberOfConnections must be numeric', () => {
        let nonNumericNorNullNumberOfConnections = '||||||1|asdfasdf'

        expect(() => new Client(nonNumericNorNullNumberOfConnections)).toThrowError('NumberOfConnections must be numeric or null')
    })

    it('Can create a valid Client', () => {
        let PersonId = 4567
        let Name = 'arturo'
        let LastName = 'perez'
        let CurrentRole = 'teleport engineering manager'
        let Country = 'Germany'
        let Industry = 'Telecommunications'
        let NumberOfRecommendations = 2
        let NumberOfConnections = 176

        let dataRow = PersonId + '|' + Name + '|' + LastName + '|' + CurrentRole + '|' + Country + '|' + Industry + '|' + NumberOfRecommendations + '|' + NumberOfConnections
        let client = new Client(dataRow)

        expect(client.PersonId).toBe(PersonId)
        expect(client.Name).toBe(Name)
        expect(client.LastName).toBe(LastName)
        expect(client.CurrentRole).toBe(CurrentRole)
        expect(client.Country).toBe(Country)
        expect(client.Industry).toBe(Industry)
        expect(client.NumberOfRecommendations).toBe(NumberOfRecommendations)
        expect(client.NumberOfConnections).toBe(NumberOfConnections)
    })

    it('dataRow must return the same dataRow received', () => {
        let PersonId = 4567
        let Name = 'arturo'
        let LastName = 'perez'
        let CurrentRole = 'teleport engineering manager'
        let Country = 'Germany'
        let Industry = 'Telecommunications'
        let NumberOfRecommendations = 2
        let NumberOfConnections = 176

        let dataRow = PersonId + '|' + Name + '|' + LastName + '|' + CurrentRole + '|' + Country + '|' + Industry + '|' + NumberOfRecommendations + '|' + NumberOfConnections
        let client = new Client(dataRow)

        expect(client.dataRow).toBe(dataRow)
    })
})
