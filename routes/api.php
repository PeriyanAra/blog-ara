<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// User login register routes
Route::post('register', 'API\LoginController@register');
Route::post('auth', 'API\LoginController@login');
Route::get('logout', 'API\LoginController@logout');

// Posts routes
Route::resource('/posts', 'API\PostsController');








// Route::group(['middleware' => ['auth:api']], function(){

//     Route::get('/user', 'UserController@details');
   
// })



