# Actions

An Action Class is typically used to handle a specific use case or action in your application. 

Each action class represents a single action in your system. 

It encapsulates the business logic that should be performed when that action is executed. 

For example, you might have an Action Class like CreateUserAction or UpdateUserPasswordAction which contains the specific steps and logic needed to perform that action.

This approach can help to maintain clean controllers and promotes single responsibility principle.

Action Classes, however, represent individual application use-cases/actions and encapsulate the business logic specific to that action.

They are typically called from controllers or command handlers.

