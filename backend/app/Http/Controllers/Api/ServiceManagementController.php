<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceManagementController extends Controller
{
    /**
     * GET /v1/finance/services
     *
     * Returns all estate services, KPI summary metrics, and revenue forecast (Task 18).
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'kpis' => [
                    'totalServices' => 12,
                    'activeServices' => 10,
                    'inactiveServices' => 2,
                    'expectedRevenue' => '₦15.2M',
                ],
                'services' => [
                    [
                        'id' => 'SRV-01',
                        'name' => 'Security Services',
                        'category' => 'Estate Security',
                        'fee' => 45000.00,
                        'frequency' => 'Monthly',
                        'status' => 'Active',
                        'dateCreated' => 'Jan 12, 2024',
                    ],
                    [
                        'id' => 'SRV-02',
                        'name' => 'Waste Management',
                        'category' => 'Utilities',
                        'fee' => 12500.00,
                        'frequency' => 'Monthly',
                        'status' => 'Active',
                        'dateCreated' => 'Feb 05, 2024',
                    ],
                    [
                        'id' => 'SRV-03',
                        'name' => 'Annual Maintenance Fee',
                        'category' => 'General',
                        'fee' => 250000.00,
                        'frequency' => 'Yearly',
                        'status' => 'Active',
                        'dateCreated' => 'Jan 01, 2024',
                    ],
                    [
                        'id' => 'SRV-04',
                        'name' => 'Gardening (Premium)',
                        'category' => 'Landscaping',
                        'fee' => 30000.00,
                        'frequency' => 'Quarterly',
                        'status' => 'Inactive',
                        'dateCreated' => 'Mar 10, 2024',
                    ],
                    [
                        'id' => 'SRV-05',
                        'name' => 'Electricity Surcharge',
                        'category' => 'Utilities',
                        'fee' => 15000.00,
                        'frequency' => 'Monthly',
                        'status' => 'Active',
                        'dateCreated' => 'Feb 22, 2024',
                    ],
                ],
                'forecastText' => 'Based on current active services, the projected revenue for Q2 2024 is estimated at ₦45.6M. Consider reviewing inactive services to optimize cash flow.',
                'quickTipText' => 'You can set up "Auto-Billing" for utilities to reduce manual intervention. Automated invoices are sent 5 days before the frequency deadline.',
            ],
        ]);
    }

    /**
     * POST /v1/finance/services
     *
     * Creates a new estate service in the Service Directory.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:120',
            'category'  => 'required|string|max:80',
            'fee'       => 'required|numeric|min:0',
            'frequency' => 'required|in:Monthly,Quarterly,Yearly,One-Time',
            'status'    => 'required|in:Active,Inactive',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Estate service created successfully.',
            'service' => array_merge($validated, [
                'id' => 'SRV-' . rand(100, 999),
                'dateCreated' => now()->format('M d, Y'),
            ]),
        ], 201);
    }

    /**
     * PUT /v1/finance/services/{id}
     *
     * Updates an existing estate service.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'name'      => 'sometimes|string|max:120',
            'category'  => 'sometimes|string|max:80',
            'fee'       => 'sometimes|numeric|min:0',
            'frequency' => 'sometimes|in:Monthly,Quarterly,Yearly,One-Time',
            'status'    => 'sometimes|in:Active,Inactive',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Estate service {$id} updated successfully.",
            'updated' => $validated,
        ]);
    }

    /**
     * DELETE /v1/finance/services/{id}
     *
     * Removes an estate service from the Service Directory.
     */
    public function destroy(string $id): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => "Estate service {$id} deleted successfully.",
        ]);
    }
}
