module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'prefer-const': 'off',
    /** There were some issues with named lodash imports, so it had to be disabled. */
    'import/named': 'off',
  },
};
