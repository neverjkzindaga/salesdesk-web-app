# Backend integration contract

The production backend is expected to use Spring Boot REST APIs and PostgreSQL. Replace the browser repository in `src/services/store.ts` with typed service clients. Do not copy the demo password or storage behavior into production.

## Core services

- Authentication: login, session/current user, logout; enforce ADMIN, SALES_MANAGER, and CASHIER permissions server side.
- Customers: list with search/filter/page, detail, create, update, activate/deactivate, history.
- Territories and beats: list hierarchy, create/update classifications and beats, assign customers.
- Products: catalogue CRUD, status, price snapshots.
- Inventory: balances, movements, stock receipt, adjustment. Every quantity change must have an auditable movement.
- Pro formas: list, detail, draft creation/edit, issue, cancel, expiry, immutable issued financial snapshots.
- Payments: `confirmCashPayment(proformaId, cashTenderedMinorUnits, idempotencyKey)` is one transactional operation. It validates invoice state and expiry, rechecks stock, creates payment/receipt, deducts stock and movements, and marks paid. Duplicate retries return the original result. Reject insufficient stock or tendered cash without partial writes.
- Notifications: create delivery jobs through an outbox; expose send/failure state. The frontend must distinguish simulation from actual delivery.
- Reports: paid revenue only, cash collection, inventory and beat views derived from authoritative transactions.
- Settings and users: role-scoped management.

Use integer USD cents in API contracts and stable IDs. Return consistent validation and conflict errors (for example, invalid transition, insufficient stock, already paid). The backend must own reference generation and concurrent payment locking. Treat browser permissions as display hints; the server is authoritative.
