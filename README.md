# ChatApp Mobile

A cross-platform chat app built with Expo and React Native, featuring a multi-step
registration flow, sign-in/authentication, tabbed navigation, and a private chat screen.

Pairs with a Rust backend (Axum + Socket.IO + PostgreSQL) — backend repo coming soon.

## Stack
- TypeScript, React Native, Expo (Expo Router)
- React Query (server state), Zustand (client state)
- Formik + Yup (forms/validation)
- Expo Secure Store, Expo SQLite, Async Storage

## Structure
- `app/(auth)` — multi-step registration and sign-in flow
- `app/(tabs)` — main tabbed navigation
- `app/private` — chat screen
- `services/` — API layer (Axios)
- `storage/` — auth token persistence

## Notes
A more advanced personal project compared to my earlier Android/XML experiments — built while learning React Native and Expo's app-router architecture, paired with a custom Rust backend.
