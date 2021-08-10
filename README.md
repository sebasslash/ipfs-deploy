# IPFS Deploy Tool

This is a simple CLI tool to deploy a static website to IPFS. There is a similar tool by the same name, [ipfs-deploy](https://github.com/ipfs-shipyard/ipfs-deploy) which is more mature & featureful than this one. Either way, we encourage you to try this one if simplicity is more your speed.


## How to install
```bash
npm i -g ipfs-deploy-ts
```

## How to use
```bash
ipfs-deploy -p /path/to/project
```

and voila!


### Future Plans
- [ ] Select a specific URL to for the IPFS HTTP API client using the `-u` flag
- [ ] API fallback when a connection fails
- [ ] Publish to multiple HTTP clients


