<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PhoneNumberController;
use App\Http\Controllers\ProfileController;
use App\Models\Address;
use App\Models\Contact;
use App\Models\PhoneNumber;
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
Route::get('/api/address/{contact}/findByFK',[AddressController::class, 'findByFK']);
Route::put('/api/address/{address}/update',[AddressController::class, 'update']);
Route::delete('/api/address/{address}/destroy',[AddressController::class, 'destroy']);
// PhoneNumber Backend
Route::post('/api/phonenumber/store/{contact}', [PhoneNumberController::class, 'store']);
Route::get('/api/phonenumber/index', [PhoneNumberController::class, 'index']);
Route::get('/api/phonenumber/{phone}/show', [PhoneNumberController::class, 'show']);
Route::get('/api/phonenumber/{contact}/findByFK',[PhoneNumberController::class, 'findByFK']);
Route::put('/api/phonenumber/{phone}/update', [PhoneNumberController::class, 'update']);
Route::delete('/api/phonenumber/{phone}/destroy', [PhoneNumberController::class, 'destroy']);

//front
Route::get('/view/contacts/create', function(){
    return Inertia::render('Contact/create/index');
});
Route::get('/view/contacts/home', function () {
    return Inertia::render('Contact/home/index');
});
Route::get('/view/contacts/{contact}/update', function (Contact $contact) {
    return Inertia::render('Contact/edit/index', [
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/{contact}/details', function (Contact $contact) {
    return Inertia::render('Contact/details/index', [
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/{contact}/address', function (Contact $contact) {
    return Inertia::render('Address/addAddress/index', [
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/{contact}/{address}/address/edit', function (Contact $contact, Address $address) {
    return Inertia::render('Address/editAddress/index', [
        'address' => $address,
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/{contact}/phone', function (Contact $contact) {
    return Inertia::render('PhoneNumber/addPhoneNumber/index',[
        'contact' => $contact,
    ]);
});
Route::get('/view/contacts/{contact}/{phone}/phone/edit', function (Contact $contact, PhoneNumber $phone) {
    return Inertia::render('PhoneNumber/editPhoneNumber/index',[
        'phone' => $phone,
        'contact' => $contact,
    ]);
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
