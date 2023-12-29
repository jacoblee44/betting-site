<?php

namespace App\Enums;

use App\Traits\Enumerable;

enum Languages: string
{
    use Enumerable;
    case GERMAN = 'DE';
    case ENGLISH = 'EN';
}
