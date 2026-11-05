# SalesDesk

SalesDesk is a browser-only React and TypeScript prototype for sales teams in Zimbabwe. It demonstrates customer registration, sales beats, product and stock control, pro forma invoices, cash settlement, receipts, a simulated email outbox, and reports. All transactional amounts are USD.

## Run

Requires Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The public home page explains the product; use **Log in** to open the staff workspace. Other scripts: `npm run typecheck`, `npm test`, and `npm run build`.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@salesdesk.demo | demo123 |
| Sales Manager | manager@salesdesk.demo | demo123 |
| Cashier | cashier@salesdesk.demo | demo123 |

These are public demo credentials, not production authentication. The browser session is stored in `sessionStorage`.

## Workflow

1. Sign in as Admin, register a customer, assign a beat, and record incoming stock.
2. Sign in as Sales Manager and create an issued pro forma for that customer. Stock is checked but not deducted.
   Sales Managers can also create beats with province, district, and optional constituency coverage. Customer registration narrows the beat list to the selected location. From the product catalogue, use **Add to cart** to start a pro forma; quantities can be adjusted before issuing or saving a draft.
3. Sign in as Cashier, find the reference under Cash Payments, enter cash received, and confirm. The mock service rechecks stock, stores one payment, deducts stock, records movement, marks the pro forma paid, and creates simulated payment and receipt messages in one browser storage write. Repeating confirmation returns the existing payment.
4. Open the receipt to print or download a PDF. Admin can inspect the notification outbox and reports.

The pro forma is not a tax invoice. No real email or payment provider is connected. No tax rate is assumed. Revenue reports sum confirmed payment amounts, not cash tendered before change.

## Architecture

`src/domain.ts` holds the shared domain types and money helpers. `src/services/store.ts` is the versioned, local browser repository and business operation layer. `src/ui/App.tsx` contains application routes; `src/ui/portal.tsx`, `src/ui/operations.tsx`, `src/ui/territories.tsx`, and `src/ui/dashboard.tsx` contain the updated workspace screens. Styles live under `src/ui/`. The local data key is `salesdesk-demo-v1`; existing version 1 data is upgraded to version 2 without deleting customer or transaction records. Admin can reset all demo data in Settings.

Territories is the customer geography hierarchy: **province → district → constituency**. Beats are separate, flexible business-defined sales routes. Admin can add or edit geographic classifications and beats. The inventory module has separate balances, record-stock, and movement-history screens. Lists include search, filters, and pagination.

The top-right bell shows internal notifications for the signed-in user. Admin and Sales Manager receive customer updates, Cashiers receive issued-pro-forma updates, all active roles receive payment confirmations, and Admin receives stock-movement updates. Admin can review simulated customer emails in the **Email outbox** and changes in the **Audit log**. The account menu supports profile edits and asks for confirmation before logout.

The production frontend should replace the mock store with typed HTTP service implementations and enforce all permissions and transactions on the backend. See [docs/backend-integration.md](docs/backend-integration.md).

## Current scope and limitations

The prototype includes three roles, responsive navigation, customers, territories, beats, products, single-location stock, pro formas, cash confirmation, receipts, simulated notifications, reports, user management, settings, and an MVP 2 roadmap. PDF export is generated from document data with jsPDF; browser print uses A4 styling. Client-side role checks are demonstration controls only.

The current implementation does not yet include editable draft line items after saving, a comprehensive automated browser suite, or a shadcn/ui component library. Passwords and records in browser storage are unsuitable for production. Audit history starts when the version 2 data model is introduced; earlier actions cannot be reconstructed. The roadmap lists Paynow, reconciliation, dispatch, and WhatsApp/SMS as planned features only.
