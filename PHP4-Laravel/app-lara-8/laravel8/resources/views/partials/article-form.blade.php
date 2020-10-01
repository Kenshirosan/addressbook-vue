<input type="text" name="title"  value="{{ old('title',  isset($article->title) ? $article->title : null) }}">
@error('title')
    <div>{{ $message }}</div>
@enderror
<textarea name="body" id="" cols="30" rows="10">{{ old('body',  isset($article->body) ? $article->body : null) }}</textarea>
@error('body')
    <div>{{ $message }}</div>
@enderror
<input type="file" name="image">
@error('image')
    <div>{{ $message }}</div>
@enderror
<button type="submit">Enregistrer</button>
