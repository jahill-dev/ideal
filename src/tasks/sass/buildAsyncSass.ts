import glob from 'glob';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Async
 *
 * -------------------------------- */

function buildAsyncSass(path: string, { release = false }: IOptions) {
   console.log('buildAsyncSass!', path, release);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { buildAsyncSass };
