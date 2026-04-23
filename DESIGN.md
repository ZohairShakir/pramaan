# Pramaan Design System

## Aesthetic Direction: Premium "Markscout" Minimalism

Pramaan follows a high-end, editorial-grade design system influenced by modern Swiss minimalism and premium tech aesthetics. The interface is characterized by generous whitespace, massive high-impact typography, and a "ticket-card" information architecture.

---

## Color Palette

### Core Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#F2F2F2` | Soft grey page background |
| `--foreground` | `#1E1E1E` | Deep charcoal primary text |
| `--accent` | `#6B7D5C` | Olive Green - Primary functional color (Verified, Success) |
| `--error` | `#D9534F` | Vibrant Red - Warning states (Tampered, Invalid) |
| `--secondary` | `#FFFFFF` | Pure white card surfaces |
| `--border` | `#E0E0E0` | Subtle dividers and outlines |
| `--muted` | `#A0A0A0` | Secondary text and labels |

### Design Philosophy: Monochromatic High-Contrast
The system uses a monochromatic base (White/Grey/Black) to allow functional colors (Olive Green and Error Red) to signal state changes with maximum clarity and authority.

---

## Typography

### Font Families

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | `var(--font-outfit)` | Geometric Sans |
| Body Text | `var(--font-inter)` | System Sans |
| System/Hashes | `var(--font-mono)` | Monospace |

### Type Hierarchy (Editorial Standard)

| Element | Size | Weight | Case | Tracking |
|---------|------|--------|------|----------|
| **Hero Title** | 7rem - 8rem | 800 | UPPER | -0.05em |
| **Page Header** | 2.5rem | 700 | UPPER | -0.04em |
| **Section Title**| 1.5rem | 700 | UPPER | 0.1em |
| **Capsule Badge**| 0.65rem | 800 | UPPER | 0.2em |
| **Metadata Label**| 0.65rem | 700 | UPPER | 0.15em |
| **Body text** | 1rem | 400 | Normal | - |

---

## Key Components

### 1. The Ticket Card
The primary container for all meaningful data.
- **Border Radius**: 40px (Ultra-rounded)
- **Background**: Pure White (`#FFFFFF`)
- **Separators**: 1px dashed dividers (`#E0E0E0`)
- **Shadow**: Subtle depth (`box-shadow: 0 10px 30px rgba(0,0,0,0.05)`)

### 2. Floating Navigation Bar
A site-wide glassmorphism layer that hosts the "Network Heartbeat".
- **Shape**: Pill-shaped capsule
- **Glassmorphism**: 15px Backdrop Blur + Semi-transparent White
- **Logo**: Features a glowing Olive Green status dot
- **Position**: Absolute top with 1rem margin

### 3. Two-Panel Audit Modal
The deep-dive verification interface.
- **Structure**: Side-by-side card panels (stacks on mobile)
- **Left Panel**: Metadata registry (Authority, Timestamp, Full Hash)
- **Right Panel**: Live Document Preview (PDF/Image viewer)
- **Overlay**: 15px Backdrop Blur to isolate the audit task

### 4. Status Indicators
- **Verified**: Olive Green circle with a white tick mark
- **Tampered**: Red circle with a white cross mark
- **Demo Mode**: Dedicated high-fidelity states (`v_demo` / `t_demo`) for network experience

---

## Layout Architecture

### 1. The Verification Hub (`/verify`)
A task-focused input hub.
- **Layout**: Centered single-column ticket card
- **Interaction**: Switchable between manual ID entry and secure file upload (drag-and-drop/camera)

### 2. The System Registry (`/dashboard`)
The management dashboard for registered proofs.
- **Layout**: List-based "Horizontal Ticket" feed
- **Components**: Document identity, anchoring timestamp, and immutability status badges

### 3. The Landing Page (`/`)
An editorial storytelling experience.
- **Hero**: Massive typography paired with clear verification CTAs
- **Feature Grid**: Uses the ticket-card style to explain protocol layers
- **Network Stats**: High-impact, monochromatic stat counters

---

## Interaction & Motion

- **Backdrop Blur**: Used extensively to create depth and focus (10px-15px)
- **Card Lifts**: Interactive elements lift by -5px to -10px on hover with expanded shadows
- **Slide Animations**: Modals slide up with a smooth cubic-bezier (`0.16, 1, 0.3, 1`)
- **Mobile First**: All layouts stack logically, ensuring the audit panels and task cards are scrollable and touch-optimized

---

## Security UX Principles

1. **Privacy First**: Actual documents are never stored; only cryptographic fingerprints (SHA-256) are anchored.
2. **Instant Authority**: Status indicators are oversized and color-coded for zero-latency comprehension.
3. **Transparent Audit**: The two-panel modal provides "Visual Proof" side-by-side with "Technical Proof".
4. **Access Control**: Creation and management flows are protected by NextAuth, while verification remains a public good.