import FileReader from './src/v2/helpers/FileReader'
import ClientSelector from './src/v2/models/ClientSelector'
import Client from './src/v2/models/Client'

const NUMBER_OF_CLIENTS = 100

let probabilityFunc = (client) => {
    let num = (client.NumberOfConnections + client.NumberOfConnections + client.PersonId)
    return parseInt(('' + num)[0]) / 10
}

let filterFunc = (client) => {
    return client.Country !== undefined &&
           client.Country !== null &&
           client.Country !== '' &&
          (client.NumberOfRecommendations > 0 || client.NumberOfConnections > 0)
}

let clientSelector = new ClientSelector(probabilityFunc, NUMBER_OF_CLIENTS, filterFunc)

let readLineByLine = (line) => {
    let client = new Client(line)
    clientSelector.addIfMatches(client)
}

let readingCompleted = () => {
    let selectedClients = clientSelector.getClients()
    let dataToWrite = selectedClients.map((client) => { return client.PersonId })
    FileReader.whiteToFile(dataToWrite, './people_v2.out')
}

FileReader.readFile('./people.in', readLineByLine, readingCompleted)
