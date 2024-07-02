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
  console.log('containXml', containXml);
};
