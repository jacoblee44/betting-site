<?php

namespace App\Http\Requests\Admin\Site;

use Illuminate\Foundation\Http\FormRequest;

class CreateSiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'unique:sites,title'],
            'admin_id' => ['nullable', 'integer'],
            'default_language' => ['required'],
            'domain' => ['required', 'unique:tenants,id'],
            'alternate_domain' => ['nullable'],
            'other_languages' => ['nullable', 'array'],
            'country_id' => ['nullable', 'integer'],
        ];
    }
}
