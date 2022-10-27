require('dotenv').config();
const { writeFileSync } = require('fs');

const CONTENTFUL_TOKEN = process.env["CONTENTFUL_TOKEN"];


const targetPath = `./src/environments/env-variables.ts`;

const envConfigFile = `
  export const ENV_VALUES = {
    CONTENTFUL_TOKEN: '${CONTENTFUL_TOKEN}',
  }
`;

writeFileSync(targetPath, envConfigFile, function (err: any) {
  if (err) {
    console.log(err);
  }
});
