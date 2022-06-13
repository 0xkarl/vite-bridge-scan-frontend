run: node_modules
	@yarn dev

lint:
	@yarn $@

node_modules:
	@yarn

.PHONY: \
	run \
	lint