# Helpers

This directory contains all helper functions used across the application. The purpose of these functions is to perform small, reusable tasks that might be needed in various parts of the application. They are intended to improve the readability and maintainability of the code by abstracting away complex or repetitive tasks.

## Guidelines for Helper Functions

1. **Single Responsibility:** Each helper function should do one thing and do it well. If a function is doing multiple tasks, consider breaking it up into multiple helper functions.

2. **Statelessness:** Helper functions should not maintain any state. They should receive all necessary data as arguments and return a result.

3. **No Business Logic:** As a general rule, helper functions should not contain business logic. Business logic should be encapsulated in dedicated classes such as services, actions, or models.

4. **Universality:** Helper functions should be universally useful and not tied to a specific part of the application. If a function is only useful in one specific context, consider moving it to a more appropriate location (e.g., a method on a model or service).

5. **Naming:** Function names should be clear, concise, and descriptive of what the function does. We use **snake_case** for function names, in line with Laravel's convention for helper functions.
