import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fa-icon',
  templateUrl: './faIcon.component.html',
  styleUrls: ['./css/font-awesome.min.css','./css/iconsTypes.css'],
  standalone: true
})

export class FaIconComponent {
  @Input() icon!: string;
  @Input() type!: string;
  @Input() size!: string;
  @Input() className!: string;
  types=['error','success','warning','info','default'];

  constructor() {}
  onClick() {
    console.log('click');
  }
  onKeyPress() {
    console.log('key press');
  }

  get iconClass() {
    return `fa ${this.icon} size-${this.size} ${this.type} ${this.className}`;
  }

}



