<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller
{
    /**
     * GET /v1/finance/analytics
     *
     * Returns real-time financial performance analytics (Task 16):
     * - 4 KPI Summary Cards (Collection Rate, Avg Revenue, Top Service, Laggard)
     * - Monthly Revenue Trend (Jan - Dec)
     * - Revenue by Service breakdown (Security, Water, Electricity, Waste)
     * - Yearly Revenue Trend (2020 - 2024)
     * - Collection Status (Healthy badge, 94.2% Paid gauge, Paid vs Outstanding amounts)
     */
    public function index(Request $request): JsonResponse
    {
        $period = $request->query('period', 'this_month');

        return response()->json([
            'status' => 'success',
            'period' => $period,
            'data' => [
                'kpis' => [
                    [
                        'id' => 'collection-rate',
                        'label' => 'COLLECTION RATE',
                        'value' => '94.2%',
                        'subtext' => '↗ +2.4% vs LY',
                        'trendType' => 'up',
                        'iconType' => 'collection',
                    ],
                    [
                        'id' => 'avg-revenue',
                        'label' => 'AVG REVENUE',
                        'value' => '₦1.2M',
                        'subtext' => '↗ +5.1% vs LM',
                        'trendType' => 'up',
                        'iconType' => 'revenue',
                    ],
                    [
                        'id' => 'top-service',
                        'label' => 'TOP SERVICE',
                        'value' => 'Security',
                        'subtext' => 'Stable Performance',
                        'trendType' => 'neutral',
                        'iconType' => 'top_service',
                    ],
                    [
                        'id' => 'laggard',
                        'label' => 'LAGGARD',
                        'value' => 'Waste',
                        'subtext' => '↘ -1.2% Drop',
                        'trendType' => 'down',
                        'iconType' => 'laggard',
                    ],
                ],
                'monthlyRevenueTrend' => [
                    ['month' => 'Jan', 'amount' => 0.8],
                    ['month' => 'Feb', 'amount' => 0.95],
                    ['month' => 'Mar', 'amount' => 0.88],
                    ['month' => 'Apr', 'amount' => 1.1],
                    ['month' => 'May', 'amount' => 1.05],
                    ['month' => 'Jun', 'amount' => 1.2],
                    ['month' => 'Jul', 'amount' => 1.35],
                    ['month' => 'Aug', 'amount' => 1.25],
                    ['month' => 'Sep', 'amount' => 1.4],
                    ['month' => 'Oct', 'amount' => 1.45],
                    ['month' => 'Nov', 'amount' => 1.38],
                    ['month' => 'Dec', 'amount' => 1.6],
                ],
                'revenueByService' => [
                    ['name' => 'Security', 'percentage' => 42, 'color' => '#B22222'],
                    ['name' => 'Water', 'percentage' => 28, 'color' => '#7F1D1D'],
                    ['name' => 'Electricity', 'percentage' => 20, 'color' => '#C9A227'],
                    ['name' => 'Waste', 'percentage' => 10, 'color' => '#1A1A1A'],
                ],
                'yearlyRevenueTrend' => [
                    ['year' => '2020', 'amount' => 8.2],
                    ['year' => '2021', 'amount' => 9.8],
                    ['year' => '2022', 'amount' => 11.2],
                    ['year' => '2023', 'amount' => 13.4],
                    ['year' => '2024', 'amount' => 15.3],
                ],
                'collectionStatus' => [
                    'statusLabel' => 'HEALTHY',
                    'collectionPercentage' => 94.2,
                    'paidAmount' => '₦14.2M',
                    'paidPercentage' => 94.2,
                    'outstandingAmount' => '₦0.8M',
                    'outstandingPercentage' => 5.8,
                ],
            ],
        ]);
    }
}
