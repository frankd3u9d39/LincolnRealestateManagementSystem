<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FinanceReportController extends Controller
{
    /**
     * GET /v1/finance/reports
     *
     * Returns the Finance Report Center templates, usage metrics, and recent exports (Task 17).
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'filters' => [
                'month' => $request->query('month', 'Current Month'),
                'year' => $request->query('year', '2024'),
                'service' => $request->query('service', 'All Services'),
                'area' => $request->query('area', 'All Areas'),
                'status' => $request->query('status', 'All Status'),
            ],
            'data' => [
                'templates' => [
                    [
                        'id' => 'monthly-report',
                        'title' => 'Monthly Report',
                        'description' => 'Complete summary of income, expenses, and occupancy for the current billing cycle.',
                        'badgeLabel' => 'Auto-Generated',
                        'badgeTone' => 'neutral',
                        'iconType' => 'monthly',
                    ],
                    [
                        'id' => 'yearly-report',
                        'title' => 'Yearly Report',
                        'description' => 'Aggregate financial health metrics and growth analysis for the fiscal year 2023–2024.',
                        'badgeLabel' => 'Annual',
                        'badgeTone' => 'neutral',
                        'iconType' => 'yearly',
                    ],
                    [
                        'id' => 'service-report',
                        'title' => 'Service Report',
                        'description' => 'Operational efficiency report covering utility maintenance, security logs, and waste management.',
                        'badgeLabel' => 'Maintenance',
                        'badgeTone' => 'accent',
                        'iconType' => 'service',
                    ],
                    [
                        'id' => 'resident-payment-report',
                        'title' => 'Resident Payment Report',
                        'description' => 'Detailed ledger of all payments made by residents, including service fees and penalties.',
                        'badgeLabel' => 'Ledger',
                        'badgeTone' => 'neutral',
                        'iconType' => 'resident',
                    ],
                    [
                        'id' => 'outstanding-payment-report',
                        'title' => 'Outstanding Payment Report',
                        'description' => 'Track overdue accounts, total debt volume, and payment defaults by zone.',
                        'badgeLabel' => 'Critical',
                        'badgeTone' => 'critical',
                        'iconType' => 'outstanding',
                    ],
                ],
                'usageMetrics' => [
                    'title' => 'Report Usage Metrics',
                    'subtitle' => 'Total reports generated this month across all modules.',
                    'totalDownloads' => 1248,
                    'barHeights' => [38, 60, 92, 54, 38],
                ],
                'recentExports' => [
                    [
                        'id' => 'EXP-01',
                        'fileName' => 'Monthly_Tax_Summary_Oct.pdf',
                        'generatedBy' => 'Admin_Sarah_V',
                        'dateTime' => 'Oct 24, 2023 • 02:15 PM',
                        'format' => 'PDF',
                        'downloadUrl' => '/storage/exports/Monthly_Tax_Summary_Oct.pdf',
                    ],
                    [
                        'id' => 'EXP-02',
                        'fileName' => 'Resident_Ledger_Q3.xlsx',
                        'generatedBy' => 'System_Auto',
                        'dateTime' => 'Oct 23, 2023 • 09:00 AM',
                        'format' => 'XLSX',
                        'downloadUrl' => '/storage/exports/Resident_Ledger_Q3.xlsx',
                    ],
                    [
                        'id' => 'EXP-03',
                        'fileName' => 'Outstanding_Payments_All_Zones.pdf',
                        'generatedBy' => 'Admin_John_D',
                        'dateTime' => 'Oct 21, 2023 • 11:45 AM',
                        'format' => 'PDF',
                        'downloadUrl' => '/storage/exports/Outstanding_Payments_All_Zones.pdf',
                    ],
                ],
            ],
        ]);
    }

    /**
     * POST /v1/finance/reports/export
     *
     * Generates a PDF or XLSX report for a template or custom filter set.
     */
    public function export(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'template_id' => 'required|string',
            'format'      => 'required|in:PDF,XLSX',
            'month'       => 'nullable|string',
            'year'        => 'nullable|string',
            'service'     => 'nullable|string',
            'area'        => 'nullable|string',
            'status'      => 'nullable|string',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Report generated successfully.',
            'export' => [
                'id' => 'EXP-' . rand(100, 999),
                'fileName' => ucfirst(str_replace('-', '_', $validated['template_id'])) . '.' . strtolower($validated['format']),
                'generatedBy' => 'Admin_Profile',
                'dateTime' => now()->format('M d, Y • h:i A'),
                'format' => $validated['format'],
            ],
        ], 201);
    }
}
