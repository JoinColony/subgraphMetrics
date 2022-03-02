#!/bin/bash

while [ $# -gt 0 ]; do
  case "$1" in
    --skip-colony-network-build)
      SKIP_COLONY_NETWORK_BUILD=true
      ;;
    --skip-server-build)
      SKIP_SERVER_BUILD=true
      ;;
    *)
      echo "Invalid argument: $1"
      exit 1
  esac
  shift
done

# Paths
LIB_PATH="lib"
ENV_FILE="./.env"

NETWORK="colonyNetwork"

ROOT_PATH=$(pwd)

YARN="${ROOT_PATH}/node_modules/.bin/yarn"

log() {
  # Colors
  GREEN=`tput setaf 2`
  NC=`tput sgr0`
  # Weights
  BOLD=`tput bold`
  echo "${GREEN}${BOLD}$1${NC}"
}

warn() {
  # Colors
  RED=`tput setaf 3`
  NC=`tput sgr0`
  # Weights
  BOLD=`tput bold`
  echo
  echo "${RED}${BOLD}$1${NC}"
  echo
}

err() {
  # Colors
  RED=`tput setaf 1`
  NC=`tput sgr0`
  # Weights
  BOLD=`tput bold`
  echo
  echo "${RED}${BOLD}$1${NC}"
  echo
}

# Setup the dapp's env file
if [ -f "$ENV_FILE" ]; then
    warn "The Dapp .env file already exists, skipping generating it"
else
    log "Generating the \"Dapp's\" submodule .env file"
    cp .env.example .env
fi

# Update / re-pull submodules
log "Initialize submodule libs"
git submodule update --init --recursive

if [ "$SKIP_COLONY_NETWORK_BUILD" != true ]
then
    # Build network
    log "Building '${NETWORK}' submodule"
    cd "${ROOT_PATH}/${LIB_PATH}/${NETWORK}"
    git submodule update --init --recursive
    $YARN --pure-lockfile
    $YARN provision:token:contracts
    cd ${ROOT_PATH}
else
    warn "Skipping '${NETWORK}' submodule provision"
fi