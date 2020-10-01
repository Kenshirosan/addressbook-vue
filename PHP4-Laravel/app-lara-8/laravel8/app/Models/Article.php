<?php

namespace App\Models;

use App\Traits\Likeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory; use Likeable;

     protected $fillable = ['title', 'body', 'user_id', 'image'];

     protected $appends = [
        'author'
     ];

     public function user()
     {
         return $this->belongsTo(User::class);
     }

     public function comments()
     {
         return $this->hasMany(Comment::class);
     }

     public function getCommentsAttribute()
     {
         return $this->comments()->with('user')->get();
     }

     public function getAuthorAttribute()
     {
         return $this->user->name;
     }

     public function tags()
     {
         return $this->belongsToMany(Tag::class, 'article_tag');
     }

    public function tag($tag)
    {
        return $this->tags()->attach($tag);
    }

    public function untag($tag)
    {
        return $this->tags()->detach($tag);
    }
//     public function getRouteKeyName()
//     {
//         return 'title';
//     }

}
