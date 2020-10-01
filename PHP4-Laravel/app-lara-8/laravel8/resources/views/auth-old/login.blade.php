@extends('layouts.master')

@section('title')
    Identifiez vous
@endsection

@section('content')
    <div class="form">
        <form action="/login" method="POST">
            @csrf
            <input type="email" name="email"  value="{{ old('email') }}" placeholder="votre email">
            @error('email')
            <div>{{ $message }}</div>
            @enderror
            <input type="password" name="password" value="{{ old('password')  }}" placeholder="mot de passe">
            @error('password')
            <div>{{ $message }}</div>
            @enderror
            <button type="submit">S'identifier</button>
        </form>
    </div>
@endsection
