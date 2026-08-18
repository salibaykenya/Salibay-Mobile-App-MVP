# Salibay Mobile App — Production UX Specification & Prototype

This repository contains the mobile prototype for **Salibay**, designed as the visual, design system, and UX source of truth for the production Expo application.

---

# Production Handoff — Search Architecture

## 1. Standard Storefront Browsing
The production Expo mobile app retrieves its standard browse catalog directly from the **Shopify Storefront API**:
* **Surfaces**: Home screen, Categories, Subcategories, Collections, Flash Deals, Recommendations, and default product grids.
* **Scope**: Normal browsing represents products already available in the Salibay Shopify storefront catalog.
* **UX Treatment**: Standard storefront items appear as normal Salibay products with customer-friendly fulfillment indicators (e.g. `⚡ Fast Delivery`, `Est. Delivery: Tomorrow`, `COD Eligible`).

## 2. Global Product Discovery (Search-Only)
Global products are **NOT** stored in a browsable in-app catalog and do not exist as static category listings or standalone navigation tabs:
* **Entry Point**: Global product discovery occurs **exclusively when a customer performs a search**.
* **Production Flow**:
  1. Customer enters a query in the Search Bar (e.g., "MacBook Pro M4", "Dyson Airwrap").
  2. Expo Mobile App sends the query to the **existing Salibay Search Engine endpoint**.
  3. The existing Salibay Search Engine executes its authoritative source-selection and sourcing logic.
  4. The Search Engine returns the appropriate matching results (both local and international).
  5. The Expo Mobile App renders the response, clearly marking international items with `✈️ Salibay Global`, estimated air cargo transit time, and upfront landed cost pricing (customs & duties included).

## 3. Authoritative Routing Logic
* The production mobile app **MUST NOT** recreate, manage, or duplicate routing logic.
* The Salibay Search Engine remains the single source of truth for inventory location, source selection, and search ranking.
* The mobile client's responsibilities are strictly:
  1. Collecting the search query and active user filter preferences.
  2. Sending requests to the Search Engine.
  3. Rendering returned products.
  4. Managing customer interactions, cart additions, and secure prepaid checkout.

## 4. Prototype Mocking vs Production Reality
* **Mock Simulation in Prototype**: This prototype uses a client-side mock product dataset and local filter predicates (`origin === 'local'`, `origin === 'international'`) solely to simulate and demonstrate the end-to-end UX flow inside a sandboxed client environment.
* **Production Implementation**: Do **NOT** maintain a static global product catalog or reproduce client-side origin filtering in the production Expo app. Connect search input directly to the production Search API.

## 5. Production Responsibility for Codex Handoff

### What Codex SHOULD Reproduce:
* **UX Architecture & Hierarchy**: Single-screen focused flows, navigation transitions, bottom sheet actions, sticky action bars, and modal sheets.
* **Visual Identity & Design System**: Exact color tokens (Salibay Pink `#E6007E`, Emerald `#22C55E`, Slate/Zinc neutrals), mathematical spacing, font hierarchy, and border radius nesting.
* **Component Patterns**: Product cards, search auto-suggestions, filter bottom sheets, landed cost transparent breakdowns, variant selectors, M-Pesa STK push simulation dialogs, Pesapal card forms, and multi-step order tracking timeline.
* **Copywriting Standards**: Clean, customer-centric marketplace language (`Search millions of products`, `Fast Delivery`, `Salibay Global`, `Zero Hidden Fees Guarantee`).

### What Codex SHOULD NOT Reproduce:
* Web/Vite-specific DOM APIs or desktop browser layout hacks.
* Local mock array filtering for Global search results.
* Client-side origin routing logic.
