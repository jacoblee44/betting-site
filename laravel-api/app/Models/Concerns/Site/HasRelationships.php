<?php

namespace App\Models\Concerns\Site;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasRelationships
{
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function siteAdmin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
