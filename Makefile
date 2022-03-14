run: node_modules
	@yarn dev

lint:
	@yarn $@

node_modules:
	@yarn

deploy:
	@yarn build
	@surge -d vite-bridge-scan.surge.sh dist

.PHONY: \
	run \
	lint