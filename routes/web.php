<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhoneNumberController;
use App\Http\Controllers\ProfileController;
use App\Models\Contact;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Contact Backend
Route::post('/api/contact/store',[ContactController::class, 'store']);
Route::get('/api/contact/index',[ContactController::class, 'index']);
Route::get('/api/contact/{contact}/show',[ContactController::class, 'show']);
Route::put('/api/contact/{contact}/update',[ContactController::class, 'update']);
Route::delete('/api/contact/{contact}/destroy',[ContactController::class, 'destroy']);
//Address Backend
Route::post('/api/address/store/{contact}',[AddressController::class, 'store']);
Route::get('/api/address/index',[AddressController::class, 'index']);
Route::get('/api/address/{address}/show',[AddressController::class, 'show']);
Route::put('/api/address/{address}/update',[AddressController::class, 'update']);
Route::delete('/api/address/{address}/destroy',[AddressController::class, 'destroy']);
// PhoneNumber Backend
Route::post('/api/phonenumber/store', [PhoneNumberController::class, 'store']);
Route::get('/api/phonenumber/index', [PhoneNumberController::class, 'index']);
Route::get('/api/phonenumber/{phoneNumber}/show', [PhoneNumberController::class, 'show']);
Route::put('/api/phonenumber/{phoneNumber}/update', [PhoneNumberController::class, 'update']);
Route::delete('/api/phonenumber/{phoneNumber}/destroy', [PhoneNumberController::class, 'destroy']);

//front
Route::get('/frontend/contact/index',[ContactController::class,'index']);

Route::get('/view/contacts/create', function(){
    return Inertia::render('Contact/create/index');
});
Route::get('/view/contacts', function () {
    return Inertia::render('Contact/home/index');
});
// Route::get('/view/contacts/update', function () {
//     return Inertia::render('Contact/edit/index');
// });
Route::get('/view/contacts/{contact}/update', function (Contact $contact) {
    return Inertia::render('Contact/edit/index', [
        'contact' => $contact,
    ]);
});
// Route::get('/view/contacts/details', function () {
//     return Inertia::render('Contact/details/index');
// });
Route::get('/view/contacts/{contact}/details', function (Contact $contact) {
    return Inertia::render('Contact/details/index', [
        'contact' => $contact,
    ]);
});
// Route::get('/view/contacts/address', function () {
//     return Inertia::render('Address/addAddress/index');
// });
Route::get('/view/contacts/{contact}/address', function (Contact $contact) {
    return Inertia::render('Address/addAddress/index', [
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/phone', function () {
    return Inertia::render('PhoneNumber/addPhoneNumber/index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
