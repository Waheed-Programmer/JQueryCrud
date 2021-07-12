$('#usertable').DataTable({});

// Code for Show PopUp for insert Value
$('#btnAdd').click(function () {
    $('#txtName').val('');
    $('#txtAge').val('');
    $('#txtCountry').val('');
    $('#txtState').val('');
    $('#ModalTitle').text('Add Users');
    $('#btnUpdate').hide();
    $('#UserModal').modal('show');
});

// Code For Save Value in Database

$('#btnSave').click(function () {
    var table = $('#usertable').DataTable()
    if ($('#txtName').val() == '' ||
        $('#txtAge').val() == '' ||
        $('#txtCountry').val() == '' ||
        $('#txtState').val() == '') {
        toastr.error("All fields are required");
        //toastr.options = {
        //    "closeButton": true,
        //    "debug": false,
        //    "newestOnTop": false,
        //    "progressBar": false,
        //    "positionClass": "toast-top-right",
        //    "preventDuplicates": false,
        //    "onclick": null,
        //    "showDuration": "300",
        //    "hideDuration": "1000",
        //    "timeOut": "5000",
        //    "extendedTimeOut": "1000",
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //}
    }
    else {
        var UserObj = {
            Name: $('#txtName').val(),
            Age: $('#txtAge').val(),
            Country: $('#txtCountry').val(),
            State: $('#txtState').val(),

        }
        $.ajax({
            url: '/Home/Create',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(UserObj),
            success: function (response) {
                if (response.status) {
                    toastr.success(response.message, "Message")
                    table.row.add([$('#txtName').val(), $('#txtAge').val(), $('#txtCountry').val(), $('#txtState').val()]).draw(false);
                   
                }
            }

        });
        $('#UserModal').modal('hide')

    }

});

// Code For Delete Value in Database

$('body').on('click', '.btnDelete', function () {
    var $this = $(this);
    alert('Are you sure you want to delete this record ?');
    var table = $('#usertable').DataTable();
    $.ajax({
        url: "/Home/Delete",
        data: { ID: $($this).attr("data-id") },
        type: "Post",
        success: function (response) {
            toastr.error(response.message);
            table.row($($this).parents('tr'))
                .remove()
                .draw();
        }
    });
});

// Code For Get Id From DataTable

function GetUser(ID) {
    $.ajax({
        url: "/Home/GetUsers",
        data: { ID: ID },
        type: "Get",
        contentType: "application/json;charset=UTF-8",
        dataType: "Json",
        success: function (result) {
            $('#txtID').val(result.data.ID);
            $('#txtName').val(result.data.Name);
            $('#txtAge').val(result.data.Age);
            $('#txtCountry').val(result.data.Country);
            $('#txtState').val(result.data.State);
            $('#btnSave').hide();
            $('#btnUpdate').show();
            $('#ModalTitle').text("Update Users");
            $('#UserModal').modal('show');
        }
    })
}

// Code for Update Data 

function UpdateUser() {
    var table = $('#usertable').DataTable();
    var model = {
        ID: $('#txtID').val(),
        Name: $('#txtName').val(),
        Age: $('#txtAge').val(),
        Country: $('#txtCountry').val(),
        State: $('#txtState').val()

    }
    $.ajax({
        url: "/Home/Update",
        type: "Post",
        data: JSON.stringify(model),
        contentType: "application/json; charset=UTF-8",
        success: function (response) {
            toastr.success(response.message)
            table.row('selected').cell(':eq(0)').data($('#txtName').val()).draw();
            table.row('selected').cell(':eq(1)').data($('#txtAge').val()).draw();
            table.row('selected').cell(':eq(2)').data($('#txtCountry').val()).draw();
            table.row('selected').cell(':eq(3)').data($('#txtState').val()).draw();

            $('#UserModal').modal('toggle');

        }
    })
}