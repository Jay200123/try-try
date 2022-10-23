<!doctype html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <title></title>
 <style type="text/css">
    td.highlight{
        background-color: whitesmoke !important;
    }
 </style>
 <link rel="stylesheet" type="text/css" href="css/style.css">
 </head>
 <body>
 @yield('body')
 @include('layouts.header')
 <nav class="navbar">
      <a href="#"><strong>Laravel JS</strong></a>

      <li><i class="fa fa-user" aria-hidden="true"></i><a href="{{route('customers.index')}}"><strong> Customer </strong></a></li>

       <li><i class="fa fa-bars" aria-hidden="true"></i><a href="{{route('items.index')}}"><strong> Item </strong></a></li>
   </nav>
 </body>
 </html>