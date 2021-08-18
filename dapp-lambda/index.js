const ERC721 = require('./abis/erc721.json')
var Contract = require('web3-eth-contract');
const https = require('https');
// set provider for all later instances to use

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
        let responseBody = "";

        res.on("data", (chunk) => {
            responseBody += chunk;
        });

        res.on("end", () => {
            resolve(JSON.parse(responseBody));
        });
    })
    req.on('error', (err) => {
      reject(err);
    });
  });
}


exports.handler = async (event) => {
    let response = {
        statusCode: 500,
        body: JSON.stringify({"message": "An unknown error occurred"}),
    };
    try {
      // Get inputs from query params
      const address = event.queryStringParameters['a']
      const tokenId = event.queryStringParameters['t']
      // Get the tokenURI from the smart contract
      var contract = new Contract(ERC721.abi, address);
      contract.setProvider('wss://mainnet.infura.io/ws/v3/0bc238aacdd84677ab61a8a56617fe52');
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      console.log(tokenURI)
      // Load the metadata from the tokenURI
      const tokenMetaData = await fetch(tokenURI)
      response = {
          statusCode: 200,
          body: JSON.stringify(tokenMetaData),
      };
    } catch (error) {
      console.log(error)
      response = {
          statusCode: 200,
          body: JSON.stringify({"message": error.message}),
      };
    }
    return response;
};
