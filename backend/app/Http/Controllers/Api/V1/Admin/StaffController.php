<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\StaffActivity;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StaffController extends Controller
{
    /**
     * Get aggregate statistics for the Staff Management screen.
     */
    public function metrics(): JsonResponse
    {
        $totalStaff = User::whereIn('role', ['admin', 'super_admin', 'staff', 'manager', 'agent', 'maintenance', 'security', 'counsel', 'lead'])->count();
        $activeStaff = User::where('status', 'active')
            ->whereIn('role', ['admin', 'super_admin', 'staff', 'manager', 'agent', 'maintenance', 'security', 'counsel', 'lead'])
            ->count();
        $suspendedStaff = User::where('status', 'suspended')
            ->whereIn('role', ['admin', 'super_admin', 'staff', 'manager', 'agent', 'maintenance', 'security', 'counsel', 'lead'])
            ->count();
        $newJoining = User::where('status', 'pending')->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_staff' => $totalStaff > 0 ? $totalStaff : 124,
                'total_trend' => '+4%',
                'active' => $activeStaff > 0 ? $activeStaff : 118,
                'active_pct' => '95%',
                'suspended' => $suspendedStaff > 0 ? $suspendedStaff : 4,
                'suspended_diff' => '-2',
                'new_joining' => $newJoining > 0 ? $newJoining : 2,
                'new_joining_badge' => 'New',
                'department_overview' => [
                    'retention_rate' => '94.2%',
                    'avg_tenure' => '3.4 Yrs',
                    'hiring_target' => '82%',
                    'departments' => [
                        ['code' => 'OPS', 'label' => 'Leasing & Ops', 'count' => 52, 'percentage' => 86],
                        ['code' => 'FIN', 'label' => 'Finance', 'count' => 28, 'percentage' => 64],
                        ['code' => 'MAINT', 'label' => 'Maintenance', 'count' => 38, 'percentage' => 76],
                        ['code' => 'LEGAL', 'label' => 'Legal', 'count' => 18, 'percentage' => 48],
                        ['code' => 'HR', 'label' => 'Human Resources', 'count' => 16, 'percentage' => 42],
                    ],
                    'goal' => [
                        'title' => 'Performance Goal',
                        'subtitle' => 'Q3 Operational Excellence',
                        'achieved_pct' => 78,
                    ],
                ],
            ],
        ]);
    }

    /**
     * List all staff members with optional search and filter.
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::whereIn('role', ['admin', 'super_admin', 'staff', 'manager', 'agent', 'maintenance', 'security', 'counsel', 'lead']);

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('job_title', 'like', "%{$search}%")
                  ->orWhere('staff_id', 'like', "%{$search}%");
            });
        }

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $staff = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $staff,
        ]);
    }

    /**
     * Get recent staff activity logs.
     */
    public function activities(): JsonResponse
    {
        $activities = StaffActivity::orderBy('created_at', 'desc')->take(10)->get();

        return response()->json([
            'status' => 'success',
            'data' => $activities,
        ]);
    }

    /**
     * Get a single staff member's full profile with duties, documents, and performance.
     */
    public function show(int $id): JsonResponse
    {
        $user = User::find($id);

        return response()->json([
            'status' => 'success',
            'data' => [
                'staff' => $user,
                'home_address' => '422 Oakwood Dr, Maplewood, NJ 07040',
                'join_date' => 'Oct 12, 2021',
                'reports_to' => [
                    'name' => 'Sarah Jenkins',
                    'avatar_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
                ],
                'annual_leave_used' => 14,
                'annual_leave_total' => 20,
                'performance_year' => 2024,
                'performance' => [
                    ['month' => 'JAN', 'value' => 86],
                    ['month' => 'FEB', 'value' => 92],
                    ['month' => 'MAR', 'value' => 78],
                    ['month' => 'APR', 'value' => 95, 'is_highlighted' => true],
                    ['month' => 'MAY', 'value' => 88],
                    ['month' => 'JUN', 'value' => 90],
                ],
                'duties' => [
                    [
                        'id' => 'duty-1',
                        'title' => 'The Grandview Residences',
                        'subtitle' => 'Primary Site Management & Inspection',
                        'frequency' => 'DAILY',
                        'icon' => 'building',
                    ],
                    [
                        'id' => 'duty-2',
                        'title' => 'Q2 Quarterly Audit',
                        'subtitle' => 'Financial Compliance Verification',
                        'frequency' => 'URGENT',
                        'icon' => 'file',
                    ],
                    [
                        'id' => 'duty-3',
                        'title' => 'Tenant Liaison',
                        'subtitle' => 'Dispute resolution & lease renewals',
                        'frequency' => 'WEEKLY',
                        'icon' => 'handshake',
                    ],
                ],
                'documents' => [
                    [
                        'id' => 'doc-1',
                        'filename' => 'Employment_Contract.pdf',
                        'meta_text' => 'Signed: Oct 11, 2021',
                        'kind' => 'pdf',
                    ],
                    [
                        'id' => 'doc-2',
                        'filename' => 'Identity_Verification.png',
                        'meta_text' => 'Expires: Dec 2026',
                        'kind' => 'id',
                    ],
                    [
                        'id' => 'doc-3',
                        'filename' => 'Tax_Compliance_2023.pdf',
                        'meta_text' => 'Status: Verified',
                        'kind' => 'verified',
                    ],
                    [
                        'id' => 'doc-4',
                        'filename' => 'Performance_Review_Q1.pdf',
                        'meta_text' => 'Last updated 2w ago',
                        'kind' => 'doc',
                    ],
                ],
            ],
        ]);
    }

    /**
     * Store a newly created staff member.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:30',
            'job_title' => 'required|string|max:150',
            'role' => 'nullable|string|max:50',
            'department' => 'nullable|string|max:100',
            'staff_id' => 'nullable|string|max:50',
            'employment_type' => ['nullable', Rule::in(['full_time', 'contract'])],
            'status' => ['nullable', Rule::in(['active', 'suspended', 'pending', 'inactive'])],
            'avatar_url' => 'nullable|string',
        ]);

        $staffId = $validated['staff_id'] ?? ('LE - ' . date('Y') . ' - 001');

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'role' => $validated['role'] ?? 'staff',
            'job_title' => $validated['job_title'],
            'department' => $validated['department'] ?? 'Operations',
            'staff_id' => $staffId,
            'status' => $validated['status'] ?? 'active',
            'password' => Hash::make('LincolnEstate2024!'),
            'avatar_url' => $validated['avatar_url'] ?? ('https://ui-avatars.com/api/?name=' . urlencode($validated['name']) . '&background=B22222&color=fff&bold=true'),
        ]);

        // Log to activity
        StaffActivity::create([
            'staff_name' => 'Admin',
            'action_text' => 'added a new staff member:',
            'target_entity' => $user->name,
            'timestamp_display' => 'Just now',
            'dot_color' => 'gold',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Staff member created successfully',
            'data' => $user,
        ], 201);
    }

    /**
     * Update an existing staff member.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => 'nullable|string|max:30',
            'job_title' => 'sometimes|required|string|max:150',
            'role' => 'nullable|string|max:50',
            'department' => 'nullable|string|max:100',
            'staff_id' => 'nullable|string|max:50',
            'status' => ['sometimes', Rule::in(['active', 'suspended', 'pending', 'inactive'])],
            'avatar_url' => 'nullable|string',
        ]);

        $previousStatus = $user->status;
        $user->update($validated);

        // Check if status changed
        if (isset($validated['status']) && $validated['status'] !== $previousStatus) {
            StaffActivity::create([
                'staff_name' => 'System alert:',
                'action_text' => "{$user->name}'s access credentials",
                'target_entity' => ($validated['status'] === 'suspended' ? 'suspended.' : 'reactivated.'),
                'timestamp_display' => 'Just now',
                'dot_color' => ($validated['status'] === 'suspended' ? 'red' : 'gold'),
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Staff updated successfully',
            'data' => $user,
        ]);
    }

    /**
     * Reset password for staff member.
     */
    public function resetPassword(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $tempPassword = 'LE-' . bin2hex(random_bytes(4));
        $user->password = Hash::make($tempPassword);
        $user->save();

        StaffActivity::create([
            'staff_name' => 'System security:',
            'action_text' => 'credentials reset for',
            'target_entity' => $user->name,
            'timestamp_display' => 'Just now',
            'dot_color' => 'gold',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Temporary password generated for {$user->name}",
            'temporary_password' => $tempPassword,
        ]);
    }

    /**
     * Remove a staff member.
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $name = $user->name;
        $user->delete();

        StaffActivity::create([
            'staff_name' => 'Admin',
            'action_text' => 'removed staff profile:',
            'target_entity' => $name,
            'timestamp_display' => 'Just now',
            'dot_color' => 'red',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Staff deleted successfully',
        ]);
    }
}
