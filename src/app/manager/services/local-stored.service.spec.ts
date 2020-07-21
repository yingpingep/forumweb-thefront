import { TestBed } from '@angular/core/testing';

import { LocalStoredService } from './local-stored.service';
import { DataStoaredService } from 'src/app/models';

describe('LocalStoredDataService', () => {
  let service: DataStoaredService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataStoaredService,
          useClass: LocalStoredService,
        },
      ],
    });
    service = TestBed.inject(DataStoaredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
