#!/bin/bash

# Print commands and their arguments as they are executed.
set -x

# Make sure both $TRAVIS_COMMIT_RANGE & $PROJECT are defined
# before proceeding.
if [[ -z $1 ]]; then
    echo "\$TRAVIS_COMMIT_RANGE must not be empty."
    exit 1
fi

if [[ -z $2 ]]; then
    echo "Skipping because \$PROJECT is not defined."
    exit 0
fi

# Check if $PROJECT folder contains any differences compared to the
# last commit.
git diff --name-only "$1" | sort -u | uniq | grep "$2" > /dev/null && {
	# If there are differences, then change directory to $PROJECT.
	cd "$PROJECT" && {
		npx yarn install # Install dependencies.
		npx yarn build # Build the project.
	}
}
