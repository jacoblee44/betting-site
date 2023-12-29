<?php

if (! function_exists('set_active_menu_route')) {
    function set_menu_active_route(mixed $route): string
    {
        return request()->routeIs($route)
            ? 'bg-gray-50 text-indigo-600'
            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50';
    }
}
