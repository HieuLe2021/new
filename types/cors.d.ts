declare module 'cors' {
    import { RequestHandler } from 'express';
  
    interface CorsOptions {
      origin?: string | boolean | RegExp | (string | RegExp)[] | ((req: any, callback: (err: Error | null, origin?: any) => void) => void);
      methods?: string | string[];
      allowedHeaders?: string | string[];
      exposedHeaders?: string | string[];
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
    }
  
    function cors(options?: CorsOptions): RequestHandler;
  
    export = cors;
  }
  