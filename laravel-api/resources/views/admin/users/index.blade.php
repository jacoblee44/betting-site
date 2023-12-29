<x-app-layout>
    <x-slot name="header"></x-slot>

    <div class="py-6">
        <x-alert></x-alert>

        <div class="bg-white overflow-hidden py-8 sm:rounded-lg">
            <x-datatable
                title="List of users"
                sub-title="List of all users for all sites."
            >
                <x-slot:actions>
                    <x-primary-link-button href="{{ route('admin.users.create') }}">
                        Add User
                    </x-primary-link-button>
                </x-slot:actions>

                <x-table>
                    <x-thead>
                        <tr>
                            <x-th>User</x-th>
                            <x-th>Role</x-th>
                            <x-th>Is Active ?</x-th>
                            <x-th></x-th>
                        </tr>
                    </x-thead>

                    <x-tbody>
                        @foreach($users as $user)
                            <tr>
                                <x-td>
                                    <a
                                        href="{{ route('admin.users.show', $user) }}"
                                        class="text-indigo-600 hover:text-indigo-900"
                                    >
                                        {{ $user->fullname }}
                                    </a>
                                </x-td>
                                <x-td>
                                    <span
                                        class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                    >
                                        {{ $user->role_display_name }}
                                    </span>
                                </x-td>
                                <x-td>
                                    <span
                                        class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                    >
                                        {{ $user->active ? 'YES' : 'NO'}}
                                    </span>
                                </x-td>
                                <x-td>
                                    @if($user->active)
                                        <a
                                            href="{{ route('admin.users.edit', $user) }}"
                                            class="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </a>
                                    @endif

                                    <form
                                        method="POST"
                                        action="{{ route('admin.users.destroy', $user) }}"
                                    >
                                        @csrf
                                        @method('DELETE')

                                        <button type="submit" class="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </form>
                                </x-td>
                            </tr>
                        @endforeach
                    </x-tbody>
                </x-table>
            </x-datatable>
        </div>
    </div>
</x-app-layout>
