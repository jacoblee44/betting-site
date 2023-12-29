# Model Concerns

This directory, `App\Models\Concerns`, is intended to organize additional traits that extend or modify the behavior of our Eloquent models in Laravel.

The main purpose of these traits is to ensure that our models remain as skinny as possible. Each of these traits is intended to encapsulate a particular type of functionality.

## HasMethods

This trait is intended for custom methods that are not directly related to Eloquent model's relationships, scopes or mutators/accessors. They usually contain business logic related to the model.

## HasMutators

This trait is for defining all of Laravel's Eloquent mutators and accessors. Mutators and accessors allow you to alter data before it's saved to and fetched from the database, respectively.

## HasRelationships

In this trait, we define all the Eloquent relationship methods. It includes relationships like `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`, and so on.

## HasScopes

This trait is used to define all of the model's Eloquent query scopes. Scopes allow you to encapsulate commonly used sets of constraints into reusable methods.

Each of these traits helps us organize related sets of functionalities together, making it easier to navigate through our model's code. By separating the different types of methods into their respective traits, we can keep our models slim and our codebase easier to maintain and understand.

---

Feel free to create new Traits for a Model if needed by respecting the same syntax.
