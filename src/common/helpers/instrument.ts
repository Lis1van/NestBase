// import { Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as Sentry from '@sentry/nestjs';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
//
// import { ConfigType, SentryConfig } from '../../configs/config.type';
//
// // export class LoggerService {
// //   private readonly isLocal: boolean;
// //   private readonly logger = new Logger();
// //
// //   constructor(private readonly configService: ConfigService<ConfigType>) {
//     const sentryConfig = this.configService.get<SentryConfig>('sentry');
//     this.isLocal = sentryConfig.env === 'local';
//
//     Sentry.init({
//       dsn: sentryConfig.dsn,
//       integrations: [nodeProfilingIntegration()],
//       tracesSampleRate: 1.0,
//       debug: sentryConfig.debug,
//       profilesSampleRate: 1.0,
//     });
//   // }
//
//   public log(message: string): void {
//     if (this.isLocal) {
//       this.logger.log(message);
//     } else {
//       Sentry.captureMessage(message, 'log');
//     }
//   }
//   public info(message: string): void {
//     if (this.isLocal) {
//       this.logger.log(message);
//     } else {
//       Sentry.captureMessage(message, 'info');
//     }
//   }
//   public warn(message: string): void {
//     if (this.isLocal) {
//       this.logger.log(message);
//     } else {
//       Sentry.captureMessage(message, 'warning');
//     }
//   }
//   public error(error: any): void {
//     if (this.isLocal) {
//       this.logger.error(error, error.stack);
//     } else {
//       Sentry.captureException(error, { level: 'error' });
//     }
//   }
// // }