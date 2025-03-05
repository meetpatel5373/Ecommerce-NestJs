import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MultiUpload {
  multiUploadCheckRequiredFields = async (
    files: object,
    fields: string[],
  ): Promise<object> => {
    const value = [];

    const response = {};
    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];

      if (!Object.keys(files).includes(element)) {
        value.push(element);
      }

      files['documentName'] = element;

      response[element] = files[element];
    }

    if (value.length > 0) {
      throw new BadRequestException(`${value.toString()} are required`);
    }

    return response;
  };
}
