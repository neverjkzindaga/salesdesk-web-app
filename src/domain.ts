export type Role = 'ADMIN' | 'SALES_MANAGER' | 'CASHIER'
export type Status = 'ACTIVE' | 'INACTIVE'
export type ProStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED' | 'EXPIRED'
export interface User { id:string; name:string; email:string; role:Role; status:Status; password:string }
export interface Territory { id:string; name:string; kind:'PROVINCE'|'DISTRICT'|'CONSTITUENCY'; parentId?:string }
export interface Beat { id:string; code:string; name:string; description:string; area:string; provinceId?:string; districtId?:string; constituencyIds?:string[]; status:Status; createdAt:string }
export interface Customer { id:string; reference:string; type:'Individual'|'Business'; name:string; phone:string; email:string; address:string; province:string; district:string; constituency:string; beatId:string; notes:string; status:Status; createdAt:string }
export interface Product { id:string; sku:string; name:string; category:string; description:string; unit:string; priceCents:number; reorderLevel:number; status:Status; createdAt:string }
export interface Balance { productId:string; quantity:number; updatedAt:string }
export type MovementType = 'STOCK_IN'|'SALE'|'ADJUSTMENT_IN'|'ADJUSTMENT_OUT'
export interface Movement { id:string; productId:string; type:MovementType; quantity:number; reference:string; notes:string; userId:string; at:string }
export interface Line { productId:string; sku:string; name:string; quantity:number; priceCents:number }
export interface Proforma { id:string; reference:string; customerId:string; beatId:string; lines:Line[]; totalCents:number; status:ProStatus; createdBy:string; issuedAt:string; expiresAt:string; createdAt:string }
export interface Payment { id:string; reference:string; proformaId:string; amountCents:number; tenderedCents:number; changeCents:number; cashierId:string; at:string; status:'CONFIRMED' }
export interface Notification { id:string; type:'REGISTRATION'|'PROFORMA'|'PAYMENT'|'RECEIPT'; to:string; subject:string; body:string; at:string; status:'SIMULATED'|'FAILED' }
export interface InboxNotification { id:string; userId:string; title:string; message:string; href:string; at:string; read:boolean }
export interface AuditEvent { id:string; userId:string; action:string; entity:string; entityId:string; detail:string; at:string }
export interface Settings { appName:string; businessName:string; email:string; phone:string; address:string; tagline:string; expiryDays:number; paymentInstructions:string }
export interface Db { version:2; users:User[]; territories:Territory[]; beats:Beat[]; customers:Customer[]; products:Product[]; balances:Balance[]; movements:Movement[]; proformas:Proforma[]; payments:Payment[]; notifications:Notification[]; inbox:InboxNotification[]; auditEvents:AuditEvent[]; settings:Settings }
export const cents = (value:number) => Math.round(value*100)
export const money = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value/100)
export const today = () => new Date().toISOString()
export const uid = () => crypto.randomUUID()
