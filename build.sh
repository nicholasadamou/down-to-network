#!/bin/bash

if .travis/build-condition.sh "$TRAVIS_COMMIT_RANGE" "$PROJECT"; then
	cd "$PROJECT" && {
		npx yarn install
		npx yarn build
	}

	exit 0
else
	exit 0
fi
