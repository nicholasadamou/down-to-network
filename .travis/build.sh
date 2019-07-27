#!/bin/bash

set -x

if [[ -z $1 ]]; then
    echo "\$TRAVIS_COMMIT_RANGE must be defined."
    exit 1
fi

if [[ -z $2 ]]; then
    echo "Skipping because \$PROJECT is not defined."
    exit 0
fi

git diff --name-only "$1" | sort -u | uniq | grep "$2" > /dev/null

cd "$PROJECT" && {
	npx yarn install
	npx yarn build
}

