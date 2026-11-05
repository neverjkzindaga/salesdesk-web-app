# SalesDesk

SalesDesk is a browser-only React and TypeScript prototype for sales teams in Zimbabwe. It demonstrates customer registration, sales beats, product and stock control, pro forma invoices, cash settlement, receipts, a simulated email outbox, and reports. All transactional amounts are USD.

## Run

Requires Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Other scripts: `npm run typecheck`, `npm test`, and `npm run build`.

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
3. Sign in as Cashier, find the reference under Cash Payments, enter cash received, and confirm. The mock service rechecks stock, stores one payment, deducts stock, records movement, marks the pro forma paid, and creates simulated payment and receipt messages in one browser storage write. Repeating confirmation returns the existing payment.
4. Open the receipt to print or download a PDF. Admin can inspect the notification outbox and reports.

The pro forma is not a tax invoice. No real email or payment provider is connected. No tax rate is assumed. Revenue reports sum confirmed payment amounts, not cash tendered before change.

## Architecture

`src/domain.ts` holds the shared domain types and money helpers. `src/services/store.ts` is the versioned, local browser repository and business operation layer. `src/ui/App.tsx` contains the application routes and screens, while `src/ui/style.css` defines the visual system. The local data key is `salesdesk-demo-v1`, initialized once per browser profile. Admin can reset all demo data in Settings.

The production frontend should replace the mock store with typed HTTP service implementations and enforce all permissions and transactions on the backend. See [docs/backend-integration.md](docs/backend-integration.md).

## Current scope and limitations

The prototype includes three roles, responsive navigation, customers, territories, beats, products, single-location stock, pro formas, cash confirmation, receipts, simulated notifications, reports, user management, settings, and an MVP 2 roadmap. PDF export is generated from document data with jsPDF; browser print uses A4 styling. Client-side role checks are demonstration controls only.

The current implementation does not yet include full pagination, editable draft line items after saving, province/district/constituency management forms, comprehensive automated browser tests, or a shadcn/ui component library. Passwords and records in browser storage are unsuitable for production. The roadmap lists Paynow, reconciliation, dispatch, and WhatsApp/SMS as planned features only.
