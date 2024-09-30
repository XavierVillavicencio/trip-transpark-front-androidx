import { privateUrl } from '../api/propertiesApi';

type Types = 'tmb' | 'img';

export const imageUrl = (filename: string, type: Types): string => {
  return `${privateUrl}/images/${type}_${filename}`;
};
