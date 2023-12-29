<?php

namespace App\Repositories;

use App\Models\Site;
use Exception;

class SiteRepository
{
    /**
     * @throws Exception
     */
    public function createSite(array $data): void
    {
        Site::query()->create([
            ...$data,
            'other_languages' => $data['other_languages'] ?? [],
        ]);
    }

    /**
     * @throws Exception
     */
    public function updateSite(array $data, Site $site): void
    {
        $site->update([
            'title' => $data['title'],
            'admin_id' => $data['admin_id'],
            'default_language' => $data['default_language'],
            'other_languages' => $data['other_languages'] ?? [],
        ]);
    }
}
