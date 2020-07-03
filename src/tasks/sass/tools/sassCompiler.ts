import { renderSync } from 'node-sass';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function sassCompiler({ sourceMap }: IOptions) {
   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: processSource(path, sourceMap),
      });
}

/* -----------------------------------
 *
 * Process
 *
 * -------------------------------- */

function processSource(path: string, sourceMap: boolean) {
   return async function run(file: Buffer) {
      const result = renderSync({
         data: file.toString(),
         file: path,
         includePaths: [],
         outFile: `test.css`,
         sourceMap,
         sourceMapEmbed: sourceMap,
      });

      this.push(result);
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassCompiler };
