let handler = require('./index.js');
const test_address = "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7"
const test_tokenId = "4565"

const test_event = {
"version":"2.0",
"routeKey":"ANY /test-web3-function",
"rawPath":"/default/test-web3-function",
"rawQueryString":"a=adrr&t=123",
"headers":{
"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"accept-encoding":"gzip, deflate, br",
"accept-language":"en-US,en;q=0.9",
"content-length":"0",
"host":"3i07yfpvl5.execute-api.eu-west-1.amazonaws.com",
"sec-ch-ua":"\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
"sec-ch-ua-mobile":"?0",
"sec-fetch-dest":"document",
"sec-fetch-mode":"navigate",
"sec-fetch-site":"none",
"sec-fetch-user":"?1",
"upgrade-insecure-requests":"1",
"user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
"x-amzn-trace-id":"Root=1-611a9819-487c4c1b23eeab876d402339",
"x-forwarded-for":"37.228.249.239",
"x-forwarded-port":"443",
"x-forwarded-proto":"https"
},
"queryStringParameters":{
"a":test_address,
"t":test_tokenId
},
"requestContext":{
"accountId":"638423662509",
"apiId":"3i07yfpvl5",
"domainName":"3i07yfpvl5.execute-api.eu-west-1.amazonaws.com",
"domainPrefix":"3i07yfpvl5",
"http":{
"method":"GET",
"path":"/default/test-web3-function",
"protocol":"HTTP/1.1",
"sourceIp":"37.228.249.239",
"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
},
"requestId":"EKyz8iJojoEEJIA=",
"routeKey":"ANY /test-web3-function",
"stage":"default",
"time":"16/Aug/2021:16:53:45 +0000",
"timeEpoch":1629132825014
},
"isBase64Encoded":false
}
async function run() {
  const response = await handler.handler( test_event );
  console.log(response)
}

run()
