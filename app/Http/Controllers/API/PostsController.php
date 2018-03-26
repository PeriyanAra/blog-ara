<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $posts = DB::table('posts')
                                ->join('users', 'posts.user_id', '=', 'users.id')
                                ->select('posts.id as post_id', 'posts.title', 'posts.text', 'posts.created_at', 'posts.updated_at', 'users.id as user_id', 'users.name')
                                ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = new Post;
        $post->user_id = $request->user_id;
        $post->title = $request->title;
        $post->text = $request->text;
        $post->save();
        
        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(Post::find($id)){
            return $posts2 = DB::table('posts')
                                ->join('users', 'posts.user_id', '=', 'users.id')
                                ->select('posts.id as post_id', 'posts.title', 'posts.text', 'posts.created_at', 'posts.updated_at', 'users.id as user_id', 'users.name')
                                ->where('posts.id', '=', $id)
                                ->get();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Post::where('id', $id)
            ->update(['title' => $request->title]);
        
        return 'lava';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
