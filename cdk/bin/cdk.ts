#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';

const app = new App();
new CdkStack(app, 'CdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'eu-west-2' },
});
