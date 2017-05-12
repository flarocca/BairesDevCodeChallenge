export default class Client {
    constructor(dataRow) {
        let fields = dataRow.split('|')

        if (fields.length !== 8) {
            throw new Error('Invalid number of fields')
        }

        if (isNaN(fields[0]))
            throw new Error('PersonId must be numeric or null')

        if (isNaN(fields[6]))
            throw new Error('NumberOfRecommendations must be numeric or null')

        if (isNaN(fields[7]))
            throw new Error('NumberOfConnections must be numeric or null')

        this.PersonId = parseInt(fields[0])
        this.Name = fields[1]
        this.LastName = fields[2]
        this.CurrentRole = fields[3]
        this.Country = fields[4]
        this.Industry = fields[5]
        this.NumberOfRecommendations = parseInt(fields[6])
        this.NumberOfConnections = parseInt(fields[7])
        this.dataRow = dataRow
        this.Probability = 0
    }
}