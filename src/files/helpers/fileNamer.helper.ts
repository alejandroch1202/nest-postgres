import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, fileName: string) => void,
) => {
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;
  callback(null, fileName);
};
