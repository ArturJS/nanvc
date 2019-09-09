import { VaultClient } from './lib/client'; 

let vault = new VaultClient('http://vault.local:8200');
 
async function main() {
    try {
        /*[ '3527208ad0741e85201a47df839779c35bcf9cb833bf9883ccb967382fa78bbc' ],
     keys_base64: [ 'NScgitB0HoUgGkffg5d5w1vPnLgzv5iDzLlnOC+ni7w=' ],
     root_token: 's.lzHOQJYxXgzHo0GSHfdK9If7' },*/

        /*let initResponse = await vault.init({
            secret_shares: 1,
            secret_threshold: 1
        });
 
        if (initResponse.succeeded) {
            console.log(initResponse);
            vault.token = initResponse.apiResponse.root_token;
            let unsealResponse = await vault.unseal({key: initResponse.apiResponse.keys[0]});
            console.log(unsealResponse);
            if (!unsealResponse.succeeded) {
                throw new Error(unsealResponse.errorMessage);
            }
        } else {
            throw new Error(initResponse.errorMessage);
        }*/

        vault.token = 's.lzHOQJYxXgzHo0GSHfdK9If7';

        console.log(await vault.mounts());

        console.log(await vault.mount('secret', { type: "kv"}));
        // write a secret
        let writeSecretResponse = await vault.write('/secret/my-app/my-secret', { 'foo': 'my-password' });
        console.log(writeSecretResponse);
        // update a secret
        let updateSecretResponse = await vault.update('/secret/my-app/my-secret', { 'foo': 'my-updated-password' });
        console.log(updateSecretResponse);
        // read a secret
        let mySecretQueryResponse = await vault.read('/secret/my-app/my-secret');
        let mySecret = mySecretQueryResponse.succeeded && mySecretQueryResponse.apiResponse.data.foo;
        console.log(mySecretQueryResponse);
        // delete a secret
        let mySecretDeleteQueryResponse = await vault.delete('/secret/my-app/my-secret');
        let mySecretIsDeleted = mySecretDeleteQueryResponse.succeeded;
        console.log(mySecretDeleteQueryResponse);

        console.log(JSON.stringify(await vault.capabilities({token: 's.lzHOQJYxXgzHo0GSHfdK9If7', paths: ['/secret/my-app/my-secret']})));
    } catch (e) {
        throw (e);
    }
 
}
 
main().then().catch(console.error);
