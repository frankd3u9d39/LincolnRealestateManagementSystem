<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('role')->default('resident'); // super_admin, admin, security, resident, staff, manager, agent, maintenance
            $table->string('status')->default('active'); // active, inactive, suspended, pending
            $table->string('staff_id')->nullable()->unique(); // e.g. STF-4829, STF-PEND, STF-3391
            $table->string('job_title')->nullable(); // e.g. Senior Property Manager, Leasing Agent, Maintenance Tech
            $table->string('department')->nullable();
            $table->string('unit_number')->nullable(); // e.g. Villa A-402, Block B, 204
            $table->string('avatar_url')->nullable();
            $table->timestamp('requested_at')->nullable(); // for pending approvals
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->timestamp('last_active_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
