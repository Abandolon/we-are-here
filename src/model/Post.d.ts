export interface Post {
    prompt: string
    message: string
    location: Location
}

export interface Location {
    latitude: number
    longitude: number
}