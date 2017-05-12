import FileReader from './src/v1/helpers/FileReader'
import ClientParser from './src/v1/models/ClientParser'
import ClientSelector from './src/v1/models/ClientSelector'

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


FileReader.readFile('./people.in')
    .then((data) => {
        let clients = ClientParser.parseClients(data)
        let clientSelector = new ClientSelector(clients, filterFunc)
        let selectedClients = clientSelector.extract(probabilityFunc, NUMBER_OF_CLIENTS)

        let dataToWrite = selectedClients.map((client) => { return client.PersonId })

        FileReader.whiteToFile(dataToWrite, './people_v1.out')
    })
    .catch((error) => {
        console.log(error)
    })