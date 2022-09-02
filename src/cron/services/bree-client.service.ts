import { Injectable } from "@nestjs/common";
import { BreeCronMetadata, BreeOptions } from "../../cron/bree-cron.types";
import Bree from "bree";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BreeCron = require("bree");

import { Uuid } from "../../cron/types";

@Injectable()
export class BreeClient {
  private readonly Bree: Bree;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly taskMap: Map<string, { methodRef: Function; context: any }> =
    new Map();
  public constructor(config: BreeOptions) {
    config.root = undefined;
    if (!config.logger) {
      config.logger = this.getEmptyLogger();
    }
    this.Bree = new BreeCron(config);
  }

  public startCronTasks() {
    this.Bree.start();
  }

  public addCronTask(
    metadata: BreeCronMetadata,
    // eslint-disable-next-line @typescript-eslint/ban-types
    methodRef: Function,
    instance: any
  ): void {
    this.setTaskToFunc(metadata.name, methodRef, instance);
    this.Bree.add({
      name: metadata.name,
      cron: metadata.cronExpression,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      path: () => {},
    });
  }

  private getEmptyLogger() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: (...args: any) => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      warn: (...args: any) => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      info: (...args: any) => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      error: (...args: any) => {},
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private setTaskToFunc(taskName: Uuid, methodRef: Function, context: any) {
    this.taskMap.set(taskName, { methodRef, context });
  }

  public get breeInstance(): Bree {
    return this.Bree;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public get cronTasks(): Map<string, { methodRef: Function; context: any }> {
    return this.taskMap;
  }
}
