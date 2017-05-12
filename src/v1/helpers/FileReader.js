export default class FileReader {
    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            let fs = require('fs')
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err)
                }
                return resolve(data.toString().split('\n'))
            })
        })
    }

    static whiteToFile(data, filePath) {
        let fs = require('fs')
        let file = fs.createWriteStream(filePath)
        data.forEach((d) => { file.write(d + '\n') })
        file.end()
    }
}