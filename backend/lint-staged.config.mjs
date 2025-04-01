export default {
  "*.jsx": ["npx eslint --fix", "prettier --write"],
  "*.js": ["npx eslint --fix", "prettier --write"],
  "*.tsx": ["npx eslint --fix", "prettier --write"],
  "*.ts": ["npx eslint --fix", "prettier --write"],
  "*.css": ["prettier --write"],
  "*.json": ["prettier --write"],
};
