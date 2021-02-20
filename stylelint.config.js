module.exports = {
	extends: ['stylelint-config-standard'],
	plugins: ['stylelint-scss'],
	rules: {
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'layer',
				],
			},
		],
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null,
		indentation: null,
		'rule-empty-line-before': null,
		'declaration-empty-line-before': null,
		'at-rule-empty-line-before': null,
		'block-closing-brace-newline-after': null,
		'selector-pseudo-element-colon-notation': null,
		'no-eol-whitespace': null,
		'declaration-colon-newline-after': null,
	},
}
