<?php

namespace App\Services;

use App\Models\RunningNumber;
use Illuminate\Support\Str;

class RunningNumberService
{
    public static function getID($type): string
    {
        if ($type === 'order_opened') {
            $format = RunningNumber::where('type', 'order_opened')->first();
            $lastID =  $format['last_number'] + 1;
            $format->increment('last_number');
            $format->save();

            return Str::padLeft($lastID, $format['digits'], "0");
        } else {
            $format = RunningNumber::where('type', $type)->first();
            $lastID =  $format['last_number'] + 1;
            $format->increment('last_number');
            $format->save();
            return $format['prefix'] . Str::padLeft($lastID, $format['digits'], "0");
        }
    }
}
