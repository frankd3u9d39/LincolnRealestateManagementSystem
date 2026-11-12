<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FinanceDashboardController extends Controller
{
    /**
     * Get Executive Financial Overview for Finance Dashboard 1.
     */
    public function overview(Request $request): JsonResponse
    {
        // 6 Top Metric Cards
        $metrics = [
            [
                'id' => 'total-revenue',
                'title' => 'TOTAL REVENUE',
                'value' => '₦15.2M',
                'subtitle' => '↗ 12% vs last year',
                'subtitleType' => 'trend-up',
                'icon' => 'wallet',
                'badgeBg' => 'bg-blue-50 text-blue-600',
                'iconColor' => 'text-blue-600',
            ],
            [
                'id' => 'monthly-revenue',
                'title' => 'MONTHLY REV.',
                'value' => '₦1.25M',
                'subtitle' => '↗ 5.4% from Oct',
                'subtitleType' => 'trend-up',
                'icon' => 'calendar',
                'badgeBg' => 'bg-emerald-50 text-emerald-600',
                'iconColor' => 'text-emerald-600',
            ],
            [
                'id' => 'yearly-revenue',
                'title' => 'YEARLY REV.',
                'value' => '₦8.4M',
                'subtitle' => 'Budget: ₦10M',
                'subtitleType' => 'neutral',
                'icon' => 'chart',
                'badgeBg' => 'bg-purple-50 text-purple-600',
                'iconColor' => 'text-purple-600',
            ],
            [
                'id' => 'outstanding',
                'title' => 'OUTSTANDING',
                'value' => '₦450K',
                'subtitle' => '12 Pending Invoices',
                'subtitleType' => 'warning',
                'icon' => 'hourglass',
                'badgeBg' => 'bg-amber-50 text-amber-600',
                'iconColor' => 'text-amber-600',
            ],
            [
                'id' => 'total-paid',
                'title' => 'TOTAL PAID',
                'value' => '112',
                'subtitle' => 'RESIDENTS',
                'subtitleType' => 'neutral',
                'icon' => 'check',
                'badgeBg' => 'bg-emerald-50 text-emerald-600',
                'iconColor' => 'text-emerald-600',
            ],
            [
                'id' => 'total-owing',
                'title' => 'TOTAL OWING',
                'value' => '8',
                'subtitle' => 'RESIDENTS',
                'subtitleType' => 'warning',
                'icon' => 'alert',
                'badgeBg' => 'bg-rose-50 text-rose-500',
                'iconColor' => 'text-rose-500',
            ],
        ];

        // 12 Months Revenue History
        $revenueHistory = [
            ['month' => 'Jan', 'amount' => 840000],
            ['month' => 'Feb', 'amount' => 920000],
            ['month' => 'Mar', 'amount' => 1100000],
            ['month' => 'Apr', 'amount' => 980000],
            ['month' => 'May', 'amount' => 1050000],
            ['month' => 'Jun', 'amount' => 1220000],
            ['month' => 'Jul', 'amount' => 1340000],
            ['month' => 'Aug', 'amount' => 1150000],
            ['month' => 'Sep', 'amount' => 1260000],
            ['month' => 'Oct', 'amount' => 1450000],
            ['month' => 'Nov', 'amount' => 1380000],
            ['month' => 'Dec', 'amount' => 100000],
        ];

        // Revenue Share by Estate Service
        $revenueByService = [
            ['name' => 'Security', 'value' => 5000000, 'color' => '#10B981'],
            ['name' => 'Waste', 'value' => 2500000, 'color' => '#3B82F6'],
            ['name' => 'Electricity', 'value' => 4200000, 'color' => '#F97316'],
            ['name' => 'Water', 'value' => 1800000, 'color' => '#06B6D4'],
            ['name' => 'Maintenance', 'value' => 3000000, 'color' => '#8B5CF6'],
        ];

        // Detailed Service Revenue Breakdowns Table
        $breakdowns = [
            [
                'id' => '1',
                'serviceName' => 'Security Fee',
                'icon' => 'security',
                'iconBg' => 'bg-blue-50',
                'iconColor' => 'text-blue-600',
                'totalAmount' => 5000000,
                'totalPayments' => 4850000,
                'balanceDue' => 150000,
                'collectionRate' => 97,
            ],
            [
                'id' => '2',
                'serviceName' => 'Waste Management',
                'icon' => 'waste',
                'iconBg' => 'bg-emerald-50',
                'iconColor' => 'text-emerald-600',
                'totalAmount' => 2500000,
                'totalPayments' => 2100000,
                'balanceDue' => 400000,
                'collectionRate' => 84,
            ],
            [
                'id' => '3',
                'serviceName' => 'Electricity',
                'icon' => 'electricity',
                'iconBg' => 'bg-amber-50',
                'iconColor' => 'text-amber-500',
                'totalAmount' => 4200000,
                'totalPayments' => 3950000,
                'balanceDue' => 250000,
                'collectionRate' => 94,
            ],
            [
                'id' => '4',
                'serviceName' => 'Water',
                'icon' => 'water',
                'iconBg' => 'bg-cyan-50',
                'iconColor' => 'text-cyan-500',
                'totalAmount' => 1800000,
                'totalPayments' => 1750000,
                'balanceDue' => 50000,
                'collectionRate' => 97,
            ],
            [
                'id' => '5',
                'serviceName' => 'Estate Maintenance',
                'icon' => 'maintenance',
                'iconBg' => 'bg-slate-100',
                'iconColor' => 'text-slate-600',
                'totalAmount' => 3000000,
                'totalPayments' => 2800000,
                'balanceDue' => 200000,
                'collectionRate' => 93,
            ],
        ];

        return response()->json([
            'status' => 'success',
            'data' => [
                'metrics' => $metrics,
                'revenueHistory' => $revenueHistory,
                'revenueByService' => $revenueByService,
                'breakdowns' => $breakdowns,
            ],
        ]);
    }

    /**
     * Get Mobile Financial Overview for Finance Mobile Dashboard (Task 3).
     */
    public function mobileOverview(Request $request): JsonResponse
    {
        $metrics = [
            [
                'id' => 'total-revenue',
                'label' => 'TOTAL REVENUE',
                'value' => '₦2,482,900',
                'accentColor' => 'emerald',
                'icon' => 'wallet',
                'badgeType' => 'trend',
                'badgeValue' => '↗ 12%',
            ],
            [
                'id' => 'monthly-target',
                'label' => 'MONTHLY TARGET',
                'value' => '₦450,000',
                'accentColor' => 'amber',
                'icon' => 'flag',
                'badgeType' => 'radial',
                'badgeValue' => '76%',
            ],
            [
                'id' => 'outstanding',
                'label' => 'OUTSTANDING',
                'value' => '₦12,400',
                'accentColor' => 'rose',
                'icon' => 'briefcase',
                'badgeType' => 'action',
                'actionText' => 'View',
            ],
        ];

        $trendMonths = [
            ['month' => 'JAN', 'value' => 380000],
            ['month' => 'FEB', 'value' => 410000],
            ['month' => 'MAR', 'value' => 450000, 'isSelected' => true],
            ['month' => 'APR', 'value' => 390000],
            ['month' => 'MAY', 'value' => 430000],
            ['month' => 'JUN', 'value' => 420000],
        ];

        $recentTransactions = [
            [
                'id' => '1',
                'title' => 'Unit 402 - Rent',
                'subtitle' => 'Oct 12, 2023 • Check No. 902',
                'amount' => '+₦3,200',
                'type' => 'income',
                'status' => 'PAID',
                'icon' => 'home',
            ],
            [
                'id' => '2',
                'title' => 'Roof Maintenance',
                'subtitle' => 'Oct 10, 2023 • Vendor Payout',
                'amount' => '-₦1,450',
                'type' => 'expense',
                'status' => 'PROCESSING',
                'icon' => 'wrench',
            ],
            [
                'id' => '3',
                'title' => 'Unit 105 - Deposit',
                'subtitle' => 'Oct 09, 2023 • Wire Transfer',
                'amount' => '+₦1,500',
                'type' => 'income',
                'status' => 'PAID',
                'icon' => 'building',
            ],
        ];

        return response()->json([
            'status' => 'success',
            'data' => [
                'greetingName' => 'Admin',
                'metrics' => $metrics,
                'trendMonths' => $trendMonths,
                'recentTransactions' => $recentTransactions,
            ],
        ]);
    }
}
