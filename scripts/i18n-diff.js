// Script that compares the i18n translation files and outputs the differences

const fs = require("fs");
const MAIN_FILE = "en.json";

let mainLanguageItems;
const mainLanguageKeys = [];

try {
    const file = fs.readFileSync(__dirname + `/../translations/${MAIN_FILE}`);
    mainLanguageItems = flattenObject(JSON.parse(file));
    mainLanguageKeys.push(...Object.keys(mainLanguageItems));
} catch (error) {
    console.log("Error reading main file: " + error);
    process.exit(1);
}

try {
    const files = fs
        .readdirSync(__dirname + "/../translations")
        .filter((file) => file !== MAIN_FILE);
    for (const file of files) {
        const data = fs.readFileSync(__dirname + `/../translations/${file}`);
        const items = flattenObject(JSON.parse(data));
        const difference = mainLanguageKeys.filter(
            (key) => !Object.keys(items).includes(key)
        );
        if (!difference.length) continue;
        difference.forEach((item) => {
            console.log(`Translation: "${item}" missing in ${file}`);
        });
    }
} catch (error) {
    console.log("Error in checking other languages: " + error);
}

function flattenObject(ob) {
    const toReturn = {};

    for (const i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (typeof ob[i] == "object" && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + "." + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
