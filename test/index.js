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

// Phase 1.0-ish
tests.miscellaneous(factory, { skip: ['dns', 'resolve'] })

// Phase 1.1

// these are a bit flaky
tests.pubsub(factory)
// these are rarely flaky
tests.swarm(factory)

// Phase 1.2

// this is ignored because the js ipfs-http-client doesn't expose the
// localResolve parameter, and the later versions no longer send Content-Length
// header, which our implementation requires.
tests.dag.get(factory, { skip: ['should get only a CID, due to resolving locally only'] })
tests.dag.put(factory)

tests.block(factory, { skip: ['should error when removing pinned blocks'] })

// these are a bit flaky
tests.bitswap(factory)
tests.root.refs(factory, {
  skip: [
    'should print refs for multiple paths',
    'should follow a path with max depth 2, <hash>/<subdir>',
    'should get refs with max depth of 3',
    'should get refs with max depth of 2',
    'should get refs with recursive and unique option',
    'should recursively follows folders, -r',
    'should follow a path with recursion, <hash>/<subdir>'
  ]
});
tests.root.refsLocal(factory, { skip: ['should get local refs'] });

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
// tests.files(factory)
