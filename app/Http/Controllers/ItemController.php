<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use View;
use Storage;

class ItemController extends Controller
{
    public function index(){

        return View::make('item.index');
    }

    public function getItem(Request $request, $id){
        $item = Item::where('id',$id)->first();
             return response()->json($item);
    }

    public function getItemAll(Request $request){

        $items = Item::orderBy('item_id', 'ASC')->get();
        return response()->json($items);

    }

    public function store(Request $request){

        $item = new Item;
        $item->description = $request->description;
        $item->title = $request->title;
        $item->cost_price = $request->cost_price;
        $item->sell_price = $request->sell_price;

        $files = $request->file('uploads');

        $item->imagePath = 'images/'.$files->getClientOriginalName();
        $item->save();

        Storage::put('public/images/'.$files->getClientOriginalName(), file_get_contents($files));
        return response()->json(["success" => "item created successfully.", "item" => $item, "status" => 200]);

    }

    public function edit(Request $request, $id){

        $item = Item::findOrFail($id);
        $item = $item->update($request->all());

        $item = Item::findOrFail($id);
        return response()->json($item);
    }
}