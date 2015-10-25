example:
	@open http://localhost:3000/example/index.html
	@glup

dev:
	@open http://localhost:8080/bundle
	@webpack-dev-server 'mocha!./test/test.js' --inline --hot

test:
	@./node_modules/.bin/karma start

doc:
	@ghp-import example -n -p

.PHONY: test example
