import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

   private logger = new Logger('HTTP');

   use(request: Request, response: Response, next: NextFunction): void {

      const { method, originalUrl, body } = request;

      this.logger.log(`${method} request at ${originalUrl}; body: ${JSON.stringify(body)}`);

      let oldWrite = response.write;
      let oldEnd = response.end;
      let chunks = [];

      response.write = function (chunk: never) {

         chunks.push(chunk);

         return oldWrite.apply(response, arguments);

      };

      response.end = function (chunk: never) {

         if (chunk) {
            chunks.push(chunk);
         }

         return oldEnd.apply(response, arguments);

      };

      response.on('finish', () => {

         const { statusCode } = response;
         const responseBody = Buffer.concat(chunks).toString('utf8');

         this.logger.log(
            `${method} Response for ${originalUrl}; code ${statusCode}; body: ${responseBody}`,
         );

      });

      next();

   }
}
