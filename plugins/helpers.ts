type Dictionary<T> = { [key: string]: T }

export function searchForSuitableParent(
	startingEl: HTMLElement,
	cssProperties: Dictionary<string | string[]>,
): HTMLElement | null {
	let suitableParent: HTMLElement | null = null,
		el: HTMLElement | null = startingEl.parentElement
	while (suitableParent === null && el !== null) {
		for (const key in cssProperties) {
			if (Object.prototype.hasOwnProperty.call(cssProperties, key)) {
				const value = cssProperties[key],
					styleValue = getComputedStyle(el)[key]

				if (typeof value === 'string') {
					if (styleValue === value) {
						suitableParent = el
						// eslint-disable-next-line no-continue
						continue
					} else break
				} else if (value.includes(styleValue)) {
					suitableParent = el
					// eslint-disable-next-line no-continue
					continue
				} else {
					suitableParent = null
					break
				}
			}
		}
		el = el.parentElement
	}
	return suitableParent
}
