export type Reviews = Review[]

export interface Review {
    id: number
    name: string
    rating: number
    review: string
    movieID: number
}
