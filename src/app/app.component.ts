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
    this.crossedAreaService.getDataTest("").subscribe((data: any) => {
      console.log(data);
      this.data = data
      this.setColumns(data);
    })
  }

  getData(crossedAreaModel: CrossedAreaModel) {
    const urlPath: string = 'http://localhost:5000/api/v1/reports/era/crossedareas?'
      + 'SerialNumber=' + crossedAreaModel.serialNumber
      + '&StartDate=' + crossedAreaModel.startDate
      + '&EndDate=' + crossedAreaModel.endDate
      + '&ReturnDataFields=' + crossedAreaModel.returnDataFields;

    this.crossedAreaService.getDataTest(urlPath)
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

  setColumns(f) {
    let form: string = "name,username,email";
    let columns: any = form.split(",");
    let columnDefs = [];
    columns.forEach(element => {
      element = element.charAt(0).toLowerCase() + element.slice(1);
      console.log(element);
      let definition: ColDef = { headerName: element, field: element, width: 120 };
      columnDefs.push(definition);
    });
    this.gridOptions.api.setColumnDefs(columnDefs);
  }

  // setColumns(columns: string[]) {
  //   this.columnDefs = [];
  //   columns.forEach((column: string) => {
  //     let definition: ColDef = { headerName: column, field: column, width: 120 };

  //     this.columnDefs.push(definition);
  //   });
  // }
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
