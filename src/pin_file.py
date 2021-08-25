import requests
from requests.auth import HTTPBasicAuth
from os import walk

"""
Upload and pin a local file to the infura IPFS service.
Output the ipfs.io public gateway URL to the pinned file.
"""

filename = "ARTEarlyAccessTokenMetadata.json"
PROJECT_ID = "1wrdoJiphQptNg922Y6EPAMCCRV"
PROJECT_SECRET = "2254265db23712aaf3eed3c98feed269"




for (dirpath, dirnames, filenames) in walk('files_to_pin'):
    for filename in filenames:
        with open('files_to_pin/'+filename, 'rb') as f:
            form_data = {
            'file': f
            }
            r = requests.post('https://ipfs.infura.io:5001/api/v0/add', files = form_data, auth=HTTPBasicAuth(PROJECT_ID, PROJECT_SECRET))
            print("Request response:")
            json_reponse = r.json()
            print(json_reponse)
            output = f"https://ipfs.io/ipfs/{json_reponse['Hash']}"
            print(output)
