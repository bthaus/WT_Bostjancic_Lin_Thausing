export interface Users {
    userlist: User[]
}

export interface User {
    ID: number
    username: string
    password: string
    type: string
    tickets: Tickets
}

export type Tickets = Ticket[]
export interface Ticket {
    movieID: number
    movieName: string
    deadline: string
    presentation: string
    hall: number
    seats: Seats
}

export type Seats = Seat[]
export interface Seat {
    row: number
    column: number
}