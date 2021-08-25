import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";
import { session } from 'next-auth/client';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user'
    }),
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // Providers.Email({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

  callbacks: {
    // Callbacks for login and signup

    async session(session) {

      try {

        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: null,
        }

      }
    },
    async signIn(user, account, profile) {
      const { email } = user;
      // Store user information

     try {
      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            { data: { email } }
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(user.email)
            )
          )
        )
      )
      return true;
     } catch {
      return false;
     }

    },
  }
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL
})