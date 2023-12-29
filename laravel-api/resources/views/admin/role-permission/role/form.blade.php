@php
$actionLink = $action === 'store' ? route('admin.roles.store') : route('admin.roles.update', $role->id);
@endphp

<form method="POST" action="{{ $actionLink }}">
    @csrf
    @method($method)
    <div>
        <x-input-label for="display_name" :value="__('Name')" />
        <x-text-input id="display_name" class="block mt-1 w-full" type="display_name" name="display_name"
            :value="old('display_name') ?? $role?->display_name" required autofocus autocomplete="display_name" />
        <x-input-error :messages="$errors->get('display_name')" class="mt-2" />
    </div>

    <div class="flex items-center justify-end mt-4">

        <x-primary-button class="ml-3">
            {{ __('Save') }}
        </x-primary-button>
    </div>
</form>