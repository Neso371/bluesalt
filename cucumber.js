/**
 * Read environment variables from file
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

const environment = process.env.ENVIRONMENT?.toLowerCase() ?? 'demo';
const worldParameters = require(`./world-params.${environment}.json`);

module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/**/*.ts', 'lib/**/*.ts'],
        format: [
          ["html", "reports/html-report.html"]
        ],
      
        worldParameters,
    },
};
