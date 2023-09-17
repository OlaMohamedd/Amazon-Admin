import { User } from './user';
import { Product } from './product';

export interface Order {
    _id: string;
    user: User;
    products: Product[];
    createdAt: Date;
    __v: number;
    status: string;
}
