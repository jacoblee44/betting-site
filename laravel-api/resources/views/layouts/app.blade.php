<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>{{ config('app.name', 'Horse24') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
  </head>

  <body class="font-sans antialiased">
    <div x-data="{ open: false }">
      @include('layouts.partials.sidebar')

      <div class="lg:pl-72">
        @include('layouts.partials.header')

        <main class="py-10" id="app">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2>{{ $header }}</h2>
            {{ $slot }}
          </div>
        </main>
      </div>
    </div>
  </body>
</html>
