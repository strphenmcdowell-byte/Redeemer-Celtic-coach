# Implementation Plan: Mobile Navigation Dropdown Refactor

## Overview
Hide the 4 primary coach tool navigation buttons from being permanently fixed/visible on mobile screens and move them into the mobile collapsible dropdown menu. Add an active tool indicator in the mobile header next to the hamburger toggle, and automatically close the dropdown when an option is selected.

---

## 1. Mobile Header & Navigation Tabs Update (`src/App.tsx`)
- **Hide Desktop Tabs on Mobile**:
  - Update the navigation tabs container (`div` with tabs 1–4) with `hidden md:block`. On screens `< md`, this bar will be completely hidden so it no longer consumes vertical screen space.
- **Mobile Header Active Tool Indicator**:
  - Add a compact active tool pill/badge in the header next to the mobile menu hamburger button (e.g., `📋 1. Curriculum`, `🔍 2. Pitch Check`, `⚡ 3. EAP`, `🩹 4. Concussion`).
- **Mobile Dropdown Menu Content**:
  - In `mobileMenu`, list all 4 primary tools:
    1. `1. 32-Wk Curriculum & Tactics Board`
    2. `2. Pitch & Goalpost Inspection`
    3. `3. Noel Gorman Park EAP (AED Pin: 1971)`
    4. `4. Concussion "Sit Them Out" Tool`
  - Style the currently active tool with a distinctive active state (`bg-red-600 text-white`).
  - Keep the quick action buttons (`Printable Coaching Binder` and `Copy Coach Link`).
  - Configure each tool button to switch `activeTab` and automatically close `setMobileMenu(false)`.

---

## 2. Sync Standalone Coaches App (`src/components/CoachesApp.tsx`)
- Apply the same responsive design to `CoachesApp.tsx`:
  - Hide the tab bar on mobile (`hidden md:block`).
  - Move the coach tool options into the mobile menu drawer with auto-close on selection and active state styling.

---

## Verification Plan
1. Run `compile_applet` to confirm clean compilation and lack of TypeScript errors.
2. Test responsive layout behavior:
   - On desktop (`>= md`), tabs remain horizontally visible across the top.
   - On mobile (`< md`), the persistent tabs bar is hidden, the active tool is shown concisely next to the menu toggle, and tapping the hamburger button reveals all 4 tool options with 1-tap switching and automatic menu dismissal.
