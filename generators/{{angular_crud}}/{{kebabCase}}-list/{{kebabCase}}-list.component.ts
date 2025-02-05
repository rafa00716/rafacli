import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { {{classCase}}Interface } from '../{{kebabCase}}.interface';
import { {{classCase}}Service } from '../{{kebabCase}}.service';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatedRequestInterface } from '../paginated.interface';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import moment from 'moment';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { LayoutService } from '../../layout/layout.service';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@Component({
  selector: 'app-{{kebabCase}}-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule
    
  ],
  templateUrl: './{{kebabCase}}-list.component.html',
  styleUrl: './{{kebabCase}}-list.component.scss',
})
export class {{classCase}}ListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<{{classCase}}Interface>;
  dataSource = new MatTableDataSource<{{classCase}}Interface>(undefined);
  dataLoaded: {{classCase}}Interface[] | null = null;
  readonly dialog = inject(MatDialog);
  {{camelCase}}Selected: string | undefined;
  isHandset$!: boolean;

  get displayedColumns(): any {
    return this.isHandset$
      ? this.displayedColumnsHandset
      : this.displayedColumnsDesktop;
  }

  displayedColumnsHandset: (keyof {{classCase}}Interface)[] = [
    'name',
  ];

  displayedColumnsDesktop: (keyof {{classCase}}Interface)[] = [
    'name',
  ];

  displayedColumnsDetail: (keyof {{classCase}}Interface)[] = [
    'name',
  ];

  keysToFilter: (keyof {{classCase}}Interface)[] = [
    'name',
  ];

  keysToSort: (keyof {{classCase}}Interface)[] = [
    'name',
  ];

  get columnsToDisplayWithExpand() {
    return [...this.displayedColumns, 'expand'];
  }
  expandedElement!: {{classCase}}Interface | null;

  entitySingularName = '{{camelCase}}';
  entityPluralName = '{{camelCase}}';
  searchText = '';
  searchListener = new BehaviorSubject<string>('');
  subscriptions: Subscription[] = [];

  error = null;

  loading() {
    return this.isHandset$ === undefined;
  }

  constructor(
    private {{camelCase}}Service: {{classCase}}Service,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.layoutService
      .isHandsetObserver()
      .subscribe((s) => (this.isHandset$ = s.matches));
  }

  getPaginatedReq() {
    const take = this.paginator.pageSize;
    const skip = take * this.paginator.pageIndex;
    const orderBy = this.sort.active ?? this.keysToSort[0] ?? undefined;
    const orderDirection = this.sort.direction;

    const paginatedRequest: PaginatedRequestInterface = {
      take,
      skip,
      orderBy,
      orderDirection,
    };

    if (this.searchText) {
      this.keysToFilter.forEach(
        (key) => (paginatedRequest[key] = this.searchText)
      );
    }

    return paginatedRequest;
  }

  loadData() {
    this.dataSource.data = null as any;
    this.dataLoaded = null as any;
    this.{{camelCase}}Service.getPaginated(this.getPaginatedReq()).subscribe({
      next: (resp) => {
        this.dataLoaded = resp.dataSource;
        this.dataSource.data = resp.dataSource;
        this.paginator.pageIndex = resp.pageIndex;
        this.paginator.pageSize = resp.pageSize;
        this.paginator.length = resp.length;
      },
      error: () => {
        this.dataLoaded = null;
      },
    });
  }

  keepSort = (): number => 0;

  getColumnTitle(colKey: keyof {{classCase}}Interface) {
    switch (colKey) {
      case 'name':
        return 'Name';
      case 'createdAt':
        return 'Created at';
      case 'updatedAt':
        return 'Updated at';
      default:
        return colKey;
    }
  }

  getColumnCellContent(
    colKey: keyof {{classCase}}Interface,
    row: {{classCase}}Interface
  ) {
    switch (colKey) {
      case 'name':
        return `${row['name']}`;
      case 'createdAt':
        return moment(row[colKey]).format('YYYY-MM-DD');;
      case 'updatedAt':
        return moment(row[colKey]).format('YYYY-MM-DD');;
      default:
        return row[colKey];
    }
  }

  building() {
    this.dialog.open(AlertComponent, {
      data: { title: 'Info', message: 'Building Section' },
      width: '250px',
    });
  }

  createRow() {
    this.router.navigate([`app/{{kebabCase}}/create`]);
  }

  editRow(row: {{classCase}}Interface) {
    this.{{camelCase}}Selected = row.id;
    this.router.navigate([`app/{{kebabCase}}/edit/${this.{{camelCase}}Selected}`]);
  }

  stripHtml(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText.trim();
  }

  getJsonRow(row: {{classCase}}Interface) {
    const keys = Object.keys(row) as (keyof {{classCase}}Interface)[];
    const newRow: any = {};
    keys.forEach((key) => {
      if (this.displayedColumnsDesktop.includes(key)) {
        const title = this.getColumnTitle(key);
        const content = this.getColumnCellContent(key, row) ?? '';
        newRow[title] = this.stripHtml(String(content));
      }
    });

    return newRow;
  }

  getJsonRowDetail(row: {{classCase}}Interface) {
    const keys = Object.keys(row) as (keyof {{classCase}}Interface)[];
    const newRow: any = {};
    keys.forEach((key) => {
      if (this.displayedColumnsDetail.includes(key)) {
        const title = this.getColumnTitle(key);
        newRow[title] = this.getColumnCellContent(key, row) ?? '';
      }
    });

    return newRow;
  }

  exportAsExcelFile(): void {
    const data = this.dataSource.data.map((row) => {
      const keys = Object.keys(row) as (keyof {{classCase}}Interface)[];
      const newRow: any = {};
      keys.forEach((key) => {
        if (this.displayedColumns.includes(key)) {
          const title = this.getColumnTitle(key);
          const content = this.getColumnCellContent(key, row) ?? '';
          newRow[title] = this.stripHtml(String(content));
        }
      });

      return newRow;
    });

    const fileName = `List of ${this.entityPluralName}`;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { [this.entityPluralName]: worksheet },
      SheetNames: [this.entityPluralName],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    let sub = this.paginator.page.subscribe((v) => this.loadData());
    this.subscriptions.push(sub);
    sub = this.sort.sortChange.subscribe((v) => this.loadData());
    this.subscriptions.push(sub);
    sub = this.searchListener
      .pipe(debounceTime(300))
      .subscribe((v) => this.loadData());
    this.subscriptions.push(sub);
  }
}
