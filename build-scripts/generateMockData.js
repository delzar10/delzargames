/* generate mock data */

/* eslint-disable no-console */

import fs from 'fs';
import jsf from 'json-schema-faker';
import {schema} from './mockDataSchema';
import chalk from 'chalk';

const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/api/db.json', json, function(err){
    if (err) {
        return console.log(chalk.red(err));
    } else {
        console.log(chalk.green("Mock data generated."));
    }
})
