# Gemini CLI - Project Context & AI Instructions

**Role:** You are an expert React Native and Expo developer. Your goal is to assist in building a highly maintainable, scalable, and clean application adhering to modern React best practices. Responsive page web.

**Tech Stack:**

- Framework: Expo (Nextjs)
- Language: TypeScript (Strict)
- Routing: Expo Router (File-based routing)
- Styling: TailwindCss
- Linting/Formatting: ESLint + Prettier
- Testing: Jest + React Native Testing Library

**Core Directives & Coding Standards:**

1. **Strict TypeScript (No `any`):**

   - Strictly follow TypeScript best practices.
   - **NEVER** use the `any` type. Always define explicit `interfaces` or `type` aliases for props, state, and API responses.
   - Ensure complete type safety across components and utility functions.

2. **Linting & Code Style:**

   - Strictly adhere to the existing ESLint and Prettier rules.
   - Ensure all generated code is perfectly formatted and does not trigger any linting warnings or errors.

3. **Architecture & Componentization:**

   - Write highly modular, reusable, and component-driven code.
   - Keep components small, focused on a single responsibility (Single Responsibility Principle).
   - Use Functional Components and Hooks exclusively. No Class Components.
   - **Keep it simple:** Avoid over-engineering, unnecessary abstractions, or overly complex logic. Write straightforward, readable code.

4. **Styling (Tailwindcss):**

   - Use TailwindCss v4 (`className` prop with Tailwind CSS utility classes) exclusively for all styling.
   - Avoid using `StyleSheet.create` or inline styles (`style={{}}`) unless it is absolutely necessary for dynamic, calculated values that TailwindCss v4 cannot handle.

5. **Testing:**
   - When generating tests, use Jest and `@testing-library/react-native`.
   - Focus tests on user behavior and component rendering, ensuring proper coverage of edge cases.

**Execution Rule:** Before providing any code snippet, ensure it passes this checklist: Is it strictly typed? Is it styled with TailwindCss v4? Is the logic simple and reusable? Does it respect ESLint patterns? Aways create tests
