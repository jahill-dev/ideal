import { Result } from 'node-sass';
import postCss, { Transformer } from 'postcss';
import autoprefixer from 'autoprefixer';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Processor
 *
 * -------------------------------- */

function cssProcessor(options: IOptions) {
   const plugins = [
      autoprefixer({
         cascade: false,
         overrideBrowserslist: ['last 2 versions', '> 1%'],
      }),
   ];

   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: processSource(plugins, path),
      });
}

/* -----------------------------------
 *
 * Process
 *
 * -------------------------------- */

function processSource(plugins: Transformer[], path: string) {
   const instance = postCss(plugins);

   return async function run(file: Result) {
      const result = instance.process(file.css);

      this.push(result);

      // this.emit('data', result);
      // this.emit('close');
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cssProcessor };
