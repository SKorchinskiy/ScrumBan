import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export default class ActivityMiddleware implements NestMiddleware {
  constructor(private workspaceService: WorkspaceService) {}

  async recordProjectAction(workspaceId: number) {
    await this.workspaceService.increaseActionStats({
      workspaceId,
      createdAt: new Date().toISOString().split('T')[0],
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      !(
        req.method === 'GET' ||
        (req.method === 'POST' && req.originalUrl === '/workspaces')
      ) &&
      req.params.workspaceId
    ) {
      await this.recordProjectAction(+req.params.workspaceId);
    }
    next();
  }
}
