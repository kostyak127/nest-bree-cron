import { OnModuleInit } from "@nestjs/common";
import { Uuid } from "../cron/types";

export class BreeCronSchedulable implements OnModuleInit {
  protected readonly _breeCronUniqueKey: Uuid;

  public constructor(uniqueKey: Uuid) {
    this._breeCronUniqueKey = uniqueKey;
  }

  public async onModuleInit(): Promise<void> {
    await this.initTasks();
  }
  private async initTasks() {}
}
