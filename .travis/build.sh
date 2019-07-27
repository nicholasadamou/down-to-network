#!/bin/bash

# Print commands and their arguments as they are executed.
set -x

# Define $TRAVIS_COMMIT_RANGE & $PROJECT
TRAVIS_COMMIT_RANGE="$1"
PROJECT="$2"

# Make sure both $TRAVIS_COMMIT_RANGE & $PROJECT are defined
# before proceeding.
if [[ -z $TRAVIS_COMMIT_RANGE ]]; then
    echo "\$TRAVIS_COMMIT_RANGE must not be empty."
    exit 1
fi

if [[ -z $PROJECT ]]; then
    echo "Skipping because \$PROJECT is not defined."
    exit 0
fi

# Check if $PROJECT folder contains any differences compared to the
# last commit.
if git diff --name-only "$TRAVIS_COMMIT_RANGE" | sort -u | uniq | grep "$PROJECT" > /dev/null; then
	# If there are differences, then change directory to $PROJECT.
	cd "$PROJECT" && {
		npx yarn install # Install dependencies.
		npx yarn build # Build the project.
	}
else
	echo "Skipping because diff $TRAVIS_COMMIT_RANGE doesn't indicate any changes that were made in $PROJECT."
fi
