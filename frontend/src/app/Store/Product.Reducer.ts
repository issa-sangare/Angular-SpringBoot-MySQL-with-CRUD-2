import {createReducer} from '@ngrx/store';
import {productState} from './Product.State';

const _productReducer = createReducer(productState);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
