// Script that compares the i18n translation files and outputs the differences

const MAIN_LANGUAGE = "en";
const fs = require("fs");

try {
    const files = fs.readdirSync(__dirname + "/../translations");

    const items = {};
    for (const file of files) {
        const data = fs.readFileSync(__dirname + `/../translations/${file}`);
        items[file] = JSON.parse(data);
    }
    console.log(flattenObject(items));
} catch (error) {
    console.log(error);
}

function flattenObject(ob) {
    const toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}