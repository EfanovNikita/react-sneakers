export interface Sneaker extends Item {
    id: number
}

export interface Item {
    url: string,
    title: string,
    price: number
}