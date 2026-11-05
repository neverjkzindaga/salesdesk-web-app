import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Dashboard } from './dashboard'
import { Landing, ModernShell } from './portal'
import { CustomerList } from './operations'
import { BeatManagement } from './beats'
import { ProformaCart } from './proforma-cart'
import * as store from '../services/store'

beforeEach(()=>{localStorage.clear();sessionStorage.clear();store.reset()})
afterEach(()=>cleanup())

describe('enhanced workspace',()=>{
 it('shows a public home page with a login path and contact information',()=>{const db=store.read();render(<MemoryRouter><Landing db={db}/></MemoryRouter>);expect(screen.getByText('Keep your business')).toBeTruthy();expect(screen.getByRole('link',{name:/Log in/i})).toBeTruthy();expect(screen.getByText(db.settings.email)).toBeTruthy()})
 it('keeps reports off the cashier dashboard',()=>{const db=store.read(),cashier=db.users.find(u=>u.role==='CASHIER')!;render(<MemoryRouter><Dashboard db={db} user={cashier}/></MemoryRouter>);expect(screen.getByText('Find a pro forma. Confirm the cash. Print the receipt.')).toBeTruthy();expect(screen.queryByText('Revenue by beat')).toBeNull();expect(screen.queryByText('View reports')).toBeNull()})
 it('asks before logging out',()=>{const db=store.read(),user=db.users[0],logout=vi.fn();render(<MemoryRouter><ModernShell db={db} user={user} onLogout={logout}><div>Workspace</div></ModernShell></MemoryRouter>);fireEvent.click(screen.getByRole('button',{name:'Account menu'}));fireEvent.click(screen.getByRole('button',{name:/Log out/i}));expect(screen.getByText('Log out of SalesDesk?')).toBeTruthy();expect(logout).not.toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Stay signed in'}));expect(logout).not.toHaveBeenCalled()})
 it('filters customers by province and paginates the table',()=>{const db=store.read();render(<MemoryRouter><CustomerList db={db}/></MemoryRouter>);expect(screen.getByRole('button',{name:'Next'})).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'Next'}));expect(screen.getByRole('button',{name:'Previous'})).toBeTruthy();fireEvent.change(screen.getByRole('combobox',{name:'Filter province'}),{target:{value:'Bulawayo'}});expect(screen.getByText('4 customers')).toBeTruthy();expect(screen.queryByRole('button',{name:'Next'})).toBeNull()})
 it('lets a sales manager open the geography based beat form',()=>{const db=store.read(),user=db.users.find(u=>u.role==='SALES_MANAGER')!;render(<MemoryRouter><BeatManagement db={db} user={user}/></MemoryRouter>);fireEvent.click(screen.getByRole('button',{name:'Add beat'}));expect(screen.getByText('Create a beat')).toBeTruthy();expect(screen.getByText('Constituency coverage')).toBeTruthy();expect(screen.getByRole('combobox',{name:'Province *'})).toBeTruthy()})
 it('adds a product to the pro forma cart and updates its quantity',()=>{const db=store.read(),user=db.users.find(u=>u.role==='SALES_MANAGER')!,product=db.products[0];render(<MemoryRouter><ProformaCart db={db} user={user}/></MemoryRouter>);fireEvent.click(screen.getByRole('button',{name:`Add ${product.name} to cart`}));expect(screen.getByText('Cart')).toBeTruthy();expect(screen.getByRole('spinbutton',{name:`${product.name} quantity`}).getAttribute('value')).toBe('1');fireEvent.click(screen.getByRole('button',{name:`Increase ${product.name}`}));expect(screen.getByRole('spinbutton',{name:`${product.name} quantity`}).getAttribute('value')).toBe('2')})
})
