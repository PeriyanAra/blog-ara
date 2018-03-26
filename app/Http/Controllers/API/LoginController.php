<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Response;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->content = array();
    }
    
    public function register(Request $request) {
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json($user);
    }


    public function login()
    {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')]))
        {
            $user = Auth::user();
            $this->content['user'] = $user;
            $this->content['token'] =  $user->createToken('Pizza App')->accessToken;
            $status = 200;
        }
        else
        {
            $this->content['error'] = "Bad pass or login";
            $status = 401;
        }
        return response()->json($this->content, $status);    
    }

    public function logout(){
        Auth::logout();
        return response()->json(['message' => 'success']);
    }
}
