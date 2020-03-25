const { createFactory } = require('ipfsd-ctl')
const tests = require('interface-ipfs-core')
const isDev = process.env.IPFS_RUST_EXEC

const isNode = (process && process.env)

const ipfsBin = isNode ?
  process.env.IPFS_RUST_EXEC ? process.env.IPFS_RUST_EXEC : require('rust-ipfs-dep').path()
    : undefined

const options = {
  type: 'rust',
  ipfsBin,
  test: true,
  disposable: true,
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsOptions: {
    init: {
      bits: 2048
    }
  }
}

const factory = createFactory(options)

// Phase 1.1
tests.pubsub(factory)
tests.swarm(factory)

// Phase 1.2
// tests.dag(factory)
// tests.block(factory)
// tests.bitswap(factory)

// Phase 2 and beyond...
// tests.repo(factory)
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
tests.miscellaneous(factory, { skip: ['dns', 'resolve'] })
// tests.files(factory)
