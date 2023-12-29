<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create {name?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new postgres database base on the name provided or the one in the .env file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name') ?? config('database.connections.pgsql.database');

        $this->info("Creating database {$name}");

        $this->createDatabase($name);

        $this->info("Database {$name} created successfully");
    }

    /**
     * Create the database.
     */
    protected function createDatabase(string $name): void
    {
        $charset = config('database.connections.pgsql.charset', 'utf8');
        $collation = config('database.connections.pgsql.collation', 'utf8_unicode_ci');

        try {
            $query = "CREATE DATABASE {$name} WITH ENCODING = '{$charset}'";

            config(['database.connections.pgsql.database' => null]);

            \DB::statement($query);
        } catch (\Throwable $th) {
            $this->error("Database {$name} already exists");
        }

        config(['database.connections.pgsql.database' => $name]);
    }
}
