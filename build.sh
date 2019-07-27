#!/bin/bash

.travis/build-condition.sh "$TRAVIS_COMMIT_RANGE" "$PROJECT" && \
	[ -d "$PROJECT" ] && \
		cd "$PROJECT" && \
			npx yarn install && npx yarn build
