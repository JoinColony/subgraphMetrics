const path = require('path');
const { writeFileSync } = require("fs");

const ICOLONY_PATH = process.env.CUSTOM_ICOLONY_PATH ? path.resolve(__dirname, process.env.CUSTOM_ICOLONY_PATH) : path.resolve(__dirname, '..', 'lib/colonyNetwork/build/contracts/IColony.json');
const ADDITIONAL_ABIS_PATH = path.resolve(__dirname, './additionalAbis.json');

console.log('interfaces path')
console.log(ICOLONY_PATH)

const IColony = require(ICOLONY_PATH);
const additionalAbis = require(ADDITIONAL_ABIS_PATH);

const neededAbis = [];

const existingSigs = IColony.abi.map(({ name, inputs }) => `${name}(${inputs.map((parameter) => parameter.type).join(",")})`);

additionalAbis.map((abiEntry) => {
  const { name, inputs } = abiEntry;
  const signature = `${name}(${inputs.map((parameter) => parameter.type).join(",")})`;
  if (existingSigs.indexOf(signature) === -1) {
    neededAbis.push(abiEntry);
  }
});

console.log('Adding following abis')
console.log(neededAbis)

writeFileSync(ICOLONY_PATH, JSON.stringify({
  ...IColony,
  abi: [
    ...IColony.abi,
    ...neededAbis,
  ],
}), {
  encoding: "utf8",
});
