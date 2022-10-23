$(document).ready(function () {
    $('#ctable').DataTable({
        ajax:{
            url:"/api/customer/all",
            dataSrc: ""
        },
        dom:'Bfrtip',
        buttons:[
            'pdf',
            'excel',
            {
                text:'Add Customer',
                className: 'btn btn-primary',
                action: function(e, dt, node, config){
                    $("#cform").trigger("reset");
                    $('#customModal').modal('show');
                }
            }
        ],
        columns:[
            {data: 'customer_id'},
            {data: 'title'},
            {data: 'user_id'},
            {data: 'lname'},
            {data: 'fname'},
            {data: 'addressline'},
            {data: 'town'},
            {data: 'zipcode'},
            {data: 'phone'},
            {data: 'creditlimit'},
            {data: 'level'},
            {data: 'customerImage'},
            {data: null,
                render: function (data, type, row) {
                    return "<a href='#' data-bs-toggle='modal' data-bs-target='#editItemModal' id='editbtn' data-id=" +
                        data.item_id + "><i class='fa-solid fa-pen-to-square' aria-hidden='true' style='font-size:24px' ></i></a>  <a href='#' class='deletebtn' data-id=" + data.item_id + "><i class='fa-sharp fa-solid fa-trash' style='font-size:24px; color:red'></a></i>";
                },
            },
        ]
        
    })

});

// inserting data
 $("#myFormSubmit").on("click", function (e) {
        e.preventDefault();
        var data = $("#cform")[0];
        console.log(data);

        let formData = new FormData(data);

        console.log(formData);
        for (var pair of formData.entries()){
            console.log(pair[0] + ',' + pair[1]);
        }

        $.ajax({
            type: "POST",
            url: "/api/customer",
            data:formData,
            contentType: false,
            processData: false,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType:"json", 

            success:function(data){
                   console.log(data);
                   $("#customModal").modal("hide");

                   var $ctable = $('#ctable').DataTable();
                   $ctable.row.add(data.customer).draw(false); 
            },

            error:function (error){
                console.log(error);
            }
        })
    });

// storing data
// $("#myFormSubmit").on("click", function (e) {
//         e.preventDefault();
//         var data = $("#cform").serialize();
//         console.log(data);
//         $.ajax({
//             type: "POST",
//             url: "/api/customer",
//             data: data,
//             headers: {
//                 "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"), },
//             dataType: "json",
//             success: function (data) {
//                 console.log(data);

//                 $("#myModal").each(function () {
//                     $(this).modal("hide");
//                 });

//                 var tr = $("<tr>");
//                 tr.append($("<td>").html(data.customer_id));
//                 tr.append($("<td>").html(data.title));
//                 tr.append($("<td>").html(data.user_id));
//                 tr.append($("<td>").html(data.lname));
//                 tr.append($("<td>").html(data.fname));
//                 tr.append($("<td>").html(data.addressline));
//                 tr.append($("<td>").html(data.town));
//                 tr.append($("<td>").html(data.zipcode));
//                 tr.append($("<td>").html(data.phone));
//                 tr.append($("<td>").html(data.creditlimit));
//                 tr.append($("<td>").html(data.level));
//                 tr.append( "<td align='center'><a href='#' data-bs-toggle='modal' data-bs-target='#editModal' id='editbtn' data-id=" + data.customer_id + "><i class='fa fa-pencil-square-o' aria-hidden='true' style='font-size:24px' ></a></i></td>"
//                 );
//                 tr.append("<td><a href='#'  class='deletebtn' data-id=" + data.customer_id + "><i  class='fa fa-trash-o' style='font-size:24px; color:red' ></a></i></td>");
//                 $("#cbody").prepend(tr);
//             },

//             error: function (error) {
//                 console.log(error);
//             },
//         });
//     });


    //delete record
$("#cbody").on("click", ".deletebtn", function (e) {
    var id = $(this).data("id");
    var $tr = $(this).closest("tr");
    // var id = $(e.relatedTarget).attr('id');
    console.log(id);
    e.preventDefault();
    bootbox.confirm({
        message: "do you want to delete this customer",
        buttons: {
            confirm: {
                label: "yes",
                className: "btn-success",
            },
            cancel: {
                label: "no",
                className: "btn-danger",
            },
        },
        callback: function (result) {
            if (result)
                $.ajax({
                    type: "DELETE",
                    url: "/api/customer/" + id,
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        // bootbox.alert('success');
                        $tr.find("td").fadeOut(2000, function () {
                            $tr.remove();
                        });
                    },
                    error: function (error) {
                        console.log(error);
                    },
                });
        },
    });
});

$("#editModal").on("show.bs.modal", function (e) {
    var id = $(e.relatedTarget).attr("data-id");
    // console.log(id);
    $("<input>")
        .attr({
            type: "hidden",
            id: "customer_id",
            name: "customer_id",
            value: id,
        })
        .appendTo("#updateform");
    $.ajax({
        type: "GET",
        url: "/api/customer/" + id + "/edit",
        success: function (data) {
            // console.log(data);
            $("#title").val(data.title);
            $("#lname").val(data.lname);
            $("#fname").val(data.fname);
            $("#address").val(data.addressline);
            $("#town").val(data.town);
            $("#zipcode").val(data.zipcode);
            $("#phone").val(data.phone);
            $("#creditlimit").val(data.creditlimit);
            $("#level").val(data.level);
        },
        error: function () {
            console.log("AJAX load did not work");
            alert("error");
        },
    });
});

$("#editModal").on("hidden.bs.modal", function (e) {
    $("#updateform").trigger("reset");
});

$("#updatebtn").on("click", function (e) {
    var id = $("#customerid").val();
    var data = $("#updateform").serialize();
    console.log(data);
    $.ajax({
        type: "PUT",
        url: "/api/customer/" + id,
        data: data,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        dataType: "json",
        success: function (data) {
            console.log(data);

        

            $("#editModal").each(function () {
                $(this).modal("hide");
               
            });



        },
        error: function (error) {
            console.log(error);
        },
    });
});


    