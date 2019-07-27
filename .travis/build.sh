#!/bin/bash

set -x

if [[ -z $1 ]]; then
    echo "Commit range cannot be empty"
    exit 1
fi

if git diff --name-only "$1" | sort -u | uniq | grep "$2" > /dev/null; then
	cd "$PROJECT" && {
		npx yarn install
		npx yarn build
	}
fi

