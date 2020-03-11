const { createFactory } = require('ipfsd-ctl')
const tests = require('interface-ipfs-core')

const isNode = (process && process.env)

const options = {
  type: 'rust',
  ipfsBin: isNode ? require('rust-ipfs-dep').path() : undefined,
  test: true,
  disposable: true,
  ipfsHttpModule: require('ipfs-http-client')
}

const factory = createFactory(options)

// Phase 1.1
tests.repo(factory)
tests.pubsub(factory)
tests.swarm(factory)

// Phase 1.2
tests.dag(factory)
tests.block(factory)
tests.bitswap(factory)

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
// tests.files(factory)
