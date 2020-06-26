import { CrossedAreaService } from './crossed-area.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, private crossedAreaService: CrossedAreaService) {
    this.crossedAreaForm = this.createForm();

  }

  title = 'crossedAreaData';
  crossedAreaForm: FormGroup;
  data: any;
  testData: any;
  public columnDefs: ColDef[];
  public gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.data,
    enableColResize: true,
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    }
  };

  ngOnInit(): void {

  }

  getData(crossedAreaModel: CrossedAreaModel) {
    const urlPath: string = 'http://localhost:5000/api/v1/reports/era/crossedareas?'
      + 'SerialNumber=' + crossedAreaModel.serialNumber
      + '&StartDate=' + crossedAreaModel.startDate
      + '&EndDate=' + crossedAreaModel.endDate
      + '&ReturnDataFields=' + crossedAreaModel.returnDataFields;

    this.crossedAreaService.getData(urlPath)
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
  }

  onSubmit() {
    const form: CrossedAreaModel = Object.assign({}, this.crossedAreaForm.value);
    console.log(form);

    if (this.crossedAreaForm.valid) {
      this.setColumns(form);
      this.getData(form);

    }

  }

  setColumns(form) {
    let columns: any = form.returnDataFields.split(",");
    let timeCol: ColDef;
    timeCol.headerName = "Time";
    timeCol.field = "time";
    this.columnDefs.push(timeCol);
    columns.forEach(element => {
      let column: ColDef;
      column.headerName = element;
      element = element.charAt(0).toLowerCase() + element.slice(1);
      column.field = element;
      this.columnDefs.push(column);
    });
  }
  createForm() {
    return this.formBuilder.group({
      serialNumber: ['', []],
      startDate: ['', []],
      endDate: ['', []],
      returnDataFields: ['', []]
    });
  }


}

export class CrossedAreaModel {
  serialNumber: string;
  startDate: Date;
  endDate: Date;
  returnDataFields: string;
}
