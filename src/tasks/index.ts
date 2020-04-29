import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { method as sassMethod } from './sass';
import { method as webpackMethod } from './webpack';

/* -----------------------------------
 *
 * ITasks
 *
 * -------------------------------- */

interface ITasks {
   [index: string]: Method;
}

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
   data: ReadStream;
   path: string;
   name: string;
}

/* -----------------------------------
 *
 * IStream
 *
 * -------------------------------- */

interface IStream {
   [index: string]: Readable;
}

/* -----------------------------------
 *
 * IResult
 *
 * -------------------------------- */

interface IResult {
   name: string;
   type: string;
   hash: string;
   size: string;
   stream: Readable;
}

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

type Method = (options: IOptions) => Promise<Task>;

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

type Task = (props: IProps) => Promise<IStream>;

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks: ITasks = {
   'build:css': sassMethod,
   'build:js': webpackMethod,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IProps, IStream, IResult, Method, Task, tasks };
