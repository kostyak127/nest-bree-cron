import { DynamicModule, Module } from "@nestjs/common";
import { BreeOptions } from "../cron/bree-cron.types";
import { DiscoveryModule } from "@nestjs/core";
import { BreeCronInitializer } from "../cron/services/bree-cron-initializer.service";
import { BreeClient } from "../cron/services/bree-client.service";
import { BreeEventListener } from "../cron/services/bree-event-listener.service";

@Module({
  imports: [DiscoveryModule],
  providers: [],
})
export class BreeCronModule {
  static forRoot(breeCronConfiguration: BreeOptions = {}): DynamicModule {
    console.log(breeCronConfiguration);
    return {
      global: true,
      module: BreeCronModule,
      providers: [
        BreeCronInitializer,
        {
          provide: BreeClient,
          useValue: new BreeClient(breeCronConfiguration),
        },
        BreeEventListener,
      ],
      exports: [],
    };
  }
}
