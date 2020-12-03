import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DataStoaredService } from 'src/app/models';
import { LocalStoredService } from '../services/local-stored.service';
import { RouterTestingModule } from '@angular/router/testing';
import { managerRoutes } from '../manager.module';
import { ManagerR, MockManagerR } from 'src/app/utlis/manager-r.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(managerRoutes)],
        declarations: [DashboardComponent],
        providers: [
          {
            provide: DataStoaredService,
            useClass: LocalStoredService,
          },
          {
            provide: ManagerR,
            useClass: MockManagerR,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
