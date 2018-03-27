<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OauthAccessToken extends Model
{
    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $table = 'oauth_access_tokens';

    protected $guarded = [];
}
