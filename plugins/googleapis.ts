import { google } from 'googleapis';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('google', google);
});