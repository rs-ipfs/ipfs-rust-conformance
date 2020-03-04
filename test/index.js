const { createFactory } = require('ipfsd-ctl')
const tests = require('interface-ipfs-core')

// TODO: isNode
// const { isNode } = require('ipfs-utils/src/env')

const isNode = true

const options = {
  type: 'rust',
  ipfsBin: isNode ? process.env.IPFS_RUST_EXEC : undefined,
  test: true,
  disposable: true,
  ipfsHttpModule: require('ipfs-http-client')
}

const factory = createFactory(options)

// Phase 1.1
tests.pubsub(factory)
tests.swarm(factory)
tests.repo(factory)

// Phase 1.2
tests.dag(factory)
tests.block(factory)
tests.bitswap(factory)
// TODO: Refs?

// Phase 2 and beyond...
// tests.object(factory)
// tests.pin(factory)
// tests.bootstrap(factory)
// tests.dht(factory)
// tests.name(factory)
// tests.namePubsub(factory)
// tests.ping(factory)
// tests.key(factory)
// tests.config(factory)
// tests.stats(factory)
// tests.miscellaneous(factory)
// tests.filesRegular(factory)
// tests.filesMFS(factory)
