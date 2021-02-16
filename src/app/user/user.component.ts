import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  signUp: FormGroup;
  showList: boolean;
  editable: boolean;
  columns: Array<any>;
  userData: Array<any>;
  imageSrc: string;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initValues();
    this.initMethods();
  }

  initValues() {
    this.showList = true;
    this.userData = [];
    this.columns = [{ title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Email', key: 'email' },
    { title: 'Contact', key: 'mobile' },
    ];
    this.signUp = this.formBuilder.group({
      _id:[null],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email, Validators.required]],
      mobile: [''],
      file: [''],
      fileSource: ['']
    });
  }

  initMethods() {
    this.getUserList();
  }

  AddUser(event) {
    this.imageSrc = '';
    this.signUp.reset();
    this.showList = !event;
  }

  backToList() {
    this.showList = true;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let name = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.signUp.patchValue({
          fileSource: reader.result,
          file: name
        });
      };
    }
  }

  save(formData: any) {
    if(formData.value && formData.value._id) {
      let data = formData.value;
      data.id = formData.value.id;
      this.http.put('http://localhost:3001/api/users/update', data).subscribe((response: Response) => {
        if (response && response['success']) {
          this.showList = true;
          this.signUp.reset();
          this.getUserList();
        } else {
            alert(response['msg']);
        }
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = formData.value;
      const headers= new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*');
      this.http.post('http://localhost:3001/api/users/signup', data, { 'headers': headers }).subscribe((response: Response) => {
        if (response && response['success']) {
          this.showList = true;
          this.signUp.reset();
          this.getUserList();
        } else {
          alert(response['msg']);
        }
      }, (error) => {
        console.error(error);
      });
    }
  }

  cancel() {
    this.signUp.reset();
    this.showList = true;
  }

  getUserList() {
    this.userData = [];
    this.http.get('http://localhost:3001/api/users/list').subscribe((response) => {
      if (response && response['success']) {
        this.userData = response['data'];
      } else {
        alert(response['msg']);
      }
    }, (error) => {
      console.error(error);
    });
  }

  edit(event) {
    this.showList = !this.showList;
    this.imageSrc = event.fileSource as string;
    this.signUp.patchValue(event);
  }

  delete(event) {
    if (event && event._id) {
      this.http.delete('http://localhost:3001/api/users/delete/' + event._id).subscribe((response) => {
      if (response  && response['success']) {
        this.getUserList();
      } else {
        alert(response['msg']);
      }
    }, (error) => {
      console.error(error);
    });
    } else {
      console.log("User Id Not Found.");
    }
  }
}
