import Client from './Client'

export default class ClientSelector {
    constructor(clientList, filteringCondition) {
        if (clientList === null)
            throw new Error('Client list cannot be null')

        if (clientList === undefined)
            throw new Error('Client list cannot be undefined')

        for (let i = 0; i < clientList.length; i++) {
            if (!(clientList[i] instanceof Client))
                throw new Error('Invalid client list')
        }

        if (filteringCondition)
            this.clientList = JSON.parse(JSON.stringify(clientList)).filter(filteringCondition)
        else
            this.clientList = JSON.parse(JSON.stringify(clientList))
    }

    sortBy(probability) {
        if (probability === null)
            throw new Error('Probability function cannot be null')

        if (probability === undefined)
            throw new Error('Probability function cannot be undefined')

        let sortedList = JSON.parse(JSON.stringify(this.clientList))
        sortedList.sort(this._compare(probability))
        return sortedList
    }

    extract(probability, n) {
        return this.sortBy(probability).slice(0, n)
    }

    _compare(probability) {
        return (x, y) => {
            let xProb = this._checkValidProbability(probability(x))
            let yProb = this._checkValidProbability(probability(y))

            if (xProb > yProb) return -1

            if (xProb < yProb) return 1

            if (x.NumberOfRecommendations < y.NumberOfRecommendations) return 1
            if (x.NumberOfRecommendations > y.NumberOfRecommendations) return -1

            if (x.NumberOfConnections < y.NumberOfConnections) return 1
            if (x.NumberOfConnections > y.NumberOfConnections) return -1

            return 0
        }
    }

    _checkValidProbability(probability) {
        if (probability < 0 || probability > 1)
            throw new Error('Invalid probability function')

        return probability
    }
}