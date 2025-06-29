# UI Design Specification

## 1. Core Mandate & Theme

The design must adhere to a strict, high-contrast monochromatic theme. The only colors permitted are black for all background surfaces and white for all text, icons, and interactive element states. No other colors, including blues, greys derived from mixing black and white, or accent colors, are to be used. The final aesthetic must be stark, minimalist, and exclusively black and white.

This design system must be applied consistently across all pop-up elements on the charts page.

## 2. Design System Specification

### 2.1. Colors

-   **Panel & Modal Backgrounds:** Pure, solid black (`#000000`).
-   **Primary Text (Headings, Labels, Body):** Pure white (`#FFFFFF`).
-   **Secondary/Placeholder Text:** White with 60% opacity (`rgba(255, 255, 255, 0.6)`).
-   **Borders & Dividers:** White with 20% opacity (`rgba(255, 255, 255, 0.2)`).
-   **Icons:** Solid, pure white (`#FFFFFF`).

### 2.2. Borders & Dividers

-   **Style:** 1px solid.
-   **Color:** `rgba(255, 255, 255, 0.2)`.
-   **Usage:** To define component edges and separate distinct UI sections.

### 2.3. Interactive Elements (Buttons, Input Fields, Toggles, Sliders)

| State     | Background Fill                      | Border                             | Text/Icon Color | Notes                               |
| :-------- | :----------------------------------- | :--------------------------------- | :-------------- | :---------------------------------- |
| **Default** | `transparent`                        | 1px solid `rgba(255, 255, 255, 1)` | `#FFFFFF`       | Defined by its border and content.  |
| **Hover**   | `rgba(255, 255, 255, 0.15)`          | 1px solid `rgba(255, 255, 255, 1)` | `#FFFFFF`       | Background fills with a white overlay. |
| **Active/Pressed**  | `rgba(255, 255, 255, 0.3)`           | 1px solid `rgba(255, 255, 255, 1)` | `#FFFFFF`       | Background fill becomes more opaque. |
| **Focused** | `transparent` (or current state's) | 2px solid `rgba(255, 255, 255, 1)` | `#FFFFFF`       | Border thickness increases.         |
| **Disabled**| `transparent`                        | 1px solid `rgba(255, 255, 255, 0.4)` | `rgba(255, 255, 255, 0.4)` | All parts are reduced to 40% opacity. |

### 2.4. Icons

-   All icons must be rendered in solid, pure white (`#FFFFFF`).
-   No complex styles or multiple colors should be used for icons.
-   Opacity should match the state of the parent element (e.g., disabled state).