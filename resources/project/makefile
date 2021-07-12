SHELL := /bin/bash
# @see https://victoria.dev/blog/how-to-create-a-self-documenting-makefile/
.POSIX:

# @see https://spin.atomicobject.com/2021/03/22/makefiles-vs-package-json-scripts/
# base commands
WYVR_BUILD=node ./index.js

prod: ## Start production build
	@$(WYVR_BUILD)

dev: ## Start development build
	@env WYVR_ENV=dev $(WYVR_BUILD)

debug: ## Start debug build
	@env WYVR_ENV=debug $(WYVR_BUILD)

init: ## Install and prepare setup
	@npm install

serve: ## start simple http server after production build
	@$(WYVR_BUILD)
	@echo ""
	@npx http-server ./pub

cron: ## start wyr in preview mode
	@env WYVR_ENV=prod $(WYVR_BUILD) cron
