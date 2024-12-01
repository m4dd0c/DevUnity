module.exports = {
	"*.jsx": ["eslint --fix", "prettier --write"],
	"*.js": ["eslint --fix", "prettier --write"],
	"*.tsx": ["eslint --fix", "prettier --write", "tsc --noEmit"],
	"*.ts": ["eslint --fix", "prettier --write", "tsc --noEmit"],
	"*.css": ["prettier --write"],
	"*.json": ["prettier --write"],
};
