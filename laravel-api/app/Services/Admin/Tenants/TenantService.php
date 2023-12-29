<?php

namespace App\Services\Admin\Tenants;

use App\Models\Tenant;

class TenantService
{
    /**
     * Create a new tenant.
     */
    public function createTenant(string $tenantId): Tenant
    {
        return Tenant::create([
            'id' => $tenantId,
        ]);
    }

    /**
     * Add a domain to a tenant.
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     * @throws \Psr\Container\NotFoundExceptionInterface
     * @throws \Psr\Container\ContainerExceptionInterface
     */
    public function addDomainToTenant(Tenant $tenant, string $mainDomain, ?array $alternateDomains): void
    {
        $domains = [
            ['domain' => $mainDomain],
        ];

        if (! is_null($alternateDomains)) {
            foreach ($alternateDomains as $domain) {
                $domains[] = ['domain' => $domain];
            }
        }

        $tenant->domains()->createMany($domains);
    }
}
