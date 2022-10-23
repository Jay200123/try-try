@include('layouts.base')
<br>
<div id="customers" class="container">
     <button type="button" class="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#customModal"  >
        add<span  class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>

  <div  class="table-responsive">
    <table id="ctable" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Title</th>
          <th>User ID</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Address</th>
          <th>Town</th>
          <th>Zip Code</th>
          <th>Phone</th>
          <th>Credit Limit</th>
          <th>Level</th>
          <th>Image</th>
          <th>Action</th>
          </tr>
      </thead>
      <tbody id="cbody">
      </tbody>
    </table>
  </div>
</div>


<div class="modal fade" id="customModal" role="dialog" style="display:none">
  <div class="modal-dialog modal-lg" >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add New Customer</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <form id="cform" method="#" action="#" enctype="multipart/form-data">

             <div class="form-group">
                  <label for="title" class="control-label">Title</label>
                  <input type="text" class="form-control" id="title" name="title"  >
             </div>

             <div class="form-group">
                  <label for="user_id" class="control-label">User ID</label>
                  <input type="text" class="form-control" id="user_id" name="user_id"  >
             </div>

             <div class="form-group"> 
                <label for="lname" class="control-label">Last Name</label>
                <input type="text" class="form-control " id="lname" name="lname">
              </div>

              <div class="form-group"> 
                <label for="fname" class="control-label">First Name</label>
                <input type="text" class="form-control " id="fname" name="fname" >
              </div>

               <div class="form-group"> 
                <label for="addressline" class="control-label">Address</label>
                <input type="text" class="form-control " id="addressline" name="addressline" >
              </div>

               <div class="form-group"> 
                <label for="town" class="control-label">Town</label>
                <input type="text" class="form-control " id="town" name="town" >
              </div>

               <div class="form-group"> 
                <label for="zipcode" class="control-label">Zip Code</label>
                <input type="text" class="form-control " id="zipcode" name="zipcode" >
              </div>

               <div class="form-group"> 
                <label for="phone" class="control-label">Phone</label>
                <input type="text" class="form-control " id="phone" name="phone" >
              </div>

               <div class="form-group"> 
                <label for="creditlimit" class="control-label">Credit Limit</label>
                <input type="text" class="form-control " id="creditlimit" name="creditlimit" >
              </div>

               <div class="form-group"> 
                <label for="level" class="control-label">Level</label>
                <input type="text" class="form-control " id="level" name="level" >
              </div>

              <div class="form-group"> 
                <label for="customerImage" class="control-label">Image</label>
                <input type="file" class="form-control" id="uploads" name="uploads" />
               </div>
            </form>
          </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button id="myFormSubmit" type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
  </div>
</div>

