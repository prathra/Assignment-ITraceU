import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColDef, GridApi, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllEnterpriseModule]);

@Component({
  selector: 'app-PdfExportComponent',
  templateUrl: './PdfExportComponent.component.html',
  styleUrls: ['./PdfExportComponent.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, AgGridAngular, AgGridModule]
})
export class PdfExportComponentComponent implements OnInit {
  rowData = [
    {
      id: 997,
      ruleName: '2DS - Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 996,
      ruleName: 'Trace Changes',
      active: 'Y',
      type: 'Match',
      subType: '2DS - Trace Changes',
      domain: '',
      impacted: 0,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
    {
      id: 986,
      ruleName: 'File Monitor',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 57994,
      favourite: 'N',
      scheduled: 'Y',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
    {
      id: 985,
      ruleName: 'testreve1',
      active: 'Y',
      type: 'Match',
      subType: '1DS - File Monitor',
      domain: '',
      impacted: 13773,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '01-May-2024 01:15 PM',
      alert: 'N',
    },
    {
      id: 984,
      ruleName: 'Data Integrity',
      active: 'N',
      type: 'Validation',
      subType: 'Integrity Check',
      domain: 'Finance',
      impacted: 1024,
      favourite: 'Y',
      scheduled: 'Y',
      lastScheduledDate: '02-May-2024 09:30 AM',
      alert: 'N',
    },
    {
      id: 983,
      ruleName: 'Duplicate Checker',
      active: 'Y',
      type: 'Validation',
      subType: 'Duplication',
      domain: 'Customer',
      impacted: 235,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '02-May-2024 10:00 AM',
      alert: 'Y',
    },
    {
      id: 982,
      ruleName: 'Currency Format Validator',
      active: 'Y',
      type: 'Validation',
      subType: 'Currency Check',
      domain: 'International',
      impacted: 12,
      favourite: 'Y',
      scheduled: 'Y',
      lastScheduledDate: '03-May-2024 08:00 AM',
      alert: 'N',
    },
    {
      id: 981,
      ruleName: 'Null Value Cleanup',
      active: 'N',
      type: 'Cleanup',
      subType: 'Null Removal',
      domain: 'Data Warehouse',
      impacted: 542,
      favourite: 'N',
      scheduled: 'N',
      lastScheduledDate: '04-May-2024 07:45 AM',
      alert: 'Y',
    },
    {
      id: 980,
      ruleName: 'Threshold Breach Alert',
      active: 'Y',
      type: 'Monitoring',
      subType: 'Threshold',
      domain: 'Operations',
      impacted: 78,
      favourite: 'Y',
      scheduled: 'Y',
      lastScheduledDate: '05-May-2024 11:00 AM',
      alert: 'Y',
    }
  ];


  columnDefs: ColDef[] = [
    { field: 'ruleName', headerName: 'Rule Name', sortable: true, filter: true, editable: true, headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'active', headerName: 'Active', sortable: true, filter: true, editable: true },
    { field: 'type', headerName: 'Type', sortable: true, filter: true, editable: true },
    { field: 'subType', headerName: 'Subtype', sortable: true, filter: true, editable: true },
    { field: 'impacted', headerName: 'Impacted', sortable: true, filter: true, editable: true },
    { field: 'alert', headerName: 'Alert', sortable: true, filter: true, editable: true },
    { field: 'lastScheduledDate', headerName: 'LastScheduledDate', sortable: true, filter: true, editable: true },
    { field: 'scheduled', headerName: 'Scheduled', sortable: true, filter: true, editable: true }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  gridApi:any;
  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      ruleName: [''],
      type: [''],
      alert: ['']
    });
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChanged(event: any) {
    const selectedData = event.api.getSelectedRows();
    console.log('Selected Rows:', selectedData);
  }

  toggleImpactedColumn() {
    const colDef = this.columnDefs.find(c => c.field === 'impacted');
    if (colDef) {
      colDef.hide = !colDef.hide;
      this.gridApi.setColumnDefs(this.columnDefs);
    }
  }

  toggleColumn(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedField = selectElement.value;
    this.columnDefs = this.columnDefs.filter(col => col.field !== selectedField);
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  saveData() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Saving data:', selectedRows);
    localStorage.setItem('savedRows', JSON.stringify(selectedRows));
    alert('Data saved to localStorage!');
  }

  updateData() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    selectedNodes.forEach((node: any) => {
      const data = node.data;
      // Example update: add a sample logic, like updating a field
      data.alert = data.alert === 'Y' ? 'N' : 'Y'; // Toggle alert
      node.setData(data);
    });

    const allData: any[] = [];
    this.gridApi.forEachNode((node: any) => {
      allData.push(node.data);
    });

    console.log('All updated Data:', allData);
    alert('Selected rows updated!');
  }
}
