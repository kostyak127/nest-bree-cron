import { Injectable } from "@nestjs/common";
import { BreeCron } from "./cron/bree-cron.decorator";

@Injectable()
export class ExampleService {
  @BreeCron("*/1 * * * *")
  async testFunc() {
    console.log("THIS IS ONE MINUTE LOG");
  }

  @BreeCron("*/1 * * * *", {
    func: (nowInstance: number, executableInstance: number) =>
      nowInstance === executableInstance,
    args: [1, 2],
  })
  async testFuncWithNotRightRule() {
    console.log("I SHOULD NOT LOG NOW");
  }

  @BreeCron("*/1 * * * *", {
    func: (nowInstance: number, executableInstance: number) =>
      nowInstance === executableInstance,
    args: [2, 2],
  })
  async testFuncWithRightRule() {
    console.log("I SHOULD LOG NOW");
  }
}
