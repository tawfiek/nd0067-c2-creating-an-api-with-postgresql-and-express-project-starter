export type Order = {
    id: number;
    userFirstName: string;
    userLastName: string;
    userID: number;
    orderStatus?: 'pending' | 'completed' | 'cancelled';
};

export type OrderDTO = {
    userID: number;
    products: Array<{ productID: number; quantity: number }>;
};
