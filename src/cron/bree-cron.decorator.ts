import { ActivationRule } from "../cron/types";
import { applyDecorators, SetMetadata } from "@nestjs/common";
import { BREE_CRON_METADATA } from "../cron/bree-cron.constants";
import * as uuid from "uuid";

export function BreeCron<T extends any[]>(
  cronExp: string,
  rule?: ActivationRule<T>
): MethodDecorator {
  if (rule && !rule.func(...rule.args)) return applyDecorators();
  return applyDecorators(
    SetMetadata(BREE_CRON_METADATA, {
      cronExpression: cronExp,
      name: uuid.v4(),
    })
  );
}
