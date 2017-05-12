export default class FileReader {
    static readFile(filePath, readLine, afterReading) {
        let lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filePath),
            terminal: false
        })

        lineReader.on('line', readLine)
        lineReader.on('close', afterReading)
    }

    static whiteToFile(data, filePath) {
        let fs = require('fs')
        let file = fs.createWriteStream(filePath)
        data.forEach((d) => { file.write(d + '\n') })
        file.end()
    }
}