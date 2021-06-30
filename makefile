SHELL := /bin/bash
# @see https://victoria.dev/blog/how-to-create-a-self-documenting-makefile/
.POSIX:

# @see https://spin.atomicobject.com/2021/03/22/makefiles-vs-package-json-scripts/
# base commands
WYVR_COMPILE=npx tsc

help: ## Show this help
	@echo "Usage: make [TARGET ...]"
	@grep --no-filename -E '^[a-zA-Z_%-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compile: ## compiles the lib from ts to js
	@$(WYVR_COMPILE)

watch: ## Start watcher and make dev builds
	@$(WYVR_CLEAN)
	@$(WYVR_FOLDERS)
	@env WYVR_ENV=dev $(WYVR_COMPILE) -w
