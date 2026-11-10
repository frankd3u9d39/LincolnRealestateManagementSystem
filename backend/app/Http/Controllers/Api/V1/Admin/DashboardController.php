<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Reminder;
use App\Models\EstateUpdate;

class DashboardController extends Controller
{
    /**
     * Aggregated Dashboard Payload
     */
    public function index(): JsonResponse
    {
        $metrics = $this->getMetricsData();
        $reminders = Reminder::latest()->take(5)->get();
        $latestUpdate = EstateUpdate::latest('published_at')->first();

        return response()->json([
            'status' => 'success',
            'data' => [
                'administrator' => [
                    'name' => 'Administrator',
                    'role' => 'Estate Manager',
                    'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                ],
                'system_status' => [
                    'date' => now()->format('M d, Y'),
                    'time' => now()->format('H:i A') . ' WAT',
                    'operational' => true,
                ],
                'metrics' => $metrics,
                'reminders' => $reminders,
                'latest_update' => $latestUpdate,
            ],
        ]);
    }

    /**
     * Return just the 4 summary metrics matching Figma KAN-22
     */
    public function metrics(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $this->getMetricsData(),
        ]);
    }

    private function getMetricsData(): array
    {
        return [
            [
                'id' => 'residents',
                'label' => 'TOTAL RESIDENTS',
                'value' => '1,248',
                'trend' => '+24',
                'trend_type' => 'positive',
                'icon_type' => 'residents',
            ],
            [
                'id' => 'houses',
                'label' => 'OCCUPIED HOUSES',
                'value' => '356',
                'badge' => '94%',
                'icon_type' => 'houses',
            ],
            [
                'id' => 'revenue',
                'label' => 'MONTHLY REVENUE',
                'value' => '₦15.2M',
                'trend' => '+8.4%',
                'trend_type' => 'positive',
                'icon_type' => 'revenue',
            ],
            [
                'id' => 'requests',
                'label' => 'PENDING REQUESTS',
                'value' => '18',
                'icon_type' => 'requests',
            ],
        ];
    }
}
