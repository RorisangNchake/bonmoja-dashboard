# Bonmoja Dashboard

A modern React dashboard application for managing financial transactions with real-time updates and a clean, responsive UI.

# React + TypeScript + Vite

this is a vite + react app created using

```
pnpm create vite
```


## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bonmoja-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the data structure**
   Ensure your `public/api/transactions.json` file exists with the following structure:
   ```json
   [
     {
       "id": "uuid",
       "type": "deposit" | "withdrawal",
       "amount": 0,
       "currency": "ZAR",
       "status": "success" | "failed" | "pending",
       "date": "ISO date string"
     }
   ]
   ```

4. **Start the development server**
   ```bash
   pnpm run dev
   ```

5. **Build for production**
   ```bash
   pnpm run build
   ```

## Notes on Implementation and Design Decisions

This approach prioritizes developer velocity and runtime performance while maintaining type safety and code clarity. This is perfect for medium to small size projects where full-featured oppinionated frameworks will take longer to ship a final product.

### State Management: Preact Signals vs React Context

This application uses **Preact Signals** for state management instead of React Context or other state management solutions. Here's why and the tradeoffs:

**Advantages:**
- **Fine-grained reactivity**: Only components that actually use specific signal values re-render
- **Simple API**: No need for providers, reducers, or complex setup
- **Performance**: Automatic optimization without manual memoization
- **Cross-component communication**: Easy to share state without prop drilling
- **Minimal boilerplate**: Direct value access with `.value` syntax

**Implementation Examples:**
```typescript
// Signal definition
export const isOpen = signal<boolean>(false);

// Usage in components
const DepositModal = () => {
  useSignals(); // Enable reactivity
  return isOpen.value ? <Modal /> : null;
};

// Updating from anywhere
isOpen.value = true;
```

#### Tradeoffs vs React Context

| Aspect | Preact Signals | React Context |
|--------|----------------|---------------|
| **Learning Curve** | Minimal - simple `.value` API | Moderate - requires understanding providers, consumers |
| **Performance** | Automatic optimization | Manual optimization needed (useMemo, useCallback) |
| **Bundle Size** | Smaller addition | Built into React |
| **DevTools** | Limited debugging tools | Excellent React DevTools integration |
| **TypeScript** | Excellent type inference | Good but requires more setup |
| **Testing** | Direct signal manipulation | Requires provider wrapping |

### Architecture Decisions

#### Component Structure
- **Atomic Design**: Small, reusable components (Button, StatusBadge)
- **Smart/Dumb Components**: Business logic in containers, presentation in components
- **Signal Integration**: `useSignals()` hook for reactive components

#### Data Flow
```
API → Signals → Components → UI Updates
     ↑                    ↓
     └── User Actions ────┘
```

#### Styling Approach
- **Tailwind CSS**: Utility-first for rapid development
- **Consistent Design System**: Shared spacing, colors, and borders
- **Responsive Design**: Mobile-first approach with `sm:` breakpoints

#### Error Handling
- **Optimistic Updates**: Immediate UI feedback
- **Graceful Degradation**: Loading states and error boundaries
- **User Feedback**: Toast notifications and form validation

### Performance Considerations

1. **Selective Re-rendering**: Only components using changed signals update
2. **Lazy Loading**: Modal components only render when needed

### Future Considerations

**Potential Migrations:**
- **Zustand**: If you need more traditional store patterns
- **React Query**: For server state management and caching

**Scaling Signals:**
- Consider signal composition for complex derived state
- Implement signal middleware for logging/debugging
- Use computed signals for expensive calculations

**Atomic Granular Components:**
- abstract shared component UI for more reusability (for example creating re-usable card component for balanceCard and modal)