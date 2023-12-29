<?php

namespace App\Models;

use App\Models\Concerns\Site\HasRelationships;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSite
 */
class Site extends Model
{
    use HasFactory;
    use HasRelationships;

    protected $fillable = [
        'title',
        'admin_id',
        'tenant_id',
        'default_language',
        'other_languages',
    ];

    protected $casts = [
        'other_languages' => 'array',
    ];
}
