<?php

namespace App\Models;

use App\Models\Concerns\Role\HasScopes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

/**
 * @mixin IdeHelperRole
 */
class Role extends SpatieRole
{
    use HasFactory, HasScopes;
}
