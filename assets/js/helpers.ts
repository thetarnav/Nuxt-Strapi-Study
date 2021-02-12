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

export function validateEmail(email: string): boolean {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export function camelToLabel(string: string): string {
	const search = string.match(/([A-Z][a-z]+|[A-Z]|[a-z]+)/g)
	if (search === null) return string
	let newString = search.join(' ')
	newString = newString[0].toUpperCase() + newString.slice(1).toLowerCase()

	return newString
}

export const random = (
	min: number,
	max: number,
	mathFunc: string | null = null,
): number => {
	const w = Math.random() * (max - min) + min
	return !mathFunc ? w : Math[mathFunc]?.(w) ?? w
}
