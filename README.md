# node-versions-list
Gives a listing of all Node versions

## Alternatives:

- NV: <https://github.com/evanlucas/node-versions>

Differences:

1. NV caches static list of node versions and you need to run an update script if you want to get the latest
2. NV grabs the list of versions by looking at the list of tags in Node's github repo. This is pretty cool, but it means: git must be installed wherever you want to use this module + you may get something weird if somebody over at Node accidentally creates a stray git tag.
3. NV supports both Node.js and IO.js, since IO.js was merged back into Node, I had no interest in supporting io.js
