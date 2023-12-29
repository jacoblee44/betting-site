<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Site\CreateSiteRequest;
use App\Http\Requests\Admin\Site\UpdateSiteRequest;
use App\Models\Site;
use App\Models\User;
use App\Repositories\SiteRepository;
use App\Services\Admin\Tenants\TenantService;
use Illuminate\Support\Facades\DB;

class SiteController extends Controller
{
    public function __construct(
        private readonly SiteRepository $siteRepository,
        private readonly TenantService $tenantService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sites = Site::with('tenant')->get();

        return view('admin.sites.index', compact('sites'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $languages = \App\Enums\Languages::toAssociativeArrayWithId();
        $users = User::list();
        $site = (new Site())->load('tenant.domains');

        return view('admin.sites.create', compact('languages', 'users', 'site'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @throws \Exception
     */
    public function store(CreateSiteRequest $request)
    {
        $data = $request->validated();
        $data['alternate_domains'] = $data['alternate_domain'] ? [$data['alternate_domain']] : null;

        $tenant = $this->tenantService->createTenant($data['domain']);
        $data['tenant_id'] = $tenant->id;

        DB::transaction(function () use ($data, $tenant) {
            $this->tenantService->addDomainToTenant($tenant, $data['domain'], $data['alternate_domains']);
            $this->siteRepository->createSite($data);
        });

        return back()->with('success', __('Site created successfully'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Site $site)
    {
        $languages = \App\Enums\Languages::toAssociativeArrayWithId();
        $users = User::list();

        $site = $site->load('tenant.domains');

        return view('admin.sites.edit', compact('site', 'languages', 'users'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @throws \Exception
     */
    public function update(UpdateSiteRequest $request, Site $site)
    {
        $this->siteRepository->updateSite($request->all(), $site);

        return to_route('admin.sites.index')->with('success', __('Site updated successfully'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
