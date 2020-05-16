export interface Post {
    id: string
    timestamp: string
    prompt: string
    message: string
    location: Location
}

export interface Location {
    latitude: number
    longitude: number
}