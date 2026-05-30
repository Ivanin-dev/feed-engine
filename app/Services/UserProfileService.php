<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserProfileService extends User
{
    public function updateProfile(Request $request, User $user, $validated)
    {

        $updateData = collect()->toArray();

        foreach (['name', 'email', 'headline', 'description'] as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $validated[$field];
            }
        }
        foreach (['avatar', 'banner'] as $field) {
            if ($request->hasFile($field)) {
                if ($request->user()->{$field}) {
                    Storage::disk('public')->delete($request->user()->{$field});
                }
                $updateData[$field] = $request->file($field)->store($field.'s', 'public');
            }
        }

        if ($request->filled('password')) {
            $updateData['password'] = \Hash::make($validated['password']);
        }

        $user->update($updateData);
    }
}
