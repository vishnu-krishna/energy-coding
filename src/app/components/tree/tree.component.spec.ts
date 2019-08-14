import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { of, throwError } from 'rxjs';
import { TreeComponent } from './tree.component';
import { IMusicFestivalService, MusicFestivalService } from '../../services/musicFestivalService';
import { HttpClientModule } from '@angular/common/http';

const mockData = [
  {
    name: 'LOL-palooza',
    bands: [
      {
        name: 'Winter Primates',
        recordLabel: 'MEDIOCRE Music'
      },
      {
        name: 'Jill Black',
        recordLabel: 'Fourth Woman Records'
      },
      {
        name: 'Frank Jupiter',
        recordLabel: 'Pacific Records'
      },
      {
        name: 'Werewolf Weekday',
        recordLabel: 'XS Recordings'
      }
    ]
  },
  {
    name: 'Small Night In',
    bands: [
      {
        name: 'Winter Primates',
        recordLabel: 'MEDIOCRE Music'
      },
      {
        name: 'Winter Primates1',
        recordLabel: 'MEDIOCRE Music1'
      },
      {
        name: 'Jill Black1',
        recordLabel: 'Fourth Woman Records1'
      },
      {
        name: 'Frank Jupiter1',
        recordLabel: 'Pacific Records1'
      },
      {
        name: 'Werewolf Weekday1',
        recordLabel: 'XS Recordings1'
      }
    ]
  }
];

const mockViewModelData = [
  {
    'recordLabel': 'Fourth Woman Records',
    'bands': [{ 'bandName': 'Jill Black', 'musicFestivals': ['LOL-palooza'] }]
  },
  {
    'recordLabel': 'Fourth Woman Records1',
    'bands': [{ 'bandName': 'Jill Black1', 'musicFestivals': ['Small Night In'] }]
  },
  {
    'recordLabel': 'MEDIOCRE Music',
    'bands': [{ 'bandName': 'Winter Primates', 'musicFestivals': ['LOL-palooza', 'Small Night In'] }]
  },
  {
    'recordLabel': 'MEDIOCRE Music1',
    'bands': [{ 'bandName': 'Winter Primates1', 'musicFestivals': ['Small Night In'] }]
  },
  {
    'recordLabel': 'Pacific Records',
    'bands': [{ 'bandName': 'Frank Jupiter', 'musicFestivals': ['LOL-palooza'] }]
  },
  {
    'recordLabel': 'Pacific Records1',
    'bands': [{ 'bandName': 'Frank Jupiter1', 'musicFestivals': ['Small Night In'] }]
  },
  {
    'recordLabel': 'XS Recordings',
    'bands': [{ 'bandName': 'Werewolf Weekday', 'musicFestivals': ['LOL-palooza'] }]
  },
  {
    'recordLabel': 'XS Recordings1',
    'bands': [{ 'bandName': 'Werewolf Weekday1', 'musicFestivals': ['Small Night In'] }]
  }];

describe('Tree Component', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let musicFestivalServiceMock: IMusicFestivalService;
  let de: DebugElement;
  let apiSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TreeComponent],
      providers: [
        { provide: IMusicFestivalService, useClass: MusicFestivalService }
      ]
    });
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    musicFestivalServiceMock = TestBed.get(IMusicFestivalService);
  });

  it('should call the music festival api', () => {
    // Purposely not placing this in beforeEach as i have to spy again in another test case.
    apiSpy = spyOn(musicFestivalServiceMock, 'fetchMusicFestivalReport')
      .and
      .returnValue(of(mockData));
    fixture.detectChanges();
    expect(apiSpy).toHaveBeenCalled();
    expect(component.error).toBe(false);
  });

  it('should set the component properties when api fetch is success', () => {
    apiSpy = spyOn(musicFestivalServiceMock, 'fetchMusicFestivalReport')
      .and
      .returnValue(of(mockData));
    fixture.detectChanges();
    expect(apiSpy).toHaveBeenCalled();
    expect(component.musicFestivalResults).toEqual(mockViewModelData);
  });

  it('should set error property to true when the api fails to fetch data', () => {
    spyOn(musicFestivalServiceMock, 'fetchMusicFestivalReport').and.returnValue(throwError('error'));
    fixture.detectChanges();
    expect(component.error).toBe(true);
    expect(fixture.nativeElement.querySelector('.tree__error')).not.toBeNull();
  });
});
