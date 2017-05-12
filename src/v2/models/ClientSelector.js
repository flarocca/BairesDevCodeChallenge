import Client from './Client'

export default class ClientSelector {
    constructor(probabilityFunction, numberToExtract, filteringCondition) {
        if (probabilityFunction === null)
            throw new Error('Probability function cannot be null')

        if (probabilityFunction === undefined)
            throw new Error('Probability function cannot be undefined')

        if (numberToExtract === null)
            throw new Error('Number to extract cannot be null')

        if (numberToExtract === undefined)
            throw new Error('Number to extract cannot be undefined')

        if (numberToExtract <= 0)
            throw new Error('Number to extract must be greater than 0')

        this.probabilityFunction = probabilityFunction
        this.filteringCondition = filteringCondition
        this.numberToExtract = numberToExtract
        this.clients = []
    }

    getClients() {
        return this.clients
    }

    addIfMatches(client) {
        this._validateClient(client)

        if (this.filteringCondition) {
            if (this.filteringCondition(client)) {
                this._add(client)
                this._sortClients()
            }
        } else {
            this._add(client)
            this._sortClients()
        }
    }

    _validateClient(client) {
        if (client === null)
            throw new Error('Client cannot be null')

        if (client === undefined)
            throw new Error('Client cannot be undefined')

        if (!(client instanceof Client))
            throw new Error('Invalid client')
    }

    _sortClients() {
        this.clients.sort((a, b) => {
            if (a.Probability < b.Probability) return 1
            if (a.Probability > b.Probability) return -1

            if (a.NumberOfRecommendations < b.NumberOfRecommendations) return 1
            if (a.NumberOfRecommendations > b.NumberOfRecommendations) return -1

            if (a.NumberOfConnections < b.NumberOfConnections) return 1
            if (a.NumberOfConnections > b.NumberOfConnections) return -1

            return 0
        })
    }

    _add(client) {
        client.Probability = this._checkValidProbability(this.probabilityFunction(client))
        if (this.clients.length < this.numberToExtract) {
            this.clients.push(client)
        }
        else {
            if (this._shouldBeAdded(client))
                this.clients[this.clients.length - 1] = client
        }
    }

    _shouldBeAdded(client) {
        if (this.clients.length === this.numberToExtract)
            return this.clients[this.numberToExtract - 1].Probability <= client.Probability

        return true
    }

    _checkValidProbability(probability) {
        if (probability < 0 || probability > 1)
            throw new Error('Invalid probability function')

        return probability
    }
}