<?php

use App\Http\Controllers\Api\StoreDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/store/dashboard', StoreDashboardController::class)
    ->name('store.dashboard');
