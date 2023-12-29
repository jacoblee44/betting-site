<x-mail::message>
# {{ __('Dear') }} {{ $user->fullname }}

{{ __('Your account is successfully created. Here is your new account credentials :') }}

<x-mail::table>
|                           |                                    |
| ------------------------- |:----------------------------------:|
| **{{ __('Email') }}:**    | {{ $user->email }}                 |
| **{{ __('Password') }}:** | {{ $password }}              |
</x-mail::table>

Best regards,<br>
{{ config('app.name') }}
</x-mail::message>
