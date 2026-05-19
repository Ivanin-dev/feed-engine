<?php

namespace App\Http\Controllers;

use App\Enums\PaginationEnum;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(Request $request)
    {

        $query = User::query()->latest();

        if ($request->user()) {
            $query->whereKeyNot($request->user()->getKey());
        }

        $users = $query->paginate(PaginationEnum::PAGE_SIZE->value);

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

}
