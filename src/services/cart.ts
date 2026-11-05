import type { Line } from '../domain'
import { read } from './store'

export type CartLine = Pick<Line,'productId'|'quantity'>
const key=(userId:string)=>`salesdesk-proforma-cart-${userId}`

export const readCart=(userId:string):CartLine[]=>{try{const value=JSON.parse(sessionStorage.getItem(key(userId))||'[]') as CartLine[];return Array.isArray(value)?value.filter(line=>typeof line.productId==='string'&&Number.isInteger(line.quantity)&&line.quantity>0):[]}catch{return []}}
export const saveCart=(userId:string,lines:CartLine[])=>sessionStorage.setItem(key(userId),JSON.stringify(lines))
export const clearCart=(userId:string)=>sessionStorage.removeItem(key(userId))
export const addToCart=(userId:string,productId:string,quantity=1)=>{const db=read(),product=db.products.find(p=>p.id===productId&&p.status==='ACTIVE'),available=db.balances.find(b=>b.productId===productId)?.quantity??0;if(!product)throw new Error('Product unavailable');const lines=readCart(userId),current=lines.find(line=>line.productId===productId)?.quantity??0;if(!Number.isInteger(quantity)||quantity<1||current+quantity>available)throw new Error(`Only ${available} units of ${product.name} are available`);const next=current?lines.map(line=>line.productId===productId?{...line,quantity:line.quantity+quantity}:line):[...lines,{productId,quantity}];saveCart(userId,next);return next}
