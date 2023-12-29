<?php

namespace Tests;

use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

trait CustomLazilyRefreshDatabase
{
    use LazilyRefreshDatabase {
        refreshDatabase as parentRefreshDatabase;
    }

    public function refreshDatabase()
    {
        // $this->artisan('db:create');
        $this->parentRefreshDatabase();
    }
}
