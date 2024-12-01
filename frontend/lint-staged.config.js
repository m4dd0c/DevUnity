export default {
  "*.jsx": ["npx eslint --fix", "prettier --write"],
  "*.js": ["npx eslint --fix", "prettier --write"],
  "*.tsx": ["npx eslint --fix", "prettier --write", "tsc --noEmit"],
  "*.ts": ["npx eslint --fix", "prettier --write", "tsc --noEmit"],
  "*.css": ["prettier --write"],
  "*.json": ["prettier --write"],
};
