export type Films = Film[]

export interface Film {
    id: number
    presentations: string[]
    reviews: any[]
    name: string
    description: string
    duration: number
    minimumAge: number
}
