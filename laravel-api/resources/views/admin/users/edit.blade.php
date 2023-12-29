<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Edit User') }}
            </h2>

            <x-primary-link-button href="{{ route('admin.users.index') }}">
                Back
            </x-primary-link-button>
        </div>
    </x-slot>

    <div class="mt-2">
        @include('admin.users.form', [
            'method' => 'put',
            'action' => route('admin.users.update', $user)
        ])
    </div>
</x-app-layout>
