#!/bin/bash

.travis/build-condition.sh "$TRAVIS_COMMIT_RANGE" "$PROJECT" && {
	npx yarn install && npx yarn build
}
