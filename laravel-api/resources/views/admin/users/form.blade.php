<form
    method="POST"
    action="{{ $action }}"
    class="mt-6 rounded bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
>
    @if($method == 'put')
        @method('PUT')
    @endif

    @csrf

    <div class="px-4 py-6 sm:p-8">
        <div class="max-w grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
            <div class="sm:col-span-4">
                <x-default-input
                    label="Firstname"
                    type="text"
                    name="firstname"
                    value="{{ old('firstname', $user->firstname) }}"
                ></x-default-input>
            </div>

            <div class="sm:col-span-4">
                <x-default-input
                    label="Lastname"
                    type="text"
                    name="lastname"
                    value="{{ old('lastname', $user->lastname) }}"
                    :method="$method"
                ></x-default-input>
            </div>

            <div class="sm:col-span-8">
                <x-default-input
                    label="Email"
                    type="text"
                    name="email"
                    value="{{ old('email', $user->email) }}"
                    :method="$method"
                ></x-default-input>
            </div>
        </div>

        <div class="max-w grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
            <div class="sm:col-span-4">
                <x-select
                    placeholder="Select Role"
                    label="Role"
                    name="role_id"
                >
                    <option value="">Select Role</option>
                    @foreach($roles as $roleId => $roleDisplayName)
                        <option
                            @selected((old('role_id', $role) == $roleId))
                            value="{{ $roleId }}"
                        >
                            {{ $roleDisplayName }}
                        </option>
                    @endforeach
                </x-select>
            </div>
        </div>
    </div>

    <div
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
    >
        <button
            type="submit"
            class="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
        >
            Save
        </button>
    </div>
</form>
