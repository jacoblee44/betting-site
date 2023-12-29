<?php

namespace App\Traits;

trait Enumerable
{
    public static function toAssociativeArray(): array
    {
        foreach (self::cases() as $case) {
            $array[$case->value] = $case->name;
        }

        return $array;
    }

    public static function toAssociativeArrayWithId(): array
    {
        foreach (self::cases() as $case) {
            $array[] = ['id' => $case->value, 'title' => $case->name];
        }

        return $array;
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function keys(): array
    {
        return array_column(self::cases(), 'name');
    }
}
