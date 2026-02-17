import {Product} from '../model/Product';

export interface ProductModel {
  list: Product[],
  errormessage: string
}
