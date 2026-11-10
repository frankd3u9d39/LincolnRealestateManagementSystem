<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\ReminderController;
use App\Http\Controllers\Api\V1\Admin\EstateUpdateController;

/*
|--------------------------------------------------------------------------
| API Routes - LincolnEstate
|--------------------------------------------------------------------------
| Prefix: /api/v1
*/

Route::prefix('v1')->group(function () {
    // Admin Dashboard Routes
    Route::prefix('admin')->group(function () {
        // Summary Metrics
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/dashboard/metrics', [DashboardController::class, 'metrics']);

        // Reminders API
        Route::apiResource('reminders', ReminderController::class);
        Route::patch('reminders/{id}/toggle-complete', [ReminderController::class, 'toggleComplete']);

        // Estate Updates API
        Route::get('/estate-updates/latest', [EstateUpdateController::class, 'latest']);
        Route::apiResource('estate-updates', EstateUpdateController::class);
    });
});
