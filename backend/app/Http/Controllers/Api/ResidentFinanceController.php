<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ResidentFinanceController extends Controller
{
    /**
     * GET /v1/residents/{id}/finance-summary
     *
     * Returns the full Resident Finance Summary (Task 15) including:
     * - Resident Profile (unit, street, phone, status)
     * - 4 KPI Summary Metrics (Total Paid, Outstanding Balance, Last Payment, Active Services)
     * - Payment Timeline records
     * - Outstanding Bills & automated billing notice
     * - Billing Preferences & Lease Document metadata
     */
    public function show(string $id): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'profile' => [
                    'id' => $id,
                    'name' => 'Marcus Holloway',
                    'unit' => 'Villa A-402',
                    'street' => 'Boulevard Crescent',
                    'phone' => '+234 810 445 2291',
                    'status' => 'ACTIVE',
                ],
                'kpis' => [
                    'totalPaid' => 1400000,
                    'outstandingBalance' => 150000,
                    'lastPaymentDate' => 'Oct 24, 2023',
                    'activeServicesCount' => 4,
                ],
                'paymentTimeline' => [
                    [
                        'id' => 'TL-1',
                        'serviceName' => 'Security Levy',
                        'invoiceNumber' => '#INV-4402',
                        'iconType' => 'security',
                        'amount' => 45000,
                        'date' => 'Oct 24, 2023',
                        'status' => 'PAID',
                    ],
                    [
                        'id' => 'TL-2',
                        'serviceName' => 'Waste Management',
                        'invoiceNumber' => '#INV-4401',
                        'iconType' => 'waste',
                        'amount' => 12500,
                        'date' => 'Sep 28, 2023',
                        'status' => 'PAID',
                    ],
                    [
                        'id' => 'TL-3',
                        'serviceName' => 'Utility Maintenance',
                        'invoiceNumber' => '#INV-4398',
                        'iconType' => 'utility',
                        'amount' => 25000,
                        'date' => 'Sep 15, 2023',
                        'status' => 'PAID',
                    ],
                ],
                'outstandingBills' => [
                    [
                        'id' => 'BILL-Q4',
                        'title' => 'Service Charge (Q4)',
                        'dueDate' => 'Nov 15, 2023',
                        'amount' => 150000,
                        'daysOverdue' => 12,
                        'status' => 'OVERDUE',
                    ],
                ],
                'nextBillingNotice' => 'Automated billing for the next cycle (Q1 2024) will be generated on Dec 20, 2023.',
                'preferences' => [
                    'preferredMethod' => 'Bank Transfer',
                    'billingFrequency' => 'Quarterly',
                    'autoPayStatus' => 'Disabled',
                    'documentName' => 'Lease Agreement.pdf',
                    'documentUrl' => '/storage/documents/lease-agreement-a402.pdf',
                ],
            ],
        ]);
    }

    /**
     * POST /v1/residents/{id}/record-payment
     *
     * Records a manual payment for a resident and generates an official receipt.
     */
    public function recordPayment(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|string',
            'amount'     => 'required|numeric|min:1',
            'method'     => 'required|string|in:Bank Transfer,Card,Cash,Paystack',
            'reference'  => 'nullable|string',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Payment recorded successfully for resident {$id}.",
            'receipt_number' => 'RE-' . date('Y') . '-' . rand(10000, 99999),
            'recorded' => $validated,
        ], 201);
    }
}
