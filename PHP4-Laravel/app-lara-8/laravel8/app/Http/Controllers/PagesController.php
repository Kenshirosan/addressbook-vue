<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PagesController extends Controller
{
    public function index()
    {
//        return Inertia::render('Master');
        return view('layouts.master');
    }

    public function contact()
    {
        return view('layouts.contact');
    }

    public function about()
    {
        return view('layouts.about');
    }
}
