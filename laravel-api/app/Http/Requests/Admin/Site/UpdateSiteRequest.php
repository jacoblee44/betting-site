<?php

namespace App\Http\Requests\Admin\Site;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {

        return [
            'title' => ['required'],
            'admin_id' => ['nullable', 'integer'],
            'default_language' => ['required'],
            'domain' => ['required'],
            'alternate_domain' => ['nullable'],
            'other_languages' => ['nullable', 'array'],
            'country_id' => ['nullable', 'integer'],
        ];
    }
}
