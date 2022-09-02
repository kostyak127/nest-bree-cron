import { Module } from "@nestjs/common";
import { BreeCronModule } from "./cron/bree-cron.module";
import { ExampleService } from "./example.service";

@Module({
  imports: [BreeCronModule.forRoot()],
  providers: [ExampleService],
})
export class AppModule {}
