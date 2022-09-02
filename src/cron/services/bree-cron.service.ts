import { Injectable } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";

@Injectable()
export class BreeCronService {
  public constructor(private readonly discoveryService: DiscoveryService) {}
}
