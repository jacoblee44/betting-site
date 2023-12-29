<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => [
                'required',
                'email:filter',
            ],
        ];
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation(): void
    {
        // Handling for the 'password' attribute
        // --------------------------------------
        // 1. Generate a plain password
        // 2. Merge it into the request data
        // 3. Store the plain password back into the request data
        $plainPassword = Str::random(8);
        $this->merge([
            'password' => $plainPassword,
        ]);
        $this->request->add(['password' => $plainPassword]);

        // Handling for the second attribute
        // ----------------------------------
        // 1. ...
        // 2. ...
        // 3. ...

        // Handling for the third attribute
        // ---------------------------------
        // 1. ...
        // 2. ...
        // 3. ...
    }
}
