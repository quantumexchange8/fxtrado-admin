<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class MemberController extends Controller
{
    public function memberListing()
    {

        return Inertia::render('Member/MemberListing');
    }

    public function getMemberListing()
    {

        $member = User::whereNot('role', 'admin')->get();

        return response()->json($member);
    }

    public function memberDetails($id)
    {

        $user = User::where('id', $id)->with('wallet:id,wallet_no,balance')->first();
        
        return Inertia::render('Member/MemberDetails', [
            'user' => $user,
        ]);
    }

    public function changePassword(Request $request)
    {

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::find($request->user_id);

        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->back();
    }

    public function getMemberWallet(Request $request)
    {
        
        $wallet = Wallet::where('user_id', $request->user_id)->get();
        

        return response()->json($wallet);
    }
}
