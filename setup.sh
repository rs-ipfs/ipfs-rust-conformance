#!/usr/bin/env bash

set -eu
set -o pipefail

npm install

if [ -d "patches" ]; then
    git apply patches/* -p3 --directory node_modules/interface-ipfs-core/
fi
