import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { FaIconComponent } from '../faIcons/FaIcon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.css'],
  imports: [CardComponent, FaIconComponent,NgIf],
  standalone: true
})
export default class ModalComponent {
  @Input() title!: string;
  @Input() open!: boolean;
  @Output() closeModal = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
    console.log('init', this.open);
  }
  onCloseModal() {
    console.log('close modal');
    this.closeModal.emit();
  }
}