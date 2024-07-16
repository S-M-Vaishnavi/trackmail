<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MailController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date'=>'required|date',
            'time'=>'required|string',
            'timeZone'=>'required|string',
            'email'=>'required|email|unique:users',
            'sequence'=>'required|string'
        ]);

        $user = User::create($validatedData);

        return response()->json(['message'=> 'User created successfully']);
    }
}
