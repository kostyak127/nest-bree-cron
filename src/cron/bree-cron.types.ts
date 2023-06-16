export type BreeCronMetadata = {
  cronExpression: string;
  name: string;
};
export type BreeOptions = {
  logger?: object | undefined;
  root?: string | boolean | undefined;
  timeout?: number | boolean | undefined;
  interval?: number | undefined;
  jobs?: Array<string | (() => void) | JobOptions> | undefined;
  hasSeconds?: boolean | undefined;
  cronValidate?: object | undefined;
  closeWorkerAfterMs?: number | undefined;
  defaultExtension?: string | undefined;
  worker?: object | undefined;
  outputWorkerMetadate?: boolean | undefined;
  errorHandler?: ((error: any, workerMetadata: any) => void) | undefined;
  workerMessageHandler?:
    | ((message: any, workerMetadata: any) => void)
    | undefined;
};

export type JobOptions = {
  name?: string | undefined;
  path?: string | (() => void) | undefined;
  timeout?: number | string | boolean | undefined;
  interval?: number | string | undefined;
  date?: Date | undefined;
  cron?: string | undefined;
  hasSeconds?: boolean | undefined;
  cronValidate?: object | undefined;
  closeWorkerAfterMs?: number | undefined;
  worker?: object | undefined;
  outputWorkerMetadate?: boolean | undefined;
};
