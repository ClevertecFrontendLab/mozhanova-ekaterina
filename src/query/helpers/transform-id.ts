import { Buffer } from 'buffer';

import { ObjectId } from '~/types';

export const transformId = (id: ObjectId) => Buffer.from(id.buffer.data).toString('hex');
