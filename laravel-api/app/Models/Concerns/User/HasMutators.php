<?php

namespace App\Models\Concerns\User;

trait HasMutators
{
    /**
     * Get the fullname of the user
     *
     * @return string
     */
    public function getFullnameAttribute()
    {
        return "{$this->firstname} {$this->lastname}";
    }

    /**
     * Get the display name of the user's role.
     *
     * @return string|null
     */
    public function getRoleDisplayNameAttribute()
    {
        return $this->roles->first()->display_name ?? null;
    }
}
