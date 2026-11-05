import { Link } from 'react-router-dom'
import type { Db } from '../domain'
import { money } from '../domain'
import { Pager, usePage } from './portal'

export function ProTable({db,rows}:{db:Db;rows:Db['proformas']}){
 const p=usePage(rows,10)
 return <><div className="tablewrap"><table><thead><tr><th>Reference</th><th>Customer</th><th>Beat</th><th>Issued</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>{p.slice.map(pro=><tr key={pro.id}><td><Link className="strong-link" to={`/proformas/${pro.id}`}>{pro.reference}</Link></td><td>{db.customers.find(c=>c.id===pro.customerId)?.name||'—'}</td><td>{db.beats.find(b=>b.id===pro.beatId)?.name||'—'}</td><td>{new Date(pro.createdAt).toLocaleDateString('en-ZW',{day:'2-digit',month:'short',year:'numeric'})}</td><td>{money(pro.totalCents)}</td><td><span className={`badge badge-${pro.status.toLowerCase()}`}>{pro.status}</span></td><td><Link to={`/proformas/${pro.id}`}>View →</Link></td></tr>)}</tbody></table>{!rows.length&&<div className="empty">No pro formas found.</div>}</div><Pager {...p} onPage={p.setPage}/></>
}
