<?php

use App\Http\Controllers\CustomerController;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customer/show/{id}',['uses' => 'CustomerController@getCustomer','as' => 'customer.getcustomer'] );
Route::get('/customer/all',['uses' => 'CustomerController@getCustomerAll','as' => 'customer.getcustomerall'] );
Route::resource('/customer', 'CustomerController');

Route::get('/item/show{id}', ['uses' => 'ItemController@getItem', 'as' => 'item.getcustomer']);
Route::get('/item/all', ['uses' => 'ItemController@getItemAll', 'as' => 'item.getcustomerall']);
Route::resource('/item', 'ItemController');

