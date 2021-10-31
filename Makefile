fetch:
	deno run --allow-net --allow-read --allow-write fetch_script/index.ts


watch:
	yarn --cwd app && yarn --cwd app start

build:
	yarn --cwd app && yarn --cwd app build && rm -rf ./docs/* && mv ./app/build/* ./docs && echo "Build ready, please commit all files (especially docs/) and push to actually deploy"

deploy:
	make build && git add . && git co -m 'deploy' && git push

