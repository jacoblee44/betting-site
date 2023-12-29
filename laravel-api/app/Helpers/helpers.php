<?php

if (! function_exists('round_to_two_decimal_places')) {
    /**
     * Round a given value to two decimal places.
     *
     * This function uses the PHP built-in function number_format() to
     * round a float to two decimal places. In Laravel and many other
     * modern PHP frameworks, developers often prefer to use "snake case"
     * for function names, which includes using full words instead of abbreviations.
     *
     * @param  float  $value The value to round
     * @return string The value rounded to two decimal places
     */
    function round_to_two_decimal_places($value)
    {
        return number_format((float) $value, 2, '.', '');
    }
}

if (! function_exists('get_seed_data')) {
    function get_seed_data(string $key)
    {
        $seedFileContent = file_get_contents(base_path('seed-data.json'));

        $data = json_decode($seedFileContent, true);

        return $data[$key];
    }
}
