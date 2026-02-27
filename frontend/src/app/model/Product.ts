import {Category} from './Category';
import {Supplier} from './Supplier';


export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  category: Category;
  dateOfCreation: Date;
  supplier: Supplier;
  description: string;
}
