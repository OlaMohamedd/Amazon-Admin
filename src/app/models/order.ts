import { User } from './user';
import { Product } from './product';

export interface Order {
    user:User;
    products:Product[];
}
