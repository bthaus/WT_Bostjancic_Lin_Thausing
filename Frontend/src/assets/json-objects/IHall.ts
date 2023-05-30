import { Film } from "./IFilm"

export type Halls = Hall[]
export type Seats = Seat[]

export interface Hall {
    ID: number
    numSeats: number
    presentations: Presentation[]
    features: string
    seats: Seat[]
}

export interface Presentation {
    movie: Film
    start: string
    ID: number
    tickets: any[]
}

export interface Seat {
    ID: number
    row: number
    number: number
    type: string
}
