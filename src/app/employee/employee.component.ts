import { Component, OnInit } from '@angular/core';
import { EmployeeService } from  '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  name: any;
  age: number;
  status: string;
  id: any;
  address: any;
  error_message: any;
  employeeList: any;
  show_error: boolean = false;
  responseMessage: any;
  show_list: boolean = false;
  navPage: any;
  searchRequest: any;
  searchFirstName: any = null;
  searchLastName: any = null;
  searchAge: any = null;
  searchCity: any = null;
  searchState: any = null;
  searchPincode: any = null;
  filterFirstName: any = null;
  filterLastName: any = null;
  filterAge: any = null;
  filterCity: any = null;
  filterState: any = null;
  filterPincode: any = null;
  isFirst: boolean = false;
  isLast: boolean = false;
  index: number = 0;
  limit: number = 2;

  constructor(private employeeService: EmployeeService) {
    this.responseMessage = '';
    this.name = {};
    this.address = {};
    this.employeeList = [];
    this.navPage = {};
    this.searchRequest = {};
  }

  getEmployee(id) {
    this.employeeService.getEmployee(id).subscribe(data => {
        var res = data.human;
        this.name = {};
        this.id = null;
        this.age = null;
        this.address = {}
        this.responseMessage = data.message;
        if (data.employee && data.code == 200) {
          this.show_error = false;
          this.name = res.name;
          this.id = res._id;
          this.age = res.age;
          this.address = res.address;
          this.navChange('edit');
        } else {
          this.show_error = true;
        }
      },
      err => {
        console.log('ERR', err);
      });
  }

  listEmployee(filterArray) {
    this.employeeList = [];
    filterArray.index = this.index;
    filterArray.limit = this.limit;
    this.employeeService.listEmployee(filterArray).subscribe(data => {
      console.log("data"+JSON.stringify(data));
        if (data.listEmployee && data.listEmployee.length && data.code == 200) {
          this.employeeList = data.listEmployee;
          this.show_list = true;
          this.responseMessage = data.message;
          this.show_error = false;
          if (data.totalCount <= this.index + this.limit) {
            this.isLast = true;
          } else {
            this.isLast = false;
          }
          if (this.index <= 0) {
            this.isFirst = true
          } else {
            this.isFirst = false
          }
          console.log("data.totalCount", data.totalCount);
        } else {
          this.responseMessage = 'DATE NOT FOUND';
          this.show_error = true;
        }
      },
      err => {
        console.log('error111', err);
      });
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
        this.responseMessage = data.message;
        if (data.code == 200) {
          this.listEmployee({});
          this.show_error = false;
        } else {
          this.show_error = true;
        }
      },
      err => {
        console.log("ERR", err);
      });
  }

  addEmployee() {
    var dataObj = {
      name: {
        firstName: this.name.firstName,
        lastName: this.name.lastName
      },
      age: this.age,
      address: {
        city: this.address.city,
        state: this.address.state,
        pincode: this.address.pincode
      }
    }
    this.employeeService.addEmployee(dataObj).subscribe(data => {
      this.responseMessage = data.message;
      if (data.code == 200) {
        this.show_error = false;
        this.status = data.message;
        this.listEmployee({});
      } else {
        this.show_error = false;
      }
    }, err => {
      this.show_error = true;
    });
  }

  editEmployee() {
    var request = {
      data: {
        name: {
          firstName: this.name.firstName,
          lastName: this.name.lastName
        },
        age: this.age,
        address: {
          city: this.address.city,
          state: this.address.state,
          pincode: this.address.pincode
        }
      },
      id: this.id

    }
    this.employeeService.editEmployee(request).subscribe(data => {
      this.responseMessage = data.message;
      if (data.code == 200) {
        this.show_error = false;
        this.listEmployee({});
      } else {
        this.show_error = false;
      }
    }, err => {
      this.show_error = true;
    });
  }

  navChange(pageName) {
    this.navPage = {
      list: false,
      add: false,
      edit: false
    }
    this.navPage[pageName] = true;
    if (pageName == 'add') {
      this.name = {};
      this.id = null;
      this.age = null;
      this.address = {}
    }
  }

  searchList(index = 0) {
    setTimeout(()=>{
      var filters = [];
      var search = [];
      console.log("this.filterFirstName", this.filterFirstName);
      if (this.filterFirstName) {
        filters.push({
          "type": "FIXED",
          "key": "name.firstName",
          "value": [
            {
              "type": "IN",
              "value": this.filterFirstName
            }
          ]
        });
      }

      if (this.filterLastName) {
        filters.push({
          "type": "FIXED",
          "key": "name.lastName",
          "value": [
            {
              "type": "IN",
              "value": this.filterLastName
            }
          ]
        });
      }

      if (this.filterAge) {
        filters.push({
          "type": "FIXED",
          "key": "age",
          "value": [
            {
              "type": "IN",
              "value": this.filterAge
            }
          ]
        });
      }

      if (this.filterCity) {
        filters.push({
          "type": "FIXED",
          "key": "address.city",
          "value": [
            {
              "type": "IN",
              "value": this.filterCity
            }
          ]
        });
      }

      if (this.filterState) {
        filters.push({
          "type": "FIXED",
          "key": "address.state",
          "value": [
            {
              "type": "IN",
              "value": this.filterState
            }
          ]
        });
      }

      if (this.filterPincode) {
        filters.push({
          "type": "FIXED",
          "key": "address.pincode",
          "value": [
            {
              "type": "IN",
              "value": this.filterPincode
            }
          ]
        });
      }

      if (this.searchFirstName) {
        search.push({
          key: 'name.firstName',
          value: this.searchFirstName
        });
      }

      if (this.searchLastName) {
        search.push({
          key: 'name.lastName',
          value: this.searchLastName
        });
      }

      if (this.searchAge) {
        search.push({
          key: 'age',
          value: this.searchAge
        });
      }

      if (this.searchCity) {
        search.push({
          key: 'address.city',
          value: this.searchCity
        });
      }

      if (this.searchState) {
        search.push({
          key: 'address.state',
          value: this.searchState
        });
      }

      if (this.searchPincode) {
        search.push({
          key: 'address.pincode',
          value: this.searchPincode
        });
      }
      this.index = index;
      this.searchRequest.filters = filters;
      this.searchRequest.search = search;
      this.listEmployee(this.searchRequest)
    },500);


  }

  changePagination(value) {
    if (value == 'previous') {
      this.index -= this.limit;
    } else {
      this.index += this.limit;
    }
    this.searchList(this.index)
  }


  ngOnInit() {
    this.listEmployee({});
    this.navPage.list = true;
  }


}
