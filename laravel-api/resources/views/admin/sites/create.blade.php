<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Create new Site') }}
            </h2>
            <x-primary-link-button href="{{ route('admin.sites.index') }}">Back</x-primary-link-button>
        </div>
    </x-slot>

    <div id="create-or-edit-site" class="mt-2">
        <site-create-form
            :site='@json($site)'
            :languages='@json($languages)'
            :users='@json($users)'
            url="{{ route('admin.sites.store') }}"
        ></site-create-form>

        {{--@include('admin.sites.form', ['method' => 'post', 'action' => route('admin.sites.store')])--}}
    </div>
</x-app-layout>
