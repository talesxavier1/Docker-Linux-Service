const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.executeShellComand = async (action) => {
    try {
        const { stdout, stderr } = await exec(action);
        return {
            "status": stderr ? "NOK" : "OK",
            "message": stderr ? stderr : stdout
        }
    } catch (error) {
        return {
            "status": "NOK",
            "message": error
        }
    }
}

exports.formatLineResultComand = (LINE) => {
    if (!LINE || typeof LINE != "string") { return [] }

    let values = [];

    let splitLineString = LINE.split("");
    let partialString = "";

    for (let INDEX in splitLineString) {
        let VALUE = splitLineString[INDEX];
        if (VALUE != " " || splitLineString[Number(INDEX) + 1] != " ") {
            partialString += VALUE
        } else if (partialString) {
            values.push(partialString.trimStart());
            partialString = "";
        }
    }

    return values;
}