import { Injectable } from "@nestjs/common";
import { BreeClient } from "../../cron/services/bree-client.service";

@Injectable()
export class BreeEventListener {
  public constructor(private readonly breeClient: BreeClient) {}
  public startListen() {
    this.breeClient.breeInstance.on("worker created", (name) => {
      const cronJobMetadata = this.breeClient.cronTasks.get(name);
      if (!cronJobMetadata) {
        console.error("UNKNOWN CRON TASK GOT IN LISTENER", name);
        return;
      }
      const { methodRef, context } = cronJobMetadata;
      methodRef.apply(context);
    });
  }
}
