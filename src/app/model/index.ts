export interface ApiModelMusicFestival {
  name?: string;
  bands?: ApiModelBand[];
}

export interface ApiModelBand {
  name?: string;
  recordLabel?: string;
}

export interface ViewModelMusicFestival {
  recordLabel: string;
  bands: ViewModelBand[];
}

export interface ViewModelBand {
  bandName: string;
  musicFestivals: string[];
}
