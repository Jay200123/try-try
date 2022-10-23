<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use View;
use Storage;

class CustomerController extends Controller
{
    public function index()
    {
        return View::make('customer.index');
    }

    public function getCustomerAll(Request $request)
    {
        // if ($request->ajax()){
        $customers = Customer::orderBy('customer_id', 'ASC')->get();
        return response()->json($customers);
        //  }
    }

    public function getCustomer(Request $request, $id){
        // if ($request->ajax()) {
            $customer = Customer::where('id',$id)->first();
             return response()->json($customer);
        // }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $customer = Customer::create($request->all());
        // return response()->json($customer);

        $customer = new Customer;
        $customer->title = $request->title;
        $customer->user_id = $request->user_id;
        $customer->lname = $request->lname;
        $customer->fname = $request->fname;
        $customer->addressline = $request->addressline;
        $customer->town = $request->town;
        $customer->zipcode = $request->zipcode;
        $customer->phone = $request->phone;
        $customer->creditlimit = $request->creditlimit;
        $customer->level = $request->level;

        $files = $request->file('uploads');

        $customer->customerImage = 'images/'.$files->getClientOriginalName();
        $customer->save();

        Storage::put('public/images/'.$files->getClientOriginalName(), file_get_contents($files));
        return response()->json(["success" => "Customer's data recorded successfully.", "customer" => $customer, "status" => 200]);

    } 

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
       {
        $customer = Customer::find($id);
        return response()->json($customer);
        }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // if ($request->ajax()) {
        $customer = Customer::find($id);
        $customer = $customer->update($request->all());
         return response()->json($customer);
        // }
    } 

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();
        return response()->json(["success" => "customer deleted successfully.",
             "status" => 200]);
    }
}