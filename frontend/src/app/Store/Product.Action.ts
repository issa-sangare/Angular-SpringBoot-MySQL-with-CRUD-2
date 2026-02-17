import {createAction, props} from '@ngrx/store';
import {Product} from '../model/Product';

export const LOAD_PRODUCT = 'product getall'
export const LOAD_PRODUCT_SUCCESS = 'product getall success'
export const LOAD_PRODUCT_FAIL = 'product getall fail'

const loadProduct = createAction(LOAD_PRODUCT)
const loadProductSuc = createAction(LOAD_PRODUCT_SUCCESS, props<{list:Product[]}>())
const loadProductFail = createAction(LOAD_PRODUCT_FAIL)
