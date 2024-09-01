// angular import
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup ,ReactiveFormsModule} from '@angular/forms';
import { CustomInputComponent } from '../../../components/inputs/textInput';
import { AuthService } from '../../../transactions/Bas';
import ModalComponent from '../../../components/modals/modal';
import { JWTStorage } from '../../../services/JWTStorage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CustomInputComponent,ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  form: FormGroup;
  open:boolean = false;
  @Input() cssStatus = '';
  @Input() errorDescription = 'Invalid email or password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  async onSubmit() {
    this.cssStatus = 'fadeOut';
    const service = new AuthService();
    const { email, password } = this.form.value;
    const jwtService = new JWTStorage();
    try {
      const response = await service.login(email, password);
      
      jwtService.setToken(response.token);
      
      return response;
    }
    catch (error) {
      this.open = true;
      console.log(error);
      return error;
    }
  }

  onCloseModal() {
    this.open = false;
    this.cssStatus = 'fadeIn';
  }
}