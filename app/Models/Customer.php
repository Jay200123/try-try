<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'customers';

    protected $primaryKey = 'customer_id';

    protected $fillable = ['title','user_id', 'fname','lname','addressline','town','zipcode','phone','creditlimit', 'level','customerImage'];
}
