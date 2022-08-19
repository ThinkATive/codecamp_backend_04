import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  async upload({ files }) {
    // 파일을 클라우드 스토리지에 저장하는 로직
    // console.log(files);
    // const aaa = await files[0];
    // const bbb = await files[1];

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    const bucket = 'mainproject-storage';
    const storage = new Storage({
      projectId: 'mybackend04',
      keyFilename: 'mybackend04-e81f3ec31ed2.json',
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map(
        (ele) =>
          new Promise((resolve, reject) => {
            ele
              .createReadStream()
              .pipe(storage.file(ele.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${ele.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }
}
