import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColDef, GridApi, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
ModuleRegistry.registerModules([AllEnterpriseModule]);
@Component({
  selector: 'app-PdfExportComponent',
  templateUrl: './PdfExportComponent.component.html',
  styleUrls: ['./PdfExportComponent.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, AgGridAngular, AgGridModule],
  providers: [DatePipe],
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
    },
  ];
  selectedRowData: any;
  columnDefs: ColDef[] = [
    {
      field: 'ruleName',
      headerName: 'Rule Name',
      sortable: true,
      filter: true,
      editable: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'subType',
      headerName: 'Subtype',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'impacted',
      headerName: 'Impacted',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'alert',
      headerName: 'Alert',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'lastScheduledDate',
      headerName: 'LastScheduledDate',
      sortable: true,
      filter: true,
      editable: true,
    },
    {
      field: 'scheduled',
      headerName: 'Scheduled',
      sortable: true,
      filter: true,
      editable: true,
    },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  gridApi: any;
  formData: FormGroup;
  checktrue: boolean = true;
  datacheck: boolean = false;
  constructor(private fb: FormBuilder, private datePipe: DatePipe,private toastr: ToastrService) {
    this.formData = this.fb.group({
      ruleName: [''],
      type: [''],
      alert: [''],
    });
  }
  ngOnInit(): void {
    this.formData = this.fb.group({
      id: [this.generateUniqueId()],
      ruleName: ['',Validators.required],
      type: ['',Validators.required],
      subType: ['',Validators.required],
      impacted: [0],
      alert: ['N'],
      lastScheduledDate: [''],
      scheduled: ['N'],
      active: ['Y'],
      favourite: ['N'],
      domain: [''],
    });
  }
  showSuccess() {
    this.toastr.error('Fill all required field!');
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  onSelectionChanged(event: any) {
    const selectedData = event.api.getSelectedRows();
    console.log('Selected Rows:', selectedData);
    if (selectedData.length === 0) {
      this.checktrue = true; // Reset the form with default values (you can customize these)
      this.formData.reset({
        id: this.generateUniqueId(),
        ruleName: '',
        type: '',
        subType: '',
        impacted: 0,
        alert: 'N',
        lastScheduledDate: '',
        scheduled: 'N',
        active: 'Y',
        favourite: 'N',
        domain: '',
      });
    }
  }
  toggleImpactedColumn() {
    const colDef = this.columnDefs.find((c) => c.field === 'impacted');
    if (colDef) {
      colDef.hide = !colDef.hide;
      this.gridApi.setColumnDefs(this.columnDefs);
    }
  }
  toggleColumn(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedField = selectElement.value;
    this.columnDefs = this.columnDefs.filter(
      (col) => col.field !== selectedField
    );
    this.gridApi.setColumnDefs(this.columnDefs);
  }
  saveData() {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log('Saving data:', selectedRows);
    localStorage.setItem('savedRows', JSON.stringify(selectedRows));
    alert('Data saved to localStorage!');
  }
  updateData() {
    if (this.selectedRowData) {
      const updatedRow = this.formData.value; // Make sure the updated row has the original ID
      updatedRow.id = this.selectedRowData.id; // Format the date before updating
      const formattedDate = this.datePipe.transform(
        updatedRow.lastScheduledDate,
        'dd-MMM-yyyy hh:mm a'
      );
      updatedRow.lastScheduledDate = formattedDate ?? ''; // Update the data in the grid
      this.gridApi.forEachNode((node: any) => {
        if (node.data.id === updatedRow.id) {
          node.setData(updatedRow);
        }
      });
      this.datacheck = true;
      this.toastr.success('Data updated!');
    }
  }
  onRowClicked(event: any) {
    this.checktrue = false;
    this.selectedRowData = event.data;
    const selectedRowCopy = { ...this.selectedRowData }; // Convert '01-May-2024 01:15 PM' → '2024-05-01T13:15'
    if (selectedRowCopy.lastScheduledDate) {
      const date = this.convertToDateTimeLocalFormat(
        selectedRowCopy.lastScheduledDate
      );
      selectedRowCopy.lastScheduledDate = date;
    }
    this.formData.patchValue(selectedRowCopy);
  }
  convertToDateTimeLocalFormat(dateStr: string): string {
    // Try parsing '01-May-2024 01:15 PM' format to Date
    const parsedDate = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
    if (isNaN(parsedDate.getTime())) {
      return '';
    }
    const yyyy = parsedDate.getFullYear();
    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(parsedDate.getDate()).padStart(2, '0');
    const hh = String(parsedDate.getHours()).padStart(2, '0');
    const mi = String(parsedDate.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }
  addRow() {
    if (this.datacheck) {
      this.datacheck = false;
      return;
    }
    if (this.formData.valid && this.gridApi) {
      const newRow = this.formData.value; // Format date

      const formattedDate = this.datePipe.transform(
        newRow.lastScheduledDate,
        'dd-MMM-yyyy hh:mm a'
      );
      newRow.lastScheduledDate = formattedDate ?? '';
      newRow.id = this.generateUniqueId(); // Assign unique ID      // Update local rowData array
      this.rowData = [...this.rowData, newRow]; // Add the row using the AG Grid transaction API
      this.gridApi.applyTransaction({ add: [newRow] }); // Reset form with default values
      this.formData.reset({
        id: this.generateUniqueId(),
        ruleName: '',
        type: '',
        subType: '',
        impacted: 0,
        alert: 'N',
        lastScheduledDate: '',
        scheduled: 'N',
        active: 'Y',
        favourite: 'N',
        domain: '',
      });
      this.toastr.success('Row added to grid!');
    }else{
      this.showSuccess();

    }
  }
  generateUniqueId(): number {
    const ids = this.rowData.map((item) => item.id);
    return Math.max(...ids) + 1;
  }
}
