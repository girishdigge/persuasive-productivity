// import type { User } from 'next-auth';
// import { DefaultJWT } from 'next-auth/jwt';

// declare module 'next-auth/jwt' {
//   interface JWT extends DefaultJWT {
//     id: string;
//     username?: string | null;
//   }
// }

// declare module 'next-auth' {
//   interface session {
//     user: {
//       id: string;
//       username?: string | null;
//     } & User;
//   }
// }

import { DefaultSession, User } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string | null;
    } & User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    username?: string | null;
  }
}
