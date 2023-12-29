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
                    label="Title"
                    type="text"
                    name="title"
                    value="{{ old('title', $site->title) }}"
                ></x-default-input>
            </div>
            <div class="sm:col-span-4">
                <x-default-input
                    label="Domain"
                    type="text"
                    name="domain"
                    value="{{ old('domain', $site->tenant?->id) }}"
                    :method="$method"
                ></x-default-input>
            </div>

            <div class="sm:col-span-4">
                <x-default-input
                    label="Alternate Domain"
                    type="text"
                    name="alternate_domain"
                    value="{{ old('alternate_domain', $site->tenant?->domains?->get(1)?->domain) }}"
                ></x-default-input>
            </div>
            <div class="sm:col-span-6">
                <x-select placeholder="Select Language" label="Default Language" name="default_language">
                    <option value="">Select Language</option>
                    @foreach($languages as $language)
                        <option
                            @selected(old('default_language', $site->default_language)) value="{{ $language['id'] }}">{{ $language['title'] }}</option>
                    @endforeach
                </x-select>
            </div>
            <div class="sm:col-span-6">
                <x-select placeholder="Select Language" class="selectpicker w-full"
                          data-placeholder="Select Other languages"
                          multiple
                          name="other_languages[]" label="Other Languages">
                    <option value="">Select Other languages</option>
                    @foreach($languages as $language)
                        <option
                            @selected(old('default_language', $site->other_languages)) value="{{ $language['id'] }}">{{ $language['title'] }}</option>
                    @endforeach
                </x-select>
            </div>
            <div class="sm:col-span-6">
                <x-select placeholder="Select Language" label="Owner" name="admin_id">
                    <option value="">Select Owner</option>
                    @foreach($users as $user)
                        <option
                            @selected(old('admin_id', $site->admin_id))  value="{{ $user['id'] }}">{{ $user['title'] }}</option>
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

@include('layouts.partials.scripts')
