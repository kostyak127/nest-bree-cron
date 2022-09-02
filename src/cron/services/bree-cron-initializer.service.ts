import { Injectable, OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { BREE_CRON_METADATA } from "../../cron/bree-cron.constants";
import { BreeCronMetadata } from "../../cron/bree-cron.types";
import { BreeClient } from "../../cron/services/bree-client.service";
import { BreeEventListener } from "../../cron/services/bree-event-listener.service";

@Injectable()
export class BreeCronInitializer implements OnModuleInit {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly breeClient: BreeClient,
    private readonly listener: BreeEventListener
  ) {}
  async onModuleInit(): Promise<void> {
    console.log("start initing cron functions");
    this.initBreeCronFunctions();
  }
  private initBreeCronFunctions() {
    [
      ...this.discoveryService.getProviders(),
      ...this.discoveryService.getControllers(),
    ].forEach(({ instance }) => {
      if (!instance || !Object.getPrototypeOf(instance)) {
        return;
      }
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => this.lookupCronTasks(instance, key)
      );
    });
    this.breeClient.startCronTasks();
    this.listener.startListen();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private lookupCronTasks(instance: Record<string, Function>, key: string) {
    const methodRef = instance[key];
    const metadata = this.reflector.get<BreeCronMetadata, string>(
      BREE_CRON_METADATA,
      methodRef
    );
    if (!metadata) return;
    console.log("add cron task");
    this.breeClient.addCronTask(metadata, methodRef, instance);
  }
}
