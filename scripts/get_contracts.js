// Clone colonyNetwork, using passed argument
const { readFileSync, writeFileSync, existsSync } = require('fs');
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const yaml = require('js-yaml');

async function main() {
	const commit = process.env.CONTRACT_COMMIT || "develop"
	console.log(`Using commit ${commit} for the contracts`);
	try {
		await exec(`rm -rf ./colonyNetwork`)
		options = {cwd: "./colonyNetwork"}
		await exec(`git clone https://github.com/joinColony/colonyNetwork.git colonyNetwork`)
		await exec(`cd ../colonyNetwork`, options)
		await exec(`npm run provision:token:contracts`, options)
    await exec(`cd ../`, options)
	} catch (err) {
		console.log(err)
	}
	// try {

	// 	const subgraphConfig = yaml.safeLoad(
	//       readFileSync(
	//         "./subgraph.yaml",
	//         'utf8',
	//       ),
	//     );
	//     subgraphConfig.dataSources.map(({ name }, index) => {
	//       if (name === 'ColonyNetwork') {
	//         subgraphConfig.dataSources[index].source.address = process.env.NETWORK_ADDRESS;
	//       }
	//     });
	//     writeFileSync(
	//       "./subgraph.yaml",
	//       yaml.safeDump(subgraphConfig),
	//       { encoding: 'utf8' },
	//     );

	// } catch (err){
	// 	console.log(err)
	// }
}

main()
