export type Order = {
    id: number,
    userFirstName: string,
    userLastName: string,
    userID: number,
    orderStatus: 'pending' | 'completed' | 'cancelled',
}