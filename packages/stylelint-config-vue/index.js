module.exports = {
  plugins: ['stylelint-prettier'],
  customSyntax: require.resolve('postcss-html'),
  extends: [
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'prettier/prettier': true,
    'block-no-empty': true,
    'declaration-empty-line-before': 'never',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'shorthand-property-no-redundant-values': true,
    'function-url-quotes': 'always',
    'color-hex-length': 'short',
    'color-named': 'never',
    'comment-no-empty': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'no-descending-specificity': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'content'],
      },
    ],
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['each', 'tailwind', 'layer', 'extend', 'apply'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      { ignorePseudoElements: ['v-deep'] },
    ],
  },
}
