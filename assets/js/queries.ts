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

const productThumbnail = gql`
	fragment ProductThumbnail on Products {
		id
		title
		isAvailable
		views
		timestamp
		thumbnail {
			url
			formats
		}
	}
`

export const availableProductsQuery = gql`
	query AvailableProducts($start: Int) {
		products(
			sort: "timestamp:desc"
			where: { isAvailable: true }
			limit: 10
			start: $start
		) {
			...ProductThumbnail
		}
	}
	${productThumbnail}
`
export const newProductsQuery = gql`
	query NewProducts($start: Int, $timestamp: Float) {
		products(
			sort: "timestamp:desc"
			where: { timestamp_gte: $timestamp }
			limit: 10
			start: $start
		) {
			...ProductThumbnail
		}
	}
	${productThumbnail}
`
export const productsOfCategoryQuery = gql`
	query ProductsOfCategory($id: ID!, $start: Int) {
		category(id: $id) {
			products(sort: "timestamp:desc", limit: 10, start: $start) {
				...ProductThumbnail
			}
		}
	}
	${productThumbnail}
`
export const allProductsQuery = gql`
	query AllProducts($start: Int) {
		products(sort: "timestamp:desc", limit: 10, start: $start) {
			...ProductThumbnail
		}
	}
	${productThumbnail}
`
export const noCategoryProductsQuery = gql`
	query WithoutCategoryProducts($start: Int) {
		products(
			sort: "timestamp:desc"
			where: { category_null: true }
			limit: 10
			start: $start
		) {
			...ProductThumbnail
		}
	}
	${productThumbnail}
`
interface ImageFromat {
	url: string
	height: number
	width: number
}
interface Image extends ImageFromat {
	formats: {
		thumbnail: ImageFromat
		small: ImageFromat
		medium: ImageFromat
		large: ImageFromat
	}
}
export interface ProductThumbnail {
	id: string
	title: string
	isAvailable: boolean
	views: number
	timestamp: number
	thumbnail: Image
}
export interface ProductsResponse {
	products?: ProductThumbnail[]
	category?: {
		products: ProductThumbnail[]
	}
}
