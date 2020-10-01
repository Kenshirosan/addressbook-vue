@extends('layouts.master')

@section('title', 'Lire l\'article ' . $article->title)

@section('content')
<section class="article">
    <article>
        <a href="/article/{{ $article->id }}/edit">Éditer l'article</a>
        <h3>Article écrit par {{ $article->author }} le <small>{{ $article->created_at->diffForHumans() }}</small></h3>
        <h4>{{ $article->title }}</h4>
        <div class="img"><img src="{{ asset($article->image) }}" alt="image"></div>
        <p>{{ $article->body }}</p>
    </article>
</section>
<section class="comments">
    <h2>Commentaires :</h2>
    <article>
        @foreach($article->comments as $comment)
            <p><strong>{{ $comment->user->name }}</strong> a réagi :</p>
            <p>{{ $comment->comment }}</p>
            <p><small>{{ $comment->created_at->diffForHumans() }}</small></p>
        @endforeach
    </article>
</section>
@endsection
