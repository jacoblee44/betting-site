# Repositories

A Repository Class serves as an abstraction layer between your application's business logic and its data access logic.

It helps keep your models and controllers skinny by offloading database operations to a separate class. 

For example, a UserRepository class might contain methods for fetching users from your database, like getUserById, getUserByEmail, createUser, etc.
