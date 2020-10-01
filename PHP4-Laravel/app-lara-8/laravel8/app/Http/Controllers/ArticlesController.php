<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index', 'show');
    }

    public function index()
    {
        $articles = Article::with('user')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Articles', compact('articles'));
    }

    public function show(Article $article)
    {
//        $article = Article::with(['comments' => function ($query) {
//            $query->with('user');
//        }])->findOrFail($id);
        return view('articles.show', compact('article'));
    }

    public function create()
    {
        $this->authorize('create', Article::class);

        return view('articles.create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Article::class);

        $this->validate($request, [
            'title' => 'required|string',
            'body' => 'required|string',
//            'user_id' => 'required|numeric|exists:users,id',
            'image' => 'required|image|mimes:jpg,jpeg,png,bmp',
        ]);

        Article::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => auth()->user()->id,
            'image' => $request->file('image')->store('img', 'public')
        ]);

        return redirect('/articles')->with(['success_message' => 'L\'article a été crée !']);
    }

    public function edit(Article $article)
    {
        $this->authorize('update', $article);

        return view('articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $user = User::find(1);
        $request['user_id'] = $user->id;

        $this->validate($request, [
            'title' => 'required|string',
            'body' => 'required|string',
            'user_id' => 'required|numeric|exists:users,id',
            'image' => 'required|image|mimes:jpg,jpeg,png,bmp',
        ]);

        $art = $article->update($request->all());

        dd($art);
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);

        $art = $article->delete();

        dd($art);
    }
}
