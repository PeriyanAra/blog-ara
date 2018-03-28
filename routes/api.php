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

// User login register routes
Route::post('register', 'API\LoginController@register');
Route::post('/auth', 'API\LoginController@login');
Route::post('/ifAdmin', 'API\UsersController@ifAdmin');

// Resource routes
Route::resource('/posts', 'API\PostsController');
Route::resource('/users', 'API\UsersController');
Route::resource('/categories', 'API\CategoriesController');
Route::resource('/comments', 'API\CommentController');








Route::group(['middleware' => ['auth:api']], function(){

    Route::get('/user', 'UserController@details');
    Route::get('/logout', 'API\LoginController@logout');

    
});