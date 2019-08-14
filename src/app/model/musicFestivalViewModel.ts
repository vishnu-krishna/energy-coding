import * as _ from 'lodash';
import { ApiModelMusicFestival, ViewModelMusicFestival } from '.';

export class MusicFestivalViewModel {
  private readonly responseApiData: ApiModelMusicFestival[] = [];

  constructor(response) {
    this.responseApiData = response;
  }

  public get constructMusicFestivalData(): ViewModelMusicFestival[] {
    const dataBeforeGroupingWithRecordLabel = _.sortBy(this.responseApiData.reduce((accumulator, currentIterator) => {
      accumulator.push(...currentIterator.bands.map(band => ({
        recordLabel: band.recordLabel,
        musicFestivalName: currentIterator.name,
        bandName: band.name
      })));
      return accumulator;
    }, []), 'recordLabel');

    return _(dataBeforeGroupingWithRecordLabel)
      .groupBy(x => x.recordLabel)
      .map((value, key) => ({
        recordLabel: key,
        bands: _(_.map(value, (resultantObject) => (_.omit(resultantObject, 'recordLabel'))))
          .groupBy(x => x.bandName)
          .map((bandValue, bandKey) => (
            {
              bandName: bandKey,
              musicFestivals:
                this.mapValuesForMusicFestivalNames(
                  _.uniqWith(
                    _.map(value, (finalResultantObject) =>
                      (_.omit(finalResultantObject,
                        ['recordLabel', 'bandName']))),
                    _.isEqual))
            }
          ))
          .value()
      }))
      .value();
  }

  public mapValuesForMusicFestivalNames(musicFestivals) {
    return Object.values(_.mapValues(musicFestivals, 'musicFestivalName'));
  }

// Second way of constructing data. NOT USING THIS.
  private secondWayForConstructingData() {
    const convertObjectToArray = (obj) => {
      const newArray = [];
      for (const key in obj) {
        newArray.push({ name: key, artists: obj[key] });
      }
      return newArray.sort(sort);
    };

    const sort = (a, b) => {
      const nameA = a.hasOwnProperty('name') ? a.name.toUpperCase() : a;
      const nameB = b.hasOwnProperty('name') ? b.name.toUpperCase() : b;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    };

    const mapData = unMappedData => {
      const newList = {};
      unMappedData.forEach(item => {
        const { name: eventName, bands } = item;

        bands.forEach(band => {
          const { name: artistName = '', recordLabel } = band;
          /**
           * if it has a record label and that label is already in the list
           */
          if (recordLabel && newList.hasOwnProperty(recordLabel)) {
            /**
             * searching for band
             */
            const currentArtist = newList[recordLabel].find(artist => artist.name === artistName);
            /**
             * if artist exists, then we add the event
             */
            if (currentArtist) {
              newList[recordLabel] = [
                ...newList[recordLabel].filter(artist => artist.name !== artistName),
                { ...currentArtist, events: eventName ? [...currentArtist.events, eventName] : currentArtist.events }].sort(sort);
            } else {
              newList[recordLabel] = [...newList[recordLabel], { name: artistName, events: eventName ? [eventName] : [] }].sort(sort);
            }
          } else {
            /**
             * if the record label isnt in the list and its not null
             */
            if (recordLabel) {
              newList[recordLabel] = [{ name: artistName, events: eventName ? [eventName] : [] }];
            } else {
              newList['no label'] = newList['no label'] ? [...newList['no label'],
                { name: artistName, events: [eventName] }] : [{ name: artistName, events: [eventName] }];
            }
          }
        });
      });

      return newList;
    };

    const mappedData = mapData('DATA TO BE INSERTED HERE');
    const USE_THIS = convertObjectToArray(mappedData);

  }
}
