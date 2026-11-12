<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentRecordController extends Controller
{
    /**
     * Get paginated payment records with dynamic filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status', 'All Status');
        $service = $request->query('service', 'All Services');
        $search = $request->query('search', '');
        $page = (int) $request->query('page', 1);
        $perPage = (int) $request->query('per_page', 10);

        // Core Summary Metrics matching Figma
        $summary = [
            'totalRevenue' => 452890.00,
            'paidItems' => 1284,
            'pendingItems' => 56,
            'overdueItems' => 12,
        ];

        // Sample records
        $allRecords = [
            [
                'id' => '1',
                'receiptNumber' => '#REC-9021',
                'residentName' => 'John Doe',
                'property' => 'House 42, Maple St.',
                'servicePaid' => 'Security Fee',
                'amount' => 150.00,
                'date' => 'Oct 12, 2024',
                'method' => 'Bank Transfer',
                'status' => 'Paid',
            ],
            [
                'id' => '2',
                'receiptNumber' => '#REC-8845',
                'residentName' => 'Sarah Miller',
                'property' => 'House 15, Oak Drive',
                'servicePaid' => 'Maintenance',
                'amount' => 450.00,
                'date' => 'Oct 11, 2024',
                'method' => 'Credit Card',
                'status' => 'Pending',
            ],
            [
                'id' => '3',
                'receiptNumber' => '#REC-8732',
                'residentName' => 'Michael Knight',
                'property' => 'House 09, Pine Lane',
                'servicePaid' => 'Waste Mgmt',
                'amount' => 85.00,
                'date' => 'Oct 05, 2024',
                'method' => 'Cash',
                'status' => 'Overdue',
            ],
            [
                'id' => '4',
                'receiptNumber' => '#REC-8611',
                'residentName' => 'Robert Lewis',
                'property' => 'House 112, Maple St.',
                'servicePaid' => 'Security Fee',
                'amount' => 150.00,
                'date' => 'Oct 01, 2024',
                'method' => 'Bank Transfer',
                'status' => 'Paid',
            ],
            [
                'id' => '5',
                'receiptNumber' => '#REC-8540',
                'residentName' => 'Elena Rodriguez',
                'property' => 'Apartment 4B, Block 3',
                'servicePaid' => 'Water Bill',
                'amount' => 120.00,
                'date' => 'Sep 28, 2024',
                'method' => 'Paystack',
                'status' => 'Paid',
            ],
            [
                'id' => '6',
                'receiptNumber' => '#REC-8419',
                'residentName' => 'David Adeleke',
                'property' => 'Villa 10, Palm Grove',
                'servicePaid' => 'Maintenance',
                'amount' => 600.00,
                'date' => 'Sep 25, 2024',
                'method' => 'Credit Card',
                'status' => 'Paid',
            ],
            [
                'id' => '7',
                'receiptNumber' => '#REC-8390',
                'residentName' => 'Fatima Al-Hassan',
                'property' => 'House 77, Sunset Blvd',
                'servicePaid' => 'Security Fee',
                'amount' => 150.00,
                'date' => 'Sep 20, 2024',
                'method' => 'Bank Transfer',
                'status' => 'Pending',
            ],
            [
                'id' => '8',
                'receiptNumber' => '#REC-8255',
                'residentName' => 'Chukwudi Eze',
                'property' => 'House 18, Pine Lane',
                'servicePaid' => 'Waste Mgmt',
                'amount' => 85.00,
                'date' => 'Sep 15, 2024',
                'method' => 'Cash',
                'status' => 'Paid',
            ],
        ];

        // Dynamic Filtering
        $filtered = array_filter($allRecords, function ($item) use ($status, $service, $search) {
            if ($status !== 'All Status' && $item['status'] !== $status) {
                return false;
            }
            if ($service !== 'All Services' && $item['servicePaid'] !== $service) {
                return false;
            }
            if (!empty($search)) {
                $q = strtolower($search);
                $matchReceipt = str_contains(strtolower($item['receiptNumber']), $q);
                $matchName = str_contains(strtolower($item['residentName']), $q);
                $matchProp = str_contains(strtolower($item['property']), $q);
                if (!$matchReceipt && !$matchName && !$matchProp) {
                    return false;
                }
            }
            return true;
        });

        return response()->json([
            'status' => 'success',
            'summary' => $summary,
            'pagination' => [
                'currentPage' => $page,
                'perPage' => $perPage,
                'totalRecords' => 1284,
                'totalPages' => 128,
            ],
            'data' => array_values($filtered),
        ]);
    }

    /**
     * Get Payment Records Mobile Summary (Task 7).
     */
    public function mobileSummary(Request $request): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'metrics' => [
                'collectedToday' => '₦12,450.00',
                'pendingActive' => '14 Active',
            ],
            'recentPayments' => [
                [
                    'id' => '1',
                    'name' => 'Marcus Sterling',
                    'purpose' => 'Maintenance Fee',
                    'amount' => '₦1,200.00',
                    'status' => 'Paid',
                    'iconType' => 'user',
                ],
                [
                    'id' => '2',
                    'name' => 'Elena Rodriguez',
                    'purpose' => 'Parking Security',
                    'amount' => '₦450.00',
                    'status' => 'Processing',
                    'iconType' => 'car',
                ],
                [
                    'id' => '3',
                    'name' => 'Jonathan Wu',
                    'purpose' => 'Clubhouse Rental',
                    'amount' => '₦2,800.00',
                    'status' => 'Paid',
                    'iconType' => 'house',
                ],
                [
                    'id' => '4',
                    'name' => 'Sarah Jenkins',
                    'purpose' => 'Late Fee Penalty',
                    'amount' => '₦150.00',
                    'status' => 'Default',
                    'iconType' => 'alert',
                ],
                [
                    'id' => '5',
                    'name' => 'The Thompsons',
                    'purpose' => 'Annual Renovation',
                    'amount' => '₦3,400.00',
                    'status' => 'Paid',
                    'iconType' => 'wrench',
                ],
            ],
        ]);
    }
}
