## Rules

-   add/remove/modify existing code to achieve the end result (some code needs a refactor)
-   don't install additional packages
-   you need to use `zustand`, but it's up to you to decide what state should be global
-   write the code like it's a real feature

### Cards

-   add expand/collapse functionality
-   make sure the "Delete" button works
-   add animations

### Deleted Cards

-   display the number of deleted cards
-   reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
-   write the code, so in the future you will be able to add "revert" functionality

### Behavior

-   cards by default should be collapsed
-   expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
-   "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

-   add a "Refresh" button (just like the "Reveal" button)
-   create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.

===

## Technical Choices Explanation

### Code Structure:

-   I added a Prettier configuration to ensure a uniform linting setup.
-   Shared code is placed in the `components` directory, while feature-specific code resides in the `features` directory.
-   For complex components, I separate the logic and rendering layers by creating `Logic-oriented` and `Render-oriented` components.
-   I aim to name files after their main component and prefer to keep one main component per file.

### State Management and Persistence:

-   Zustand store is used to manage and persist client-side state, while TanStack Query manages server-side state.
-   `useEffect` is employed to sync server-side and client-side state, following the TanStack Query documentation.
-   I combine state and actions as recommended in the Zustand documentation.
-   State persistence is maintained across in-app refreshes, browser refreshes, and between browser sessions.

### Testing:

-   Detailed information about testing can be found in the `src/__tests__/test-organization.md` file.
