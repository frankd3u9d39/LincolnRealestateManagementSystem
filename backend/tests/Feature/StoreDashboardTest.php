<?php

namespace Tests\Feature;

use App\Models\Merchant;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_the_merchant_dashboard_and_recent_transactions(): void
    {
        $merchant = Merchant::factory()->create([
            'name' => 'Kinetic Commerce',
            'merchant_id' => 'KC-8842',
            'total_revenue' => 14250000,
        ]);

        Transaction::factory()->create([
            'merchant_id' => $merchant->id,
            'service' => 'Premium Insurance',
            'invoice' => 'INV-#4402',
            'amount' => 45000,
            'transaction_date' => '2023-10-24',
        ]);

        $this->getJson('/api/store/dashboard')
            ->assertOk()
            ->assertJsonPath('data.merchant.name', 'Kinetic Commerce')
            ->assertJsonPath('data.merchant.merchantId', 'KC-8842')
            ->assertJsonPath('data.merchant.totalRevenue', '14250000.00')
            ->assertJsonCount(1, 'data.transactions')
            ->assertJsonPath('data.transactions.0.invoice', 'INV-#4402');
    }

    public function test_it_returns_not_found_when_no_merchant_exists(): void
    {
        $this->getJson('/api/store/dashboard')->assertNotFound();
    }
}
