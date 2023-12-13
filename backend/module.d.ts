declare namespace NodeJS {
  export interface ProcessEnv {
    jwtRefreshToken: string;
    jwtSecretKey: string;
  }
}

declare namespace Express {
  export interface Request {
    headers: {
      authorization?: string;
    };
  }
}
