$(document).ready(function () {
    $('#itable').DataTable({
        ajax:{
            url:"/api/item/all",
            dataSrc: ""
        },
        dom:'Bfrtip',
        buttons:[
            'pdf',
            'excel',
            {
                text:'Add item',
                className: 'btn btn-primary',
                action: function(e, dt, node, config){
                    $("#iform").trigger("reset");
                    $('#itemModal').modal('show');
                }
            }
        ],
        columns:[
            {data: 'item_id'},
            {data: 'title'},
            {data: 'imagePath'},
            {data: 'description'},
            {data: 'sell_price'},
            {data: 'cost_price'},
            {data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='editBtn' id='editbtn' data-id=" + data.item_id + "><i class='fa-regular fa-pen-to-square' aria-hidden='true' style='font-size:24px' ></i></a>  <a href='#' class='deletebtn' data-id=" + data.item_id + "><i class='fa-regular fa-solid fa-trash' style='font-size:24px; color:red'></a></i>";
                },
            },
        ]
        
    })//end datatables
    
    $("#itemSubmit").on("click", function (e) {
        e.preventDefault();
        var data = $("#iform")[0];
        console.log(data);

        let formData = new FormData(data);

        console.log(formData);
        for (var pair of formData.entries()){
            console.log(pair[0] + ',' + pair[1]);
        }

        $.ajax({
            type: "POST",
            url: "/api/item",
            data:formData,
            contentType: false,
            processData: false,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            dataType:"json", 

            success:function(data){
                   console.log(data);
                   $("#itemModal").modal("hide");

                   var $itable = $('#itable').DataTable();
                   $itable.row.add(data.item).draw(false); 
            },

            error:function (error){
                console.log(error);
            }
        })
    });

    $('#itable tbody').on('click', 'a.editBtn', function(e){
        e.preventDefault();
        // var id = $('#itemId').val();
        var id = $(this).data('id');
        $('#itemModal').modal('show');

        $.ajax({
            type: "GET",
            url: '/api/item/' + id +  '/edit', 
            // url: '/api/item/${id}',
            headers: {'X-CSRF-TOKEN': $('meta [name="csrf-token"]').attr('content') },
            dataType: "json",
            success:function(data){
                console.log(data);
                $('#itemId').val(data.item_id);
                $('#description').val(data.description);
                $('#title').val(data.title);
                $('#sell_price').val(data.sell_price);
                $('#cost_price').val(data.cost_price);
            },

            error: function (error){
                console.log(error);
            }
        })
    });

    $('#itemUpdate').on('click', function(e){

        e.preventDefault();
        var id = $('#itemId').val()
        console.log(id);
        var table = $('#itable').DataTable();
        var cRow = $("tr td:eq("+ id +")").closest('tr');
        var data = $('#iform').serialize();

        $.ajax({
            type: "PUT",
            url: '/api/item/${id}',
            data: data,
            headers: {'X-CSRF-TOKEN': $('meta [name="csrf-token"]').attr('content') },
            dataType: "json",

            success: function(data){
                console.log(data);
                $('#itemModal').modal("hide");

                table.row(cRow).data(data).invalidate().draw(false);
            },
            error: function(error){
                console.log(error);
            }
        })
    });


    $('#editItemModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).attr('data-id');
        // console.log(id);
        $('<input>')
        .attr({
            type: 'hidden', 
            id:'itemid',
            name: 'item_id',
            value: id
        })
        .appendTo('#updateformItem');
        
        $.ajax({
            type: "GET",
            url: "api/item/" + id + "/edit",
            success: function(data){
                //    console.log(data);
                   $("#eedescription").val(data.description);
                   $("#eecost_price").val(data.cost_price);
                   $("#eesell_price").val(data.sell_price);
                   $("#eetitle").val(data.title);
                   $("#eeimagePath").val(data.imagePath);

                },
                error: function(){
                    console.log('AJAX load did not work');
                    alert("error");
                }
            });
        });

        $('#editItemModal').on('hidden.bs.modal', function (e) {
            $("#updateformItem").trigger("reset");
            $("#itemid").remove();

    });
        
        $("#updatebtnItem").on('click', function(e) {
            var id = $('#itemid').val();
            var data = $("#updateformItem").serialize();
            console.log(data);
            $.ajax({
                type: "PUT",
                url: "api/item/"+ id,
                data: data,
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(data) {
                    console.log(data);

                    $("#editItemModal").css('backgroundColor','hsl(143, 100%, 50%)').each(function () {
                        $(this).modal("hide");
                        window.location.reload();
                    });
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });


    $("#ibody").on("click", ".deletebtn", function (e) {
        var id = $(this).data("id");
        var $tr = $(this).closest("tr");
        // var id = $(e.relatedTarget).attr('id');
        console.log(id);
        e.preventDefault();
        bootbox.confirm({
            message: "Do you want to delete this item",
            buttons: {
                confirm: {
                    label: "Yes",
                    className: "btn-success",
                },
                cancel: {
                    label: "No",
                    className: "btn-danger",
                },
            },
            callback: function (result) {
                if (result)
                    $.ajax({
                        type: "DELETE",
                        url: "/api/item/" + id,
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            
                            $tr.find("td").css('backgroundColor','hsl(0,100%,50%').fadeOut(2000, function () {
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

});