import * as fs from 'fs';
import * as path from 'path';

import * as os from 'os';
import { unzip, parseRootFile, parseConentOpf } from './epub-parse';

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

  async parse() {
    console.log('解析电子书111', this._filePath, this._file);
    // 1、生成临时文件
    const homedir = os.homedir();
    console.log('homedir', homedir);

    const tmpDir = path.join(homedir, TEMP_PATH);

    const tmpFile = path.resolve(tmpDir, this._fileName);

    console.log('tmpFile', tmpFile);
    const sourceFile = path.join(this._filePath, this._fileName);

    console.log('sourceFile', sourceFile);

    // 2. 复制文件
    fs.copyFileSync(sourceFile, tmpFile);

    // 3. 创建临时解压目录
    const tmpUnzipDirName = this._fileName.replace('.epub', '');
    const tmpUnzipDir = path.resolve(tmpDir, tmpUnzipDirName);

    console.log('tmpUnzipDir', tmpUnzipDir);

    // 检查目录是否存在
    if (fs.existsSync(tmpUnzipDir)) {
      // 删除目录及其内容
      fs.rmSync(tmpUnzipDir, { recursive: true, force: true });
    }

    // 创建目录
    fs.mkdirSync(tmpUnzipDir);

    // 4. 解压文件
    unzip(sourceFile, tmpUnzipDir);

    const rootFile = await parseRootFile(tmpUnzipDir);

    console.log('rootFile', rootFile);

    await parseConentOpf(tmpUnzipDir, rootFile);

    // n. 删除临时文件
    // fs.unlinkSync(tmpFile);
    // fs.rmdirSync(tmpUnzipDir);
  }
}

export default Epubbook;
