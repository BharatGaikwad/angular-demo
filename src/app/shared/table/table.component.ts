import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  basePath = 'E:/test/test/Backend-master/uploads/';
  @Input() columns: Array<any> = [];
  @Output() addEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Input() rows: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  echo(row, column): string {
    return row[column.key];
  }
  addUser() {
    this.addEvent.emit(true);
  }
  edit(row: any) {
    this.editEvent.emit(row);
  }
  delete(row: any) {
    console.log("Deleted");
    this.deleteEvent.emit(row);
  }
}
