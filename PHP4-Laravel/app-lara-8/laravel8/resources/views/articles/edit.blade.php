@extends('layouts.master')

@section('title')
Éditer l'article {{ $article->title }}
@endsection

@section('content')
    <form action="/article/{{ $article->id }}/edit" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PATCH')
        @include('partials.article-form')
    </form>
    <form action="/article/{{ $article->id }}/delete" method="POST">
        @csrf
        @method('DELETE')
        <input type="submit" value="Effacer l'article">
    </form>
@endsection
