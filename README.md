# Node Vers

Gives a listing of all Node versions

## Usage:

You can use node-vers as a module or a CLI utility.

### Using as a module:

```javascript
var nodevers = require('node-vers');

nodevers.list(null, function(err, result) {
  if (err) {
    console.error("Error occurred: " + err);
  } else {
    console.log(result);
  }
});
```

### Using as a CLI utility

```console
> npm install -g node-vers
> node-vers
```

## Alternatives:

- NV: <https://github.com/evanlucas/node-versions>

Differences:

1. NV caches static list of node versions and you need to run an update script if you want to get the latest list.
2. NV grabs the list of versions by looking at the list of tags in Node's github repo. This is pretty cool, but it means: git must be installed wherever you want to use this module + you may get something weird if somebody over at Node accidentally creates a stray git tag.
3. NV only returns the list of versions, while Node-Vers returns an object, for each version, containing following kind of metadata:

    ```
    {   version: 'v5.6.0',
        date: '2016-02-09',
        files: 'headers,linux-arm64,linux-armv6l,linux-armv7l,linux-x64,linux-x86,osx-x64-pkg,osx-x64-tar,src,sunos-x64,sunos-x86,win-x64-msi,win-x86-msi',
        npm: '3.6.0',
        v8: '4.6.85.31',
        uv: '1.8.0',
        zlib: '1.2.8',
        openssl: '1.0.2f',
        modules: '47' }
    ```

3. NV supports both Node.js and IO.js. Since IO.js was merged back into Node, I had no interest in supporting io.js
