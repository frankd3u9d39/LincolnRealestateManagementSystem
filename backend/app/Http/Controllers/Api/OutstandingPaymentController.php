<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OutstandingPaymentController extends Controller
{
    /**
     * GET /v1/payments/outstanding
     *
     * Returns a paginated list of outstanding (overdue, pending, partial) payments.
     *
     * Query parameters:
     *   service_type  string  Filter by service type
     *   status        string  Filter by status: overdue|pending|partial
     *   sort_by       string  Sort column: due_date|amount|days_overdue|name (default: due_date)
     *   per_page      int     Records per page (default: 15)
     *   page          int     Page number (default: 1)
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'service_type' => 'nullable|string|max:100',
            'status'       => 'nullable|in:overdue,pending,partial',
            'sort_by'      => 'nullable|in:due_date,amount,days_overdue,name',
            'per_page'     => 'nullable|integer|min:5|max:100',
        ]);

        // TODO: Replace with real Eloquent query
        // Example query shape:
        //
        // $query = Payment::query()
        //     ->whereIn('status', ['overdue', 'pending', 'partial'])
        //     ->with(['resident', 'property', 'service'])
        //     ->when($request->service_type, fn($q, $v) => $q->whereHas('service', fn($s) => $s->where('name', $v)))
        //     ->when($request->status, fn($q, $v) => $q->where('status', $v))
        //     ->when($request->sort_by === 'amount', fn($q) => $q->orderByDesc('amount_due'))
        //     ->when($request->sort_by === 'days_overdue', fn($q) => $q->orderByDesc('days_overdue'))
        //     ->when($request->sort_by === 'name', fn($q) => $q->orderBy('residents.name'))
        //     ->when(!$request->sort_by || $request->sort_by === 'due_date', fn($q) => $q->orderBy('due_date'))
        //     ->paginate($request->per_page ?? 15);

        return response()->json([
            'message' => 'Outstanding payments endpoint — connect to Eloquent query.',
            'data'    => [],
            'summary' => [
                'total_outstanding' => 0,
                'overdue_count'     => 0,
                'pending_count'     => 0,
                'partial_count'     => 0,
            ],
            'meta' => [
                'current_page' => 1,
                'per_page'     => 15,
                'total'        => 0,
                'last_page'    => 1,
            ],
        ]);
    }

    /**
     * POST /v1/payments/outstanding/{id}/remind
     *
     * Sends a payment reminder notification to a resident.
     */
    public function sendReminder(string $id): JsonResponse
    {
        // TODO: Find payment record, trigger notification (mail/SMS via queue)
        // Example:
        // $payment = Payment::findOrFail($id);
        // $payment->resident->notify(new PaymentReminderNotification($payment));

        return response()->json([
            'message' => "Reminder sent for payment ID: {$id}",
            'sent_at' => now()->toIso8601String(),
        ]);
    }

    /**
     * POST /v1/payments/outstanding/remind-all
     *
     * Sends bulk reminders to all residents with outstanding payments.
     */
    public function sendBulkReminders(Request $request): JsonResponse
    {
        // TODO: Queue bulk notification job
        // Example:
        // dispatch(new SendBulkPaymentRemindersJob($request->status));

        return response()->json([
            'message'    => 'Bulk reminders queued successfully.',
            'queued_at'  => now()->toIso8601String(),
        ]);
    }
}
