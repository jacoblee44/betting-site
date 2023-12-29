# Managed handling of forms

When dealing with forms, we need several key features:
1. The ability to create custom components that take one or multiple form fields. Changes in the child component must be reflected in the parent component and vice verca.
2. Enumerate valid options for form components that are some sort of "selection" (multiple choice etc.)
3. Define a validation for each form field in the root form component
 a. The reason for this is that form components like `AddressGroup` should be presentational only, while the logic for validation, option enumeration etc. should live elsewhere. This will allow to have the same appearance for different form components with different semantics.
4. It should be possible to set errors (e.g. validation errors, server errors) on forms and display these errors