#!/usr/bin/env bash

set -eu
set -o pipefail

npm install

if [ -d "patches" ]; then
    echo "Applying patches..."
    # as we want to apply the patches create in a js-ipfs checkout to our node_modules
    # we'll need to remove a few leading path segments to match
    # a/packages/interface-ipfs-core/src/refs.js to node_modules/interface-ipfs-core/src/refs.js
    #
    # applying these patches on js-ipfs checkout does not require any extra arguments.
    git apply --verbose patches/* -p3 --directory node_modules/interface-ipfs-core/
fi
