import * as fs from 'fs';
import * as path from 'path';

import * as os from 'os';

const TEMP_PATH = 'Desktop\\nginx\\html\\vben\\tmp-book';

class Epubbook {
  private _filePath: string;
  private _file: any;
  private _fileName: string;
  private _bookPath: string;
  constructor(filePath: string, file: any) {
    this._file = file;
    this._filePath = filePath;
    this._fileName = file.originalname;
  }

  parse() {
    console.log('解析电子书111', this._filePath, this._file);
    // 1、生成临时文件
    const homedir = os.homedir();
    console.log('homedir', homedir);

    const tmpDir = path.join(homedir, TEMP_PATH);

    const tmpFile = path.resolve(tmpDir, this._fileName);

    console.log('tmpFile', tmpFile);
    const sourceFile = path.join(this._filePath, this._fileName);

    // 2. 复制
    // const sourceFile = path.join(this._filePath, this._file.originalname);

    // fs.copyFileSync()
    // 2、复制
    // fs.copyFileSync(this._filePath, tmpFile);
    console.log('sourceFile', sourceFile);

    // 2. 写入文件
    fs.copyFileSync(sourceFile, tmpFile);
  }
}

export default Epubbook;
