// @flow
require('now-env');
import AWS from 'aws-sdk';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import Raven from 'shared/raven';
import sanitize from 'sanitize-filename';
import UserError from './UserError';

const IS_PROD = process.env.NODE_ENV === 'production';
import type { FileUpload, EntityTypes } from 'shared/types';
var mime = require('mime-types')

let HOST_NAME = process.env.S3_VULTR_HOST_NAME;
let ACCESS_KEY = process.env.S3_VULTR_ACCESS_KEY;
let SECRET_KEY = process.env.S3_VULTR_SECRET_KEY;


const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(HOST_NAME),
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
});


// remove the bucket name from the url
// the bucket name is not required since it is automatically bound
// to our imgix source
const generateImageUrl = path => `parabaik/upload-img/${path}`;



export const uploadImage = async (
  file: FileUpload,
  entity: EntityTypes,
  id: string
): Promise<string> => {
  const result = await file;
  const { filename, stream, mimetype } = result;
  const sanitized = sanitize(filename);
  const encoded = encodeURIComponent(sanitized);
  const mimefile =  mime.extension(mimetype)
  const validMediaTypes = ['image/gif', 'image/jpeg', 'image/png', 'video/mp4'];
  return new Promise(res => {
    // mimetype not in the validMediaType collection
    if (_.indexOf(validMediaTypes, _.toLower(mimetype)) < 0) {
      const unsupportedMediaTypeError = new UserError(
        `We aren’t able to support uploads with the type ${mimetype}. Try uploading another image.`
      );
      Raven.captureException(unsupportedMediaTypeError);
      throw unsupportedMediaTypeError;
    }

    const path = `upload-img/${entity}/${id}`;
    const fileKey = `${uuidv4()}.${mimefile}`;
    return s3.upload(
      {
        Bucket: path,
        Key: fileKey,
        Body: stream,
        ACL: 'public-read'
      },
      (err, data) => {
        if (err) throw new Error(err);
        if (!data || !data.Key)
          throw new UserError('Image upload failed. Please try again.');
        const url = generateImageUrl(data.Key);
        res(url);
      }
    );
  });
};




