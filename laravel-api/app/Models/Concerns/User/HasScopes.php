<?php

namespace App\Models\Concerns\User;

use Illuminate\Database\Eloquent\Builder;

trait HasScopes
{
    public function scopeList(Builder $query)
    {
        $all = $query
            ->get();
        foreach ($all as $el) {
            $array[] = ['id' => $el->id, 'title' => $el->name];
        }

        return $array;
    }
}
