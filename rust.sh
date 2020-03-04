# I had RUST_IPFS_EXEC env variable point to this script
# and a symlink in the same directory to point to the `http` binary.
#
# This will leak http processes at least in some failure cases.

set -e
trap 'on_killed $? $LINENO' EXIT

on_killed () {
        # this never happens when the "leak" case happens
        echo "<<<< killed (retval: $1, lineno: $2) $$" >> /tmp/rust.log
}

echo ">>>> new execution $$ with args: $@" >> /tmp/rust.log
./http "$@" 2>&1 | tee -a /tmp/rust.log
echo "<<<< exiting $$" >> /tmp/rust.log