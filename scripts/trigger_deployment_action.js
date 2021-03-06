const request = require('request-promise-native');

async function main() {

    const formData = {
      'event_type': process.env.EVENT_TYPE,
      'client_payload': {
        'message':{
        SUBGRAPH_COMMIT: process.env.SUBGRAPH_COMMIT,
        CONTRACT_COMMIT: process.env.NETWORK_COMMIT
      }}
    }
    console.log('formData', formData)
    await request({
      method: 'POST',
      uri: `https://api.github.com/repos/joinColony/subgraph-metrics/dispatches`,
      keepAlive: false,
      body: JSON.stringify(formData),
      headers:{
        "Accept": "application/vnd.github.everest-preview+json",
        "Authorization": `token ${process.env.CHEWIE_GITHUB_TOKEN}`,
        "User-Agent": "JoinColony/chewie",
      }
    });
}

main()
