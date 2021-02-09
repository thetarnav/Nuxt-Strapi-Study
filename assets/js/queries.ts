import { gql } from 'graphql-request'

export const categoriesQuery = gql`
	{
		categories {
			id
			name
			uid
		}
	}
`
export interface CategoriesResponse {
	categories: {
		name: string
		uid: string
		id: string | null
	}[]
}

export const countNewQuery = gql`
	query CountNew($timestamp: Float) {
		productsConnection(where: { timestamp_gte: $timestamp }) {
			aggregate {
				count
			}
		}
	}
`
export const countAvailableQuery = gql`
	query CountAvailable {
		productsConnection(where: { isAvailable: true }) {
			aggregate {
				count
			}
		}
	}
`
const countResponse = {
	productsConnection: {
		aggregate: {
			count: 7,
		},
	},
}
export type CountResponse = typeof countResponse
