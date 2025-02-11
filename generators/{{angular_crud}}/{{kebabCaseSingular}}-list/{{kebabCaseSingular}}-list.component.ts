import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { {{classCaseSingular}}Interface } from '../{{kebabCaseSingular}}.interface';
import { {{classCaseSingular}}Service } from '../{{kebabCaseSingular}}.service';
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
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-{{kebabCaseSingular}}-list',
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
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './{{kebabCaseSingular}}-list.component.html',
  styleUrl: './{{kebabCaseSingular}}-list.component.scss',
})
export class {{classCaseSingular}}ListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<{{classCaseSingular}}Interface>;
  dataSource = new MatTableDataSource<{{classCaseSingular}}Interface>(undefined);
  dataLoaded: {{classCaseSingular}}Interface[] | null = null;
  readonly dialog = inject(MatDialog);
  {{camelCaseSingular}}Selected: string | undefined;
  isHandset$!: boolean;

  get displayedColumns(): any {
    return this.isHandset$
      ? this.displayedColumnsHandset
      : this.displayedColumnsDesktop;
  }

  displayedColumnsHandset: (keyof {{classCaseSingular}}Interface)[] = [
    'name',
  ];

  displayedColumnsDesktop: (keyof {{classCaseSingular}}Interface)[] = [
    'name',
  ];

  displayedColumnsDetail: (keyof {{classCaseSingular}}Interface)[] = [
    'name',
  ];

  keysToFilter: (keyof {{classCaseSingular}}Interface)[] = [
    'name',
  ];

  keysToSort: (keyof {{classCaseSingular}}Interface)[] = [
    'name',
  ];

  get columnsToDisplayWithExpand() {
    return [...this.displayedColumns, 'expand'];
  }
  expandedElement!: {{classCaseSingular}}Interface | null;

  entitySingularName = '{{camelCaseSingular}}';
  entityPluralName = '{{camelCasePlural}}';
  searchText = '';
  searchListener = new BehaviorSubject<string>('');
  subscriptions: Subscription[] = [];

  error = null;

  loading() {
    return this.isHandset$ === undefined;
  }

  constructor(
    private {{camelCaseSingular}}Service: {{classCaseSingular}}Service,
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
    this.{{camelCaseSingular}}Service.getPaginated(this.getPaginatedReq()).subscribe({
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

  getColumnTitle(colKey: keyof {{classCaseSingular}}Interface) {
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
    colKey: keyof {{classCaseSingular}}Interface,
    row: {{classCaseSingular}}Interface
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
    this.router.navigate([`app/{{kebabCaseSingular}}/create`]);
  }

  editRow(row: {{classCaseSingular}}Interface) {
    this.{{camelCaseSingular}}Selected = row.id;
    this.router.navigate([`app/{{kebabCaseSingular}}/edit/${this.{{camelCaseSingular}}Selected}`]);
  }

  stripHtml(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText.trim();
  }

  getJsonRow(row: {{classCaseSingular}}Interface) {
    const keys = Object.keys(row) as (keyof {{classCaseSingular}}Interface)[];
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

  getJsonRowDetail(row: {{classCaseSingular}}Interface) {
    const keys = Object.keys(row) as (keyof {{classCaseSingular}}Interface)[];
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
      const keys = Object.keys(row) as (keyof {{classCaseSingular}}Interface)[];
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
