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
    public function index(Request $request)
    {      
        $posts = Post::all();
        foreach ($posts as $post) {
            $post->category;
            $post->user;
        }
        return $posts;
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
        $request->validate([
            'user_id' => 'required',
            'title' => 'required',
            'text' => 'required',
            'cаtegory_id' => 'required',
        ]);

        $post = new Post;
        $post->user_id = $request->user_id;
        $post->title = $request->title;
        $post->text = $request->text;
        $post->category_id = $request->category_id;
        
        if($post->save()){
            return $post;
        }
        else{
            return response()->json([
                'message' => 'ID must be an integer and larger than 0'
            ], 400);
        }
        
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if($id < 0 || gettype($id) == 'string'){
            return response()->json([
                'message' => 'ID must be an integer and larger than 0'
            ], 400);
        }
        else if (!Post::find($id)) {
            return response()->json([
                'message' => 'the user has not been found'
            ], 404);
        }
        $post = Post::find($id);
        $post->category;
        $post->user;
        $post->comments;
        return $post;
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
        $request->validate([
            'title' => 'required',
            'text' => 'required'
        ]);

        Post::where('id', $id)
            ->update(['title' => $request->title, 'text' => $request->text]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if($id < 0 || gettype($id) == 'string'){
            return response()->json([
                'message' => 'ID must be an integer and larger than 0'
            ], 400);
        }
        else if (!Post::find($id)) {
            return response()->json([
                'message' => 'the user has not been found'
            ], 404);
        }
        Post::destroy($id);
    }
}
