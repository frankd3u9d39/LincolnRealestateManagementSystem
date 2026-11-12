<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    /**
     * Get official payment receipt data by receipt number.
     */
    public function show(string $receiptNumber): JsonResponse
    {
        $receipt = [
            'receiptNumber' => $receiptNumber,
            'status' => 'Payment Success',
            'residentName' => 'Alexander J. Montgomery',
            'residentEmail' => 'alexander.m@example.com',
            'propertyName' => 'House No. 42B, Willow Creek',
            'estatePhase' => 'LincolnEstate Phase II',
            'lineItems' => [
                [
                    'id' => '1',
                    'serviceDescription' => 'Monthly Security Levy',
                    'subDescription' => '24/7 Patrol & Access Control',
                    'billingPeriod' => 'Oct 01 - Oct 31, 2023',
                    'amount' => 150.00,
                ],
                [
                    'id' => '2',
                    'serviceDescription' => 'Waste Management Service',
                    'subDescription' => 'Bi-weekly pickup schedule',
                    'billingPeriod' => 'Oct 01 - Oct 31, 2023',
                    'amount' => 45.00,
                ],
                [
                    'id' => '3',
                    'serviceDescription' => 'Estate Maintenance Fee',
                    'subDescription' => 'Landscaping & Public Lighting',
                    'billingPeriod' => 'Oct 01 - Oct 31, 2023',
                    'amount' => 85.00,
                ],
            ],
            'totalAmount' => 280.00,
            'paymentMethod' => 'Visa ending in •••• 4492',
            'transactionDate' => 'October 14, 2023 | 09:42 AM',
            'generatedBy' => 'Fin-System v4.0 (Auth: LV)',
            'qrVerificationUrl' => "https://lincolnestate.ng/verify/{$receiptNumber}",
            'authorizationStampText' => 'LINCOLN APPROVED',
            'disclaimer' => 'This is a computer-generated document. No physical signature is required. LincolnEstate Finance Office, 500 Corporate Blvd, Sector 9.',
        ];

        return response()->json([
            'status' => 'success',
            'data' => $receipt,
        ]);
    }
}
