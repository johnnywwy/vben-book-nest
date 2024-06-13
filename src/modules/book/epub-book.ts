import * as fs from 'fs';
import * as path from 'path';

class Epubbook {
  private _filePath: string;
  private _file: any;
  constructor(filePath: string, file: any) {
    this._file = file;
    this._filePath = filePath;
  }

  parse() {
    console.log('解析电子书', this._filePath, this._file);
  }
}

export default Epubbook;
