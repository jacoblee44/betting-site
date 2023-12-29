<?php

namespace App\Models\Concerns\Role;

trait HasScopes
{
    /**
     * Scope a query to list all roles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Support\Collection
     */
    public function scopeList($query)
    {
        return $query->get()
            ->pluck('display_name', 'id');
    }
}
