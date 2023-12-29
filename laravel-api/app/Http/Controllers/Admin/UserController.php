<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\Admin\User\UserService;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->getAllUsers();

        return view('admin.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = new User();
        $roles = Role::list();
        $role = null;

        return view('admin.users.create', compact(
            'user',
            'roles',
            'role'
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->userService->createUser($request->all());

        return to_route('admin.users.index')
            ->with('success', __('User created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return view('admin.users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::list();
        $role = $user->roles->first()?->id;

        return view('admin.users.edit', compact(
            'user',
            'roles',
            'role'
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->userService->updateUser($user, $request->all());

        return to_route('admin.users.index')
            ->with('success', __('User updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);

        return to_route('admin.users.index')
            ->with('success', __('User deleted successfully.'));
    }
}
