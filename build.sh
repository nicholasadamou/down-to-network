#!/bin/bash

PROJECT_DIRECTORY=$(.travis/build-condition.sh "$TRAVIS_COMMIT_RANGE" "$PROJECT")

[ -d "$PROJECT_DIRECTORY" ] && \
	cd "$PROJECT_DIRECTORY" && \
		npx yarn install && npx yarn build
