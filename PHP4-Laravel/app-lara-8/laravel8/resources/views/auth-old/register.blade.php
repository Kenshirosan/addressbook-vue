@extends('layouts.master')

@section('title')
    Créer un compte
@endsection

@section('content')
    <div class="form">
        <form action="/register" method="POST">
            @csrf
            <input type="text" name="name"  value="{{ old('name') }}" placeholder="votre nom">
            @error('title')
            <div>{{ $message }}</div>
            @enderror
            <input name="email" type="email" value="{{ old('email') }}" placeholder="votre email">
            @error('email')
            <div>{{ $message }}</div>
            @enderror
            <input type="password" name="password" placeholder="mot de passe">
            @error('password')
            <div>{{ $message }}</div>
            @enderror
            <input type="password" name="password_confirmation" placeholder="confirmation du mot de passe">
            @error('password_confirmation')
            <div>{{ $message }}</div>
            @enderror
            <button type="submit">Enregistrer</button>
        </form>
    </div>
@endsection
