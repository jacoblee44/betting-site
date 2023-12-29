<x-app-layout>
    <x-slot name="header">
    </x-slot>

    <div class="py-6">
        <x-alert></x-alert>
        <div class="bg-white overflow-hidden  py-8 sm:rounded-lg">
            @if(!$sites->isEmpty())
                <x-datatable title="List of sites" sub-title="List of all sites including the parent site.">
                    <x-slot:actions>
                        <x-primary-link-button href="{{ route('admin.sites.create') }}">Add Site</x-primary-link-button>
                    </x-slot:actions>
                    <x-table>
                        <x-thead>
                            <tr>
                                <x-th>Title</x-th>
                                <x-th>Default Language</x-th>
                                <x-th>Is Parent ?</x-th>
                                <x-th></x-th>
                            </tr>
                        </x-thead>
                        <x-tbody>
                            @foreach($sites as $site)
                                <tr>
                                    <x-td>{{ $site->title }}</x-td>
                                    <x-td>{{ $site->default_language }}</x-td>
                                    <x-td>
                                        <span
                                            class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                            {{ $site->tenant ? 'NO' : 'YES'}}
                                        </span>
                                    </x-td>
                                    <x-td>
                                        @if($site->tenant)
                                            <a href="{{ route('admin.sites.edit', $site) }}"
                                               class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        @endif

                                    </x-td>
                                </tr>
                            @endforeach

                        </x-tbody>
                    </x-table>
                </x-datatable>
            @else
                <x-empty-state
                    alt-text="Get Started by creating new Site"
                    label="Create New Site"
                    :create-link="route('admin.sites.create')"
                ></x-empty-state>
            @endif
        </div>
    </div>
</x-app-layout>
