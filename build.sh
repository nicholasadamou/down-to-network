#!/bin/bash

[ -d "$PROJECT" ] && \
		cd "$PROJECT" && \
			npx yarn install && npx yarn build
