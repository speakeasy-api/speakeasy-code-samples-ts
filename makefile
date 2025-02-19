.PHONY: dev

dev:
	@echo "👀 Watching for changes..."
	@nodemon -x "npm run build || exit 1" -w src -e tsx

