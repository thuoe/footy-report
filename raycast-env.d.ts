/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - SportMonks API Key used to fetch all relevant football data */
  "apiKey": string,
  /** Calendar Name - Name of the calendar you wish to save all fixture dates */
  "calendarName": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `test` command */
  export type Test = ExtensionPreferences & {}
  /** Preferences accessible in the `searchTeam` command */
  export type SearchTeam = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `test` command */
  export type Test = {}
  /** Arguments passed to the `searchTeam` command */
  export type SearchTeam = {
  /** Enter Team */
  "team": string
}
}


