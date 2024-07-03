import * as AdmZip from 'adm-zip';
import * as XmlJS from 'xml2js';
import * as path from 'path';
import * as fs from 'fs';

export const unzip = (bookPath, unzipPath) => {
  const zip = new AdmZip(bookPath);
  zip.extractAllTo(unzipPath, true);
};

export const parseRootFile = (unzipPath) => {
  const containerFilePath = path.resolve(unzipPath, 'META-INF/container.xml');

  const containXml = fs.readFileSync(containerFilePath, 'utf-8');
  // console.log('containXml', containXml);

  return XmlJS.parseStringPromise(containXml, {
    explicitArray: false,
  }).then((data) => {
    // console.log('data', data);
    const rootFilePath = data.container.rootfiles.rootfile['$']['full-path'];
    return rootFilePath;
  });
};

export const parseConentOpf = (unzipPath, filePath) => {
  const fullpath = path.resolve(unzipPath, filePath);
  const contentOpf = fs.readFileSync(fullpath, 'utf-8');
  // console.log('contentOpf', contentOpf);

  XmlJS.parseStringPromise(contentOpf, {
    explicitArray: false,
  }).then((data) => {
    const { metadata } = data.package;
    console.log('metadata', metadata);
    const title = metadata['dc:title']; //书名
    const creator = metadata['dc:creator']; //作者
    const language = metadata['dc:language']; //语言
    const publisher = metadata['dc:publisher']; //出版社

    const category = metadata['dc:subject']; // 类别
    console.log('fuck', title, creator, language, publisher, category);
  });
};
