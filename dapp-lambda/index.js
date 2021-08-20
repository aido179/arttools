const ERC721 = require('./abis/erc721.json')
var Contract = require('web3-eth-contract');
const https = require('https');
// set provider for all later instances to use
const endpoints = {
  "mainnet": "wss://mainnet.infura.io/ws/v3/0bc238aacdd84677ab61a8a56617fe52",
  "rinkeby": "wss://rinkeby.infura.io/ws/v3/0bc238aacdd84677ab61a8a56617fe52"
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
            responseBody += chunk;
        });
        res.on("end", () => {
            resolve(responseBody);
        });
    })
    req.on('error', (err) => {
      reject(err);
    });
  });
}
function attemptJSONParse(jsonString) {
  // try to parse JSON.
  // if parsing returns and error, just return the string
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return jsonString
  }
}

async function routeView (event) {
  // Get inputs from query params
  /*
  Allow connection to multiple networks.
  Useful for testing on rinkeby etc.
  */
  let network = "mainnet"
  if (event.queryStringParameters !== undefined) {
    network = event.queryStringParameters['n'] || "mainnet"
  }
  const provider_endpoint = endpoints[network]
  console.log("Using provider endpoint:", provider_endpoint)
  const address = event.queryStringParameters['a'] || false
  const tokenId = event.queryStringParameters['t'] || false
  if (address === false || tokenId === false) {
    throw new Error("Contract address (a) and tokenId (t) are required.")
  }
  // Get the tokenURI from the smart contract
  var contract = new Contract(ERC721.abi, address);
  contract.setProvider(provider_endpoint);
  const tokenURI = await contract.methods.tokenURI(tokenId).call()
  console.log(`URI: ${tokenURI}`)
  const ownerOf = await contract.methods.ownerOf(tokenId).call()
  console.log(`OWNER: ${ownerOf}`)
  // Load the metadata from the tokenURI
  const tokenMetaData = await fetch(tokenURI)
  const parsedMetaData = attemptJSONParse(tokenMetaData)
  response = {
      statusCode: 200,
      body: JSON.stringify({
        "tokenURIContent": parsedMetaData,
        "ownerOf": ownerOf
      })
  };
  return response
}

async function routeMint () {
  response = {
      statusCode: 200,
      body: JSON.stringify({"message": "Hello from mint"}),
  };
  return response
}

exports.handler = async (event) => {
    let response = {
        statusCode: 500,
        body: JSON.stringify({"message": "An unknown error occurred"}),
    };
    try {
      // routing using event.rawPath
      // Routing is not currently required - but might be hany
      console.log(event.rawPath)
      switch(event.rawPath) {
        case '/default/view':
          response = await routeView(event)
          break;
        case '/default/mint':
          response = await routeMint(event)
          break;
        default:
          response = {
              statusCode: 404,
              body: JSON.stringify({"message": "Route not found"}),
          };
      }
    } catch (error) {
      console.log(error)
      response = {
          statusCode: 200,
          body: JSON.stringify({"message": error.message}),
      };
    }
    return response;
};
