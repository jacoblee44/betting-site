<?php

namespace App\Http\Requests\Admin\RolePermission;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [];
        switch ($this->method()) {
            case 'POST':
                $rules['display_name'] = 'required|unique:roles,display_name';
                break;
            case 'PUT':
                $rules['display_name'] = 'required|unique:roles,display_name,'.$this->role->id;
                break;
            default:
                break;
        }

        return $rules;
    }
}
