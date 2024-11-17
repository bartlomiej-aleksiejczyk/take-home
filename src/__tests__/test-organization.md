# How to organize Testing in the App

## What should be tested:

Based on my experience, every original feature or component should be tested, as running test suites can help catch regressions automatically. Furthermore, software tests can demonstrate that the written code works as described in the technical documentation and fulfills all requirements.

I recommend writing three types of tests for different types of components and features:

-   Unit tests: For pure functions or standalone components.
-   Integration tests: For complex features, such as providers.
-   E2E tests: For an entire application.

---

## How to approach testing:

1. Install a testing lib:  
   Since this project uses Vite, I recommend using `Vitest`.
2. Unit tests:  
   Create `*.test.tsx` files in the same directory as the original components. These tests should cover the technical requirements of the components.

3. Integration and E2E tests:  
   Place test files in a `__tests__` directory at the root of the project.
4. CI:  
   Test suites should be incorporated into the CI pipeline and optionally used in pre-commit hooks to ensure that there are no regressions with new commits.

---

## Example of test suites for this project

-   Unit tests:  
    Create a `*.test.tsx` file for each simple component in the `components` directory. Each test should verify technical requirements (e.g., "Is the button clickable?" or "Does the card collapse correctly?").

-   Integration tests:  
    Write integration tests for each complex feature in the `features` directory to ensure components work together as expected.
-   E2E tests:  
    Create E2E tests for each user story. For example:
    -   "As a user, I want to delete a card"
